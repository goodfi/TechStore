import { AuthForm } from '@/components/auth/login-form';
import React from 'react';

const SignUp = () => {
  return (
    <div className="w-full max-w-xs">
      <AuthForm formType={'/sign-up'} alternateActionLink="/sign-in" />
    </div>
  );
};

export default SignUp;
