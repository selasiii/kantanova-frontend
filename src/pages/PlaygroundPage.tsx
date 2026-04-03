import React from 'react';
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Checkbox,
  Switch,
  Container,
  Stack,
  toast
} from '@/components/ui';
import { Plus } from 'lucide-react';

const PlaygroundPage: React.FC = () => {
  return (
    <Container size="lg" className="py-12 space-y-12 pb-24">
      <header className="space-y-2 border-b border-noir-border pb-8">
        <h1 className="text-4xl font-display font-bold">UI Component Playground</h1>
        <p className="text-noir-black/60 font-sans">Verification page for Kantanova Shared UI Library</p>
      </header>

      {/* Layout Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-display font-bold">Layout Utilities</h2>
        <Card className="p-6">
          <Stack spacing="lg">
            <div className="p-4 bg-noir-gray border border-dashed border-noir-border text-center">Stack Item 1</div>
            <div className="p-4 bg-noir-gray border border-dashed border-noir-border text-center">Stack Item 2</div>
            <Stack direction="row" spacing="md" justify="between">
              <div className="p-4 bg-noir-blue/10 text-noir-blue border border-noir-blue/20">Row Item A</div>
              <div className="p-4 bg-noir-blue/10 text-noir-blue border border-noir-blue/20">Row Item B</div>
              <div className="p-4 bg-noir-blue/10 text-noir-blue border border-noir-blue/20">Row Item C</div>
            </Stack>
          </Stack>
        </Card>
      </section>

      {/* Buttons Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-display font-bold">Buttons</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="primary" onClick={() => toast({ title: "Primary Clicked", description: "This is a default toast notification." })}>Primary Button</Button>
          <Button variant="secondary" onClick={() => toast({ title: "Success!", description: "Action completed successfully.", variant: "success" })}>Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="link">Link Button</Button>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon"><Plus className="w-4 h-4" /></Button>
        </div>
      </section>

      {/* Inputs Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-display font-bold">Form Elements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Input label="Email Address" placeholder="hello@kantanova.com" />
            <Input label="Password" type="password" placeholder="••••••••" />
            <Input label="Error State" placeholder="Invalid input" error="This field is required" />
          </div>
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Accept terms and conditions
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="airplane-mode" />
              <label htmlFor="airplane-mode" className="text-sm font-medium leading-none">
                Airplane Mode
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Data Display Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-display font-bold">Data Display</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Card</CardTitle>
              <CardDescription>Noir inspired design system</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">This is a modular card component used across the application.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">View Details</Button>
            </CardFooter>
          </Card>

          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Blue</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
            </div>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>SK</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <Card className="bg-noir-black text-noir-white border-none">
            <CardHeader>
              <CardTitle className="text-noir-white">Dark Variant</CardTitle>
              <CardDescription className="text-noir-white/60">High contrast card</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Perfect for highlighting special content or stats.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Overlays Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-display font-bold">Overlays & Notifications</h2>
        <div className="flex flex-wrap gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open Modal</Button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined}>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end gap-3 mt-4">
                <Button variant="outline">Cancel</Button>
                <Button variant="primary">Confirm</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Open Drawer</Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Navigation Menu</SheetTitle>
                <SheetDescription>
                  Quick access to all your dashboard tools.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4 mt-8">
                <Button variant="ghost" className="justify-start">Dashboard</Button>
                <Button variant="ghost" className="justify-start">My Orders</Button>
                <Button variant="ghost" className="justify-start">Settings</Button>
              </div>
            </SheetContent>
          </Sheet>

          <Button 
            variant="outline" 
            onClick={() => toast({ 
              title: "Destructive Action", 
              description: "Something went wrong.", 
              variant: "destructive" 
            })}
          >
            Trigger Error Toast
          </Button>
        </div>

        <div className="mt-8">
          <Tabs defaultValue="account" className="w-full max-w-md">
            <TabsList className="justify-start">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="p-4 border border-t-0 border-noir-border">
              <p className="text-sm">Manage your account settings and preferences here.</p>
            </TabsContent>
            <TabsContent value="password" className="p-4 border border-t-0 border-noir-border">
              <p className="text-sm">Update your password to keep your account secure.</p>
            </TabsContent>
            <TabsContent value="settings" className="p-4 border border-t-0 border-noir-border">
              <p className="text-sm">General application settings and configurations.</p>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Container>
  );
};

export default PlaygroundPage;
