import React, { useState } from 'react';
import { 
  Stack, 
  Card, 
  CardContent, 
  Button, 
  Badge, 
  Input,
  toast,
  Avatar,
  AvatarFallback,
  AvatarImage
} from '../../components/ui';
import { useAdminUsers, useAdminActions } from '../../hooks/admin-hooks';
import { Search, ShieldAlert, ShieldCheck, MoreVertical, Mail } from 'lucide-react';

import { cn } from '../../lib/utils';

const UserManagement: React.FC = () => {
  const [roleFilter, setRoleFilter] = useState<string | undefined>();
  const [search, setSearch] = useState('');
  const { data: users, isLoading } = useAdminUsers(roleFilter);
  const { updateUserStatus } = useAdminActions();

  const filteredUsers = users?.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleStatusToggle = async (userId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    try {
      await updateUserStatus.mutateAsync({ userId, status: nextStatus });
      toast({ 
        title: `Identity ${nextStatus}`, 
        description: `User access has been ${nextStatus.toLowerCase()}`,
        variant: nextStatus === 'ACTIVE' ? 'success' : 'destructive' 
      });
    } catch (error) {
      toast({ title: 'Protocol Failure', variant: 'destructive' });
    }
  };

  if (isLoading) {
    return <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-noir-blue mx-auto mt-20"></div>;
  }

  return (
    <Stack spacing="xl">
      <header className="flex justify-between items-end">
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-noir-black/40">Identity Governance</p>
          <h1 className="text-4xl font-display font-black uppercase tracking-tighter">User Directory</h1>
        </div>
        
        <div className="flex gap-4">
          <div className="relative w-80 group">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-noir-black/30 group-focus-within:text-noir-blue transition-colors" />
             <Input 
                placeholder="Search by Identity or Vector..." 
                className="pl-12 h-14 bg-white border-noir-border rounded-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
             />
          </div>
          <div className="flex bg-white border border-noir-border p-1">
             {['ALL', 'CUSTOMER', 'VENDOR', 'RIDER'].map((r) => (
               <button
                 key={r}
                 onClick={() => setRoleFilter(r === 'ALL' ? undefined : r)}
                 className={cn(
                   "px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all",
                   (roleFilter === r || (!roleFilter && r === 'ALL')) ? "bg-noir-black text-white" : "hover:bg-noir-gray/20 text-noir-black/40"
                 )}
               >
                 {r}
               </button>
             ))}
          </div>
        </div>
      </header>

      <Card className="border-noir-border shadow-none rounded-none bg-white overflow-hidden">
        <CardContent className="p-0">
          <table className="w-full text-left">
            <thead className="bg-noir-gray/30 border-b border-noir-border">
              <tr>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest opacity-40">Entity Identity</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest opacity-40">Role Matrix</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest opacity-40">Status Vector</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest opacity-40 text-right">Administrative Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-noir-border">
              {filteredUsers?.map((user) => (
                <tr key={user.id} className="hover:bg-noir-gray/5 transition-colors group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-noir-border p-0.5">
                        <AvatarImage src={`https://ui-avatars.com/api/?name=${user.name}&background=f8f8f8&color=000`} className="rounded-none" />
                        <AvatarFallback className="rounded-none">{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="font-black uppercase text-sm tracking-tight">{user.name}</p>
                        <p className="text-[10px] font-bold text-noir-black/40 uppercase tracking-widest flex items-center gap-1.5"><Mail className="w-3 h-3" /> {user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <Badge variant="outline" className={cn(
                      "text-[9px] tracking-[0.2em] font-black bg-white border-2",
                      user.role === 'ADMIN' ? "border-noir-blue text-noir-blue" : "border-noir-border text-noir-black/40"
                    )}>
                      {user.role}
                    </Badge>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-2">
                       <div className={cn("h-2 w-2 rounded-full", user.status === 'ACTIVE' ? "bg-green-500" : "bg-red-500 animate-pulse")} />
                       <span className={cn("text-[10px] font-black uppercase tracking-widest", user.status === 'ACTIVE' ? "text-noir-black" : "text-red-500")}>
                        {user.status}
                       </span>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className={cn(
                          "h-10 px-6 font-black uppercase text-[10px] tracking-widest transition-all",
                          user.status === 'ACTIVE' ? "hover:bg-red-50 hover:text-red-600" : "hover:bg-green-50 hover:text-green-600"
                        )}
                        onClick={() => handleStatusToggle(user.id, user.status)}
                        loading={updateUserStatus.isPending}
                      >
                        {user.status === 'ACTIVE' ? (
                          <><ShieldAlert className="w-3.5 h-3.5 mr-2" /> Suspend Access</>
                        ) : (
                          <><ShieldCheck className="w-3.5 h-3.5 mr-2" /> Restore Access</>
                        )}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-10 w-10 p-0 hover:bg-noir-black hover:text-white transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default UserManagement;
