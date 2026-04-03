import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Button, 
  Input, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter,
  Container,
  Stack,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  toast
} from '@/components/ui';
import { authService } from '../../services/authService';
import { useAuthStore } from '../../store/authStore';
import type { UserRole } from '../../store/authStore';

export const RegisterPage: React.FC = () => {
  const [role, setRole] = useState<UserRole>('CUSTOMER');
  const [isLoading, setIsLoading] = useState(false);
  
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    // Vendor specific
    shopName: '',
    shopAddress: '',
    // Rider specific
    vehicleType: '',
    licenseNumber: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { user } = await authService.register(role, formData);
      setUser(user);
      toast({
        title: "Registration successful!",
        description: "Welcome to Kantanova.",
        variant: "success",
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size="md" className="py-12 min-h-[80vh] flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-3xl font-display font-bold">JOIN KANTANOVA</CardTitle>
          <CardDescription>Select your account type to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="CUSTOMER" onValueChange={(val) => setRole(val as UserRole)}>
            <TabsList className="mb-8">
              <TabsTrigger value="CUSTOMER">Customer</TabsTrigger>
              <TabsTrigger value="VENDOR">Vendor</TabsTrigger>
              <TabsTrigger value="RIDER">Rider</TabsTrigger>
            </TabsList>

            <form onSubmit={handleRegister}>
              <Stack spacing="lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />

                <TabsContent value="VENDOR" className="mt-0 pt-4 border-t border-noir-border">
                  <Stack spacing="lg">
                    <Input
                      label="Shop Name"
                      name="shopName"
                      placeholder="My Awesome Shop"
                      value={formData.shopName}
                      onChange={handleInputChange}
                      required={role === 'VENDOR'}
                    />
                    <Input
                      label="Shop Address"
                      name="shopAddress"
                      placeholder="Accra, Ghana"
                      value={formData.shopAddress}
                      onChange={handleInputChange}
                      required={role === 'VENDOR'}
                    />
                  </Stack>
                </TabsContent>

                <TabsContent value="RIDER" className="mt-0 pt-4 border-t border-noir-border">
                  <Stack spacing="lg">
                    <Input
                      label="Vehicle Type"
                      name="vehicleType"
                      placeholder="Motorbike / Bicycle"
                      value={formData.vehicleType}
                      onChange={handleInputChange}
                      required={role === 'RIDER'}
                    />
                    <Input
                      label="License Number"
                      name="licenseNumber"
                      placeholder="GHA-123456"
                      value={formData.licenseNumber}
                      onChange={handleInputChange}
                      required={role === 'RIDER'}
                    />
                  </Stack>
                </TabsContent>

                <Button 
                  type="submit" 
                  variant="primary" 
                  className="w-full h-12"
                  loading={isLoading}
                >
                  Register as {role.charAt(0) + role.slice(1).toLowerCase()}
                </Button>
              </Stack>
            </form>
          </Tabs>
        </CardContent>
        <CardFooter className="justify-center border-t border-noir-border pt-6 mt-6">
          <div className="text-sm text-noir-black/60">
            Already have an account?{' '}
            <Link to="/login" className="text-noir-blue font-semibold hover:underline">
              Sign In
            </Link>
          </div>
        </CardFooter>
      </Card>
    </Container>
  );
};
