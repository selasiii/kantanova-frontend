import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
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
  toast
} from '@/components/ui';
import { authService } from '../../services/authService';
import { useAuthStore } from '../../store/authStore';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { user } = await authService.login({ email, password });
      setUser(user);
      toast({
        title: "Welcome back!",
        description: `Logged in as ${user.name}`,
        variant: "success",
      });
      navigate(from, { replace: true });
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.response?.data?.message || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container size="sm" className="min-h-[80vh] flex items-center justify-center">
      <Card className="w-full">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-3xl font-display font-bold">KANTANOVA</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing="lg">
              <Input
                label="Email Address"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button 
                type="submit" 
                variant="primary" 
                className="w-full h-12" 
                loading={isSubmitting}
              >
                Sign In
              </Button>
            </Stack>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-noir-black/60">
            Don't have an account?{' '}
            <Link to="/register" className="text-noir-blue font-semibold hover:underline">
              Create an account
            </Link>
          </div>
          <Link to="/" className="text-xs text-center text-noir-black/40 hover:text-noir-black uppercase tracking-widest font-display transition-colors">
            Back to Home
          </Link>
        </CardFooter>
      </Card>
    </Container>
  );
};
