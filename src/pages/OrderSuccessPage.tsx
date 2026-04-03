import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Container, Stack, Button, Card } from '../components/ui';
import { usePaymentPoller } from '../hooks/usePaymentPoller';
import { CheckCircle2, Clock, XCircle, ShoppingBag } from 'lucide-react';

const OrderSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get('ref');
  const { status } = usePaymentPoller(reference || undefined);

  return (
    <Container size="md" className="py-20 flex flex-col items-center">
      <Card className="w-full max-w-lg border-2 border-noir-black bg-noir-white shadow-none rounded-none p-12 text-center">
        <Stack spacing="xl" className="items-center">
          {status === 'SUCCESS' ? (
            <>
              <div className="h-20 w-20 bg-noir-blue/10 flex items-center justify-center rounded-full">
                <CheckCircle2 className="w-10 h-10 text-noir-blue" />
              </div>
              <Stack spacing="sm">
                <h1 className="text-4xl font-display font-black uppercase tracking-tighter">Payment Received</h1>
                <p className="text-noir-black/60 font-bold uppercase tracking-widest text-xs">Reference: {reference}</p>
              </Stack>
              <p className="text-sm text-noir-black/50 leading-relaxed font-sans">
                Your order has been confirmed and we've notified the vendor. You can track your shipment status in your profile.
              </p>
            </>
          ) : status === 'FAILED' ? (
            <>
              <div className="h-20 w-20 bg-red-50 flex items-center justify-center rounded-full">
                <XCircle className="w-10 h-10 text-red-500" />
              </div>
              <Stack spacing="sm">
                <h1 className="text-4xl font-display font-black uppercase tracking-tighter text-red-600">Payment Failed</h1>
                <p className="text-noir-black/60 font-bold uppercase tracking-widest text-xs">Reference: {reference}</p>
              </Stack>
              <p className="text-sm text-noir-black/50 leading-relaxed font-sans">
                Unfortunately, your payment could not be processed. Please try again or contact support if the issue persists.
              </p>
            </>
          ) : (
            <>
              <div className="h-20 w-20 bg-noir-gray flex items-center justify-center rounded-full animate-pulse">
                <Clock className="w-10 h-10 text-noir-black/40" />
              </div>
              <Stack spacing="sm">
                <h1 className="text-4xl font-display font-black uppercase tracking-tighter">Verifying Payment</h1>
                <p className="text-noir-black/60 font-bold uppercase tracking-widest text-xs">Waiting for confirmation...</p>
              </Stack>
              <p className="text-sm text-noir-black/50 leading-relaxed font-sans italic">
                Please don't refresh this page while we confirm your transaction with Hubtel/Paystack.
              </p>
            </>
          )}

          <div className="flex flex-col sm:flex-row gap-4 w-full pt-4">
            <Button asChild className="flex-grow h-14">
              <Link to="/catalog"><ShoppingBag className="w-5 h-5 mr-2" /> Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild className="flex-grow h-14">
              <Link to="/profile">View My Orders</Link>
            </Button>
          </div>
        </Stack>
      </Card>
    </Container>
  );
};

export default OrderSuccessPage;
