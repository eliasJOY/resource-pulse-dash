import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      toast({
        title: "Error",
        description: "Please enter both username and password.",
        variant: "destructive"
      });
      return;
    }

    const success = await login(username, password);
    
    if (!success) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Sidebar */}
      <div className="w-80 bg-dashboard-sidebar flex flex-col p-6">
        <div className="mb-8">
          <h1 className="text-dashboard-sidebar-text text-2xl font-bold mb-2">
            Data Services
          </h1>
          <div className="text-dashboard-sidebar-text text-sm opacity-90">
            Resource TP Allocation
            <br />
            Dashboard
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center bg-dashboard-bg p-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-dashboard-text">
              Log in
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-dashboard-text">
                  User name
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-muted border-border"
                  placeholder="Enter your username"
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-dashboard-text">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-muted border-border"
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-dashboard-teal hover:bg-dashboard-teal-dark text-dashboard-sidebar-text"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Simulated Microsoft SSO</p>
              <p className="mt-1">Enter any username and password to continue</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;