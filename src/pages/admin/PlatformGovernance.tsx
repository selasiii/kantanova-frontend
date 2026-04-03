import React from 'react';
import { Stack, Card, Button, Badge, Switch } from '../../components/ui';
import { ShieldCheck, Globe } from 'lucide-react';

const PlatformGovernance: React.FC = () => {
  return (
    <Stack spacing="xl">
      <header>
        <h1 className="text-4xl font-display font-black uppercase tracking-tighter">Governance Protocol</h1>
        <p className="text-noir-black/40 text-[10px] font-bold uppercase tracking-[0.3em]">Global system parameters and security vectors</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border-noir-border shadow-none rounded-none bg-white p-8">
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-noir-blue" /> Security Matrix
          </h3>
          <div className="space-y-6">
            {[
              { label: 'Two-Factor Enforcement', desc: 'Require 2FA for all administrative identities', active: true },
              { label: 'Session Hardening', desc: 'Terminate sessions after 4 hours of inactivity', active: true },
              { label: 'Geographic Fencing', desc: 'Restrict administrative access to authorized IPs', active: false },
            ].map((s, i) => (
              <div key={i} className="flex justify-between items-center py-4 border-b border-noir-gray last:border-0">
                <div className="space-y-1">
                  <p className="text-xs font-black uppercase tracking-tight">{s.label}</p>
                  <p className="text-[10px] text-noir-black/40 uppercase tracking-tight">{s.desc}</p>
                </div>
                <Switch checked={s.active} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-noir-border shadow-none rounded-none bg-white p-8">
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
            <Globe className="w-4 h-4 text-noir-blue" /> Platform Mechanics
          </h3>
          <div className="space-y-6">
            {[
              { label: 'Marketplace Commission', value: '12.5%', type: 'VALUE' },
              { label: 'Default Delivery Ceiling', value: 'GH₵ 50.00', type: 'VALUE' },
              { label: 'Auto-Escrow Release', value: '72 HOURS', type: 'VALUE' },
            ].map((m, i) => (
              <div key={i} className="flex justify-between items-center py-4 border-b border-noir-gray last:border-0">
                <div className="space-y-1">
                  <p className="text-xs font-black uppercase tracking-tight">{m.label}</p>
                </div>
                <Badge variant="outline" className="h-8 px-4 font-black text-noir-blue border-noir-blue/20">
                  {m.value}
                </Badge>
              </div>
            ))}
          </div>
          <Button variant="primary" className="w-full h-12 mt-8 rounded-none uppercase text-[10px] tracking-widest font-black">
             Commit Parameter Changes
          </Button>
        </Card>
      </div>
    </Stack>
  );
};

export default PlatformGovernance;
