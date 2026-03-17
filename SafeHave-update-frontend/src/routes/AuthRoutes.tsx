import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';

const LoginPage = lazy(() =>
  import('../auth/login').then((module) => ({ default: module.LoginPage }))
);
const RegisterPage = lazy(() =>
  import('../auth/register').then((module) => ({
    default: module.RegisterPage,
  }))
);
const ResetPasswordPage = lazy(() =>
  import('../auth/reset-password').then((module) => ({
    default: module.ResetPasswordPage,
  }))
);
const VerifyEmailPage = lazy(() =>
  import('../auth/verify-email').then((module) => ({
    default: module.VerifyEmailPage,
  }))
);

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
      <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
      {/* Legacy routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />
    </Routes>
  );
}
