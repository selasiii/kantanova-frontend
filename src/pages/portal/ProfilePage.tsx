import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Stack, 
  Input, 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Badge,
  toast
} from '../../components/ui';
import { useAuthStore } from '../../store/authStore';
import { authService } from '../../services/authService';
import { User, Shield, Package, Settings, LogOut, Store, Bike } from 'lucide-react';


export const ProfilePage: React.FC = () => {
  const { user, setUser, logout } = useAuthStore();
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    city: user?.city || '',
    address: user?.address || '',
  });

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const updatedUser = await authService.updateProfile(formData);
      setUser(updatedUser);
      toast({
        title: "Profile Updated",
        description: "Your account details have been saved successfully",
        variant: "success"
      });
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.response?.data?.message || "Failed to save changes",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Container size="lg" className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Sidebar */}
        <aside className="md:col-span-1 space-y-2">
          <Card className="border-noir-border shadow-none p-6 text-center flex flex-col items-center gap-4 bg-noir-gray/20">
            <Avatar className="h-24 w-24 border-2 border-noir-black bg-white">
              <AvatarImage src={`https://ui-avatars.com/api/?name=${user?.name}&background=000&color=fff`} />
              <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="font-display font-black uppercase text-lg tracking-tight">{user?.name}</h3>
              <Badge variant="secondary" className="uppercase text-[9px] tracking-widest">{user?.role}</Badge>
            </div>
          </Card>
          
          <nav className="space-y-1">
            <Button variant="ghost" asChild className="w-full justify-start text-[10px] font-black uppercase tracking-widest bg-noir-black text-white hover:bg-noir-black/90">
              <Link to="/profile"><User className="w-4 h-4 mr-2" /> Basic Info</Link>
            </Button>
            <Button variant="ghost" asChild className="w-full justify-start text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 italic transition-all">
              <Link to="/profile/orders"><Package className="w-4 h-4 mr-2" /> My Orders</Link>
            </Button>
            
            {user?.role === 'VENDOR' && (
              <Button variant="ghost" asChild className="w-full justify-start text-[10px] font-black uppercase tracking-widest text-noir-blue hover:bg-noir-blue/5">
                <Link to="/vendor"><Store className="w-4 h-4 mr-2" /> Vendor Dashboard</Link>
              </Button>
            )}
            
            {user?.role === 'RIDER' && (
              <Button variant="ghost" asChild className="w-full justify-start text-[10px] font-black uppercase tracking-widest text-noir-blue hover:bg-noir-blue/5">
                <Link to="/rider"><Bike className="w-4 h-4 mr-2" /> Rider Portal</Link>
              </Button>
            )}
            
            {user?.role === 'ADMIN' && (
              <Button variant="ghost" asChild className="w-full justify-start text-[10px] font-black uppercase tracking-widest text-noir-blue hover:bg-noir-blue/5">
                <Link to="/admin"><Shield className="w-4 h-4 mr-2" /> Admin Command</Link>
              </Button>
            )}

            <Button variant="ghost" className="w-full justify-start text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100">
              <Shield className="w-4 h-4 mr-2" /> Security Settings
            </Button>
            <div className="pt-4">
              <Button 
                variant="outline" 
                className="w-full justify-start text-[10px] font-black uppercase tracking-widest border-red-200 text-red-500 hover:bg-red-50"
                onClick={logout}
              >
                <LogOut className="w-4 h-4 mr-2" /> Logout Session
              </Button>
            </div>
          </nav>


        </aside>

        {/* Main Content */}
        <main className="md:col-span-3">
          <Stack spacing="xl">
            <header className="space-y-2">
              <h1 className="text-4xl font-display font-black uppercase tracking-tighter">Your Identity</h1>
              <p className="text-noir-black/50 text-xs font-bold uppercase tracking-[0.2em]">Manage your personal profile and preferences</p>
            </header>

            <form onSubmit={handleUpdate} className="space-y-8">
              <Card className="border-noir-border shadow-none rounded-none">
                <CardHeader className="bg-noir-gray/30 border-b border-noir-border">
                  <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                    <Settings className="w-4 h-4" /> Personal Constants
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Input 
                      label="Public Name" 
                      value={formData.name} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})} 
                      required 
                    />
                    <Input 
                      label="Contact Number" 
                      value={formData.phone} 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                      required 
                    />
                    <Input 
                      label="Default City" 
                      value={formData.city} 
                      onChange={(e) => setFormData({...formData, city: e.target.value})} 
                      required 
                    />
                    <Input 
                      label="Base Delivery Address" 
                      value={formData.address} 
                      onChange={(e) => setFormData({...formData, address: e.target.value})} 
                      required 
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button type="submit" loading={isUpdating} className="h-14 px-12 text-sm">
                  Save Changes
                </Button>
              </div>
            </form>
          </Stack>
        </main>
      </div>
    </Container>
  );
};

export default ProfilePage;
