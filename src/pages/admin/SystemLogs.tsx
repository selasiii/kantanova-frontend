import React from 'react';
import { Stack, Card, CardContent, Badge, Input } from '../../components/ui';
import { Search, Terminal } from 'lucide-react';

const SystemLogs: React.FC = () => {
  const mockLogs = [
    { id: 1, type: 'SECURITY', action: 'Admin Session Initiated', user: 'Admin-01', status: 'SUCCESS', time: '2024-04-03 16:45:12' },
    { id: 2, type: 'TRANSACTION', action: 'Escrow Release - ORD-9921', user: 'SYSTEM', status: 'FINALIZED', time: '2024-04-03 16:42:05' },
    { id: 3, type: 'USER', action: 'Identity Suspended - ID-4421', user: 'Admin-01', status: 'EXECUTED', time: '2024-04-03 16:38:55' },
    { id: 4, type: 'SYSTEM', action: 'Catalog Re-indexing', user: 'CRON-TASK', status: 'WAITING', time: '2024-04-03 16:30:00' },
  ];

  return (
    <Stack spacing="xl">
      <header className="flex justify-between items-end">
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-noir-black/40">Audit Trail</p>
          <h1 className="text-4xl font-display font-black uppercase tracking-tighter">System Telemetry</h1>
        </div>
        <div className="relative w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-noir-black/30" />
          <Input placeholder="Search Logs..." className="pl-12 h-12 bg-white border-noir-border rounded-none" />
        </div>
      </header>

      <Card className="border-noir-border shadow-none rounded-none bg-white overflow-hidden">
        <div className="bg-noir-black text-white p-4 flex items-center justify-between">
           <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest">
              <Terminal className="w-4 h-4 text-noir-blue" /> Live Environment Logs
           </div>
           <Badge className="bg-noir-blue border-none text-[8px]">READ-ONLY</Badge>
        </div>
        <CardContent className="p-0 font-mono text-[11px]">
          <div className="divide-y divide-noir-border">
            {mockLogs.map((log) => (
              <div key={log.id} className="p-6 grid grid-cols-6 items-center gap-4 hover:bg-noir-gray/5 transition-colors">
                <div className="text-noir-black/30">[{log.time}]</div>
                <div className="col-span-1">
                  <Badge variant="outline" className="text-[9px] border-noir-border leading-none h-6">{log.type}</Badge>
                </div>
                <div className="col-span-2 font-bold uppercase tracking-tight">{log.action}</div>
                <div className="text-noir-blue font-black uppercase tracking-tighter">{log.user}</div>
                <div className="text-right">
                   <span className="text-[10px] font-black tracking-widest text-green-600">{log.status}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default SystemLogs;
