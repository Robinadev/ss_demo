import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Shield, Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('Login:', { loginEmail, loginPassword });
    setIsLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-background)] via-[#f8f6f2] to-[var(--color-hover)]">
      {/* Natural Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Organic shapes */}
        <div className="absolute top-1/4 right-1/4 h-32 w-32 animate-pulse rounded-full bg-[var(--color-primary)]/5 blur-xl"></div>
        <div className="animation-delay-2000 absolute bottom-1/3 left-1/3 h-24 w-24 animate-pulse rounded-full bg-[var(--color-accent)]/5 blur-xl"></div>
        <div className="animation-delay-4000 absolute top-1/2 right-1/3 h-28 w-28 animate-pulse rounded-full bg-[var(--color-secondary)]/5 blur-xl"></div>
      </div>

      <div className="relative flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Brand Header */}
          <div className="mb-8 text-center">
            <div className="mb-4 flex items-center justify-center gap-4">
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] shadow-lg">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full border-4 border-[var(--color-background)] bg-[var(--color-accent)]"></div>
              </div>
            </div>
            <h1 className="mb-2 font-['Noto_Sans_Display'] text-3xl font-bold text-[var(--color-accent)]">
              SafeHaven
            </h1>
            <p className="font-['Noto_Sans_Ethiopic'] text-[var(--color-muted-foreground)]">
              Secure • Private • Grounded in Safety
            </p>
          </div>

          {/* Login Form */}
          <div className="relative">
            {/* Natural border effect */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-accent)]/20 blur-sm"></div>

            <Card className="hover-lift relative border-2 border-[var(--color-border)]/50 bg-[var(--color-card)] shadow-lg">
              <CardHeader className="space-y-4 pb-6 text-center">
                <div className="flex justify-center">
                  <div className="h-1 w-20 rounded-full bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent"></div>
                </div>
                <CardTitle className="font-['Noto_Sans_Display'] text-2xl font-bold text-[var(--color-foreground)]">
                  Welcome Back
                </CardTitle>
                <CardDescription className="font-['Noto_Sans_Ethiopic'] text-base text-[var(--color-muted-foreground)]">
                  Sign in to track your reports and access support resources
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="login-email"
                        className="font-['Noto_Sans_Ethiopic'] font-medium text-[var(--color-foreground)]"
                      >
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-[var(--color-muted-foreground)]" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="rounded-lg border-2 border-[var(--color-border)]/50 bg-[var(--color-input-background)] py-3 pr-4 pl-10 font-['Noto_Sans_Ethiopic'] transition-all duration-200 focus:border-[var(--color-primary)]"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="login-password"
                        className="font-['Noto_Sans_Ethiopic'] font-medium text-[var(--color-foreground)]"
                      >
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-[var(--color-muted-foreground)]" />
                        <Input
                          id="login-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="rounded-lg border-2 border-[var(--color-border)]/50 bg-[var(--color-input-background)] py-3 pr-12 pl-10 font-['Noto_Sans_Ethiopic'] transition-all duration-200 focus:border-[var(--color-primary)]"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute top-1/2 right-3 -translate-y-1/2 transform text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        className="rounded border-[var(--color-border)] data-[state=checked]:bg-[var(--color-primary)]"
                      />
                      <label
                        htmlFor="remember"
                        className="cursor-pointer font-['Noto_Sans_Ethiopic'] text-sm text-[var(--color-muted-foreground)]"
                      >
                        Remember me
                      </label>
                    </div>
                    <Link
                      to="/auth/forgot-password"
                      className="font-['Noto_Sans_Ethiopic'] text-sm font-medium text-[var(--color-primary)] transition-colors hover:text-[var(--color-primary)]/80"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full transform rounded-lg bg-[var(--color-primary)] py-3 font-['Noto_Sans_Ethiopic'] font-medium text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:bg-[var(--color-primary)]/90 hover:shadow-xl"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>Sign In</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[var(--color-border)]/30"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[var(--color-card)] px-3 font-['Noto_Sans_Ethiopic'] text-[var(--color-muted-foreground)]">
                      Secure Access
                    </span>
                  </div>
                </div>

                {/* Register Link */}
                <div className="text-center">
                  <p className="font-['Noto_Sans_Ethiopic'] text-sm text-[var(--color-muted-foreground)]">
                    Don't have an account?{' '}
                    <Link
                      to="/auth/register"
                      className="font-semibold text-[var(--color-primary)] transition-colors hover:text-[var(--color-primary)]/80"
                    >
                      Create Account
                    </Link>
                  </p>
                </div>

                {/* Anonymous Reporting CTA */}
                <div className="border-t border-[var(--color-border)]/30 pt-6 text-center">
                  <p className="font-['Noto_Sans_Ethiopic'] text-sm text-[var(--color-muted-foreground)]">
                    Need to report anonymously?{' '}
                    <Link
                      to="/report"
                      className="inline-flex items-center gap-1 font-semibold text-[var(--color-primary)] transition-colors hover:text-[var(--color-primary)]/80"
                    >
                      Submit a secure report
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
