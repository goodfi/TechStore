import { AuthForm } from '@/components/auth/login-form';
import React from 'react';

const SignIn = () => {
  return (
    <div className="w-full max-w-xs ">
      <AuthForm formType={'/sign-in'} alternateActionLink="/sign-up" />
    </div>
  );
};

export default SignIn;
