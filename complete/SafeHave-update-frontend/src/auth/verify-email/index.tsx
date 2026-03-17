import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Shield,
  CheckCircle2,
  Mail,
  AlertCircle,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';

export function VerifyEmailPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (token) {
      handleVerifyEmail();
    }
  }, [token]);

  const handleVerifyEmail = async () => {
    if (!token) return;

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate verification success/failure
      const isSuccess = Math.random() > 0.2; // 80% success rate for demo

      if (isSuccess) {
        setIsVerified(true);
        console.log('Email verified:', { token });
      } else {
        setError('Invalid or expired verification link');
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setResending(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setResending(false);
    // In a real app, you would show a success message
    alert('Verification email has been resent to your email address');
  };

  // Loading state
  if (isLoading && token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--color-background)] via-[#f8f6f2] to-[var(--color-hover)]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 h-32 w-32 animate-pulse rounded-full bg-[var(--color-primary)]/5 blur-xl"></div>
          <div className="animation-delay-2000 absolute bottom-1/3 left-1/3 h-24 w-24 animate-pulse rounded-full bg-[var(--color-accent)]/5 blur-xl"></div>
        </div>

        <div className="relative flex min-h-screen items-center justify-center p-6">
          <div className="w-full max-w-md">
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-accent)]/20 blur-sm"></div>
              <Card className="relative border-2 border-[var(--color-border)]/50 bg-[var(--color-card)] shadow-lg">
                <CardHeader className="space-y-4 pb-6 text-center">
                  <div className="flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary)]/10">
                      <RefreshCw className="h-8 w-8 animate-spin text-[var(--color-primary)]" />
                    </div>
                  </div>
                  <CardTitle className="font-['Noto_Sans_Display'] text-2xl font-bold text-[var(--color-foreground)]">
                    Verifying Email
                  </CardTitle>
                  <CardDescription className="font-['Noto_Sans_Ethiopic'] text-base text-[var(--color-muted-foreground)]">
                    Please wait while we verify your email address
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="flex justify-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-[var(--color-primary)]/20 border-t-[var(--color-primary)]"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--color-background)] via-[#f8f6f2] to-[var(--color-hover)]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 h-32 w-32 animate-pulse rounded-full bg-[var(--color-accent)]/5 blur-xl"></div>
        </div>

        <div className="relative flex min-h-screen items-center justify-center p-6">
          <div className="w-full max-w-md">
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-primary)]/20 blur-sm"></div>
              <Card className="relative border-2 border-[var(--color-border)]/50 bg-[var(--color-card)] shadow-lg">
                <CardHeader className="space-y-4 pb-6 text-center">
                  <div className="flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-accent)]/10">
                      <CheckCircle2 className="h-8 w-8 text-[var(--color-accent)]" />
                    </div>
                  </div>
                  <CardTitle className="font-['Noto_Sans_Display'] text-2xl font-bold text-[var(--color-foreground)]">
                    Email Verified!
                  </CardTitle>
                  <CardDescription className="font-['Noto_Sans_Ethiopic'] text-base text-[var(--color-muted-foreground)]">
                    Your email address has been successfully verified
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-[var(--color-accent)]">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="text-sm font-medium">
                        Verification successful
                      </span>
                    </div>
                    <p className="font-['Noto_Sans_Ethiopic'] text-sm text-[var(--color-muted-foreground)]">
                      You can now access all features of SafeHaven
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={() => navigate('/auth/login')}
                      className="w-full rounded-lg bg-[var(--color-accent)] py-3 font-['Noto_Sans_Ethiopic'] font-medium text-[var(--color-accent-foreground)] shadow-lg transition-all duration-200 hover:bg-[var(--color-accent)]/90 hover:shadow-xl"
                    >
                      Continue to Login
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--color-background)] via-[#f8f6f2] to-[var(--color-hover)]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 h-32 w-32 animate-pulse rounded-full bg-red-500/5 blur-xl"></div>
        </div>

        <div className="relative flex min-h-screen items-center justify-center p-6">
          <div className="w-full max-w-md">
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 blur-sm"></div>
              <Card className="relative border-2 border-red-500/50 bg-[var(--color-card)] shadow-lg">
                <CardHeader className="space-y-4 pb-6 text-center">
                  <div className="flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
                      <AlertCircle className="h-8 w-8 text-red-500" />
                    </div>
                  </div>
                  <CardTitle className="font-['Noto_Sans_Display'] text-2xl font-bold text-[var(--color-foreground)]">
                    Verification Failed
                  </CardTitle>
                  <CardDescription className="font-['Noto_Sans_Ethiopic'] text-base text-[var(--color-muted-foreground)]">
                    {error}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Button
                      onClick={handleResendVerification}
                      disabled={resending}
                      className="w-full rounded-lg bg-[var(--color-primary)] py-3 font-['Noto_Sans_Ethiopic'] font-medium text-white shadow-lg transition-all duration-200 hover:bg-[var(--color-primary)]/90 hover:shadow-xl"
                    >
                      {resending ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                          <span>Resending...</span>
                        </div>
                      ) : (
                        'Resend Verification Email'
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => navigate('/auth/login')}
                      className="w-full rounded-lg border-2 border-[var(--color-border)] py-3 font-['Noto_Sans_Ethiopic'] font-medium text-[var(--color-foreground)] transition-all duration-200 hover:bg-[var(--color-hover)]"
                    >
                      Back to Login
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default state - no token provided
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-background)] via-[#f8f6f2] to-[var(--color-hover)]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 h-32 w-32 animate-pulse rounded-full bg-[var(--color-primary)]/5 blur-xl"></div>
        <div className="animation-delay-2000 absolute bottom-1/3 left-1/3 h-24 w-24 animate-pulse rounded-full bg-[var(--color-accent)]/5 blur-xl"></div>
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
              </div>
            </div>
            <h1 className="mb-2 font-['Noto_Sans_Display'] text-3xl font-bold text-[var(--color-accent)]">
              SafeHaven
            </h1>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-accent)]/20 blur-sm"></div>
            <Card className="relative border-2 border-[var(--color-border)]/50 bg-[var(--color-card)] shadow-lg">
              <CardHeader className="space-y-4 pb-6 text-center">
                <div className="flex justify-center">
                  <div className="h-1 w-20 rounded-full bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent"></div>
                </div>
                <CardTitle className="font-['Noto_Sans_Display'] text-2xl font-bold text-[var(--color-foreground)]">
                  Verify Your Email
                </CardTitle>
                <CardDescription className="font-['Noto_Sans_Ethiopic'] text-base text-[var(--color-muted-foreground)]">
                  Please check your email and click the verification link
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-4 text-center">
                  <div className="flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary)]/10">
                      <Mail className="h-8 w-8 text-[var(--color-primary)]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="font-['Noto_Sans_Ethiopic'] text-sm text-[var(--color-foreground)]">
                      We've sent a verification email to your registered email
                      address
                    </p>
                    <p className="font-['Noto_Sans_Ethiopic'] text-xs text-[var(--color-muted-foreground)]">
                      Click the link in the email to complete your registration
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handleResendVerification}
                    disabled={resending}
                    variant="outline"
                    className="w-full rounded-lg border-2 border-[var(--color-border)] py-3 font-['Noto_Sans_Ethiopic'] font-medium text-[var(--color-foreground)] transition-all duration-200 hover:bg-[var(--color-hover)]"
                  >
                    {resending ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--color-foreground)]/30 border-t-[var(--color-foreground)]"></div>
                        <span>Resending...</span>
                      </div>
                    ) : (
                      'Resend Verification Email'
                    )}
                  </Button>

                  <div className="space-y-2 text-center">
                    <Link
                      to="/auth/login"
                      className="text-sm font-semibold text-[var(--color-primary)] transition-colors hover:text-[var(--color-primary)]/80"
                    >
                      Back to Login
                    </Link>
                    <div className="font-['Noto_Sans_Ethiopic'] text-xs text-[var(--color-muted-foreground)]">
                      Already verified?{' '}
                      <Link
                        to="/auth/login"
                        className="font-medium text-[var(--color-primary)] hover:text-[var(--color-primary)]/80"
                      >
                        Sign in
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
