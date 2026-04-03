import { useEffect, useState } from 'react';
import { orderService } from '../services/orderService';

export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED';

export const usePaymentPoller = (reference?: string) => {
  const [status, setStatus] = useState<PaymentStatus>('PENDING');
  const [isPolling, setIsPolling] = useState(false);

  useEffect(() => {
    if (!reference || isPolling) return;

    setIsPolling(true);
    const interval = setInterval(async () => {
      try {
        const { status } = await orderService.verifyPayment(reference);
        if (status === 'SUCCESS' || status === 'FAILED') {
          setStatus(status);
          clearInterval(interval);
          setIsPolling(false);
        }
      } catch (error) {
        // Continue polling on transient errors
        console.error('Polling error:', error);
      }
    }, 5000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference]);

  return { status, isPolling };
};
