import type React from 'react';
import { cn } from '@/lib/utils';

import Link from 'next/link';
import SocialButton from './socialButton';
import FormSign from './form';

interface AuthFormProps {
  className?: string;
  formType: '/sign-in' | '/sign-up';
  title?: string;
  description?: string;
  submitButtonText?: string;
  alternateActionText?: string;
  alternateActionLink: '/sign-in' | '/sign-up';
  alternateActionLinkText?: string;
}

export function AuthForm({
  className,
  formType,
  title,
  description,
  submitButtonText,
  alternateActionText,
  alternateActionLink,
  alternateActionLinkText,
}: AuthFormProps) {
  // Default texts based on form type
  const defaultTitle =
    formType === '/sign-in' ? 'Login to your account' : 'Create an account';
  const defaultDescription =
    formType === '/sign-in'
      ? 'Enter your email below to login to your account'
      : 'Enter your details below to create your account';
  const defaultSubmitButtonText =
    formType === '/sign-in' ? 'Login' : 'Register';
  const defaultAlternateActionText =
    formType === '/sign-in'
      ? "Don't have an account?"
      : 'Already have an account?';
  const defaultAlternateActionLinkText =
    formType === '/sign-in' ? 'Register' : 'Login';

  // Use provided texts or defaults
  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalSubmitButtonText = submitButtonText || defaultSubmitButtonText;
  const finalAlternateActionText =
    alternateActionText || defaultAlternateActionText;
  const finalAlternateActionLinkText =
    alternateActionLinkText || defaultAlternateActionLinkText;

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">{finalTitle}</h1>
        <p className="text-muted-foreground text-sm text-balance">
          {finalDescription}
        </p>
      </div>

      <FormSign ButtonText={finalSubmitButtonText} type={formType} />
      <SocialButton />
      <div className="text-center text-sm">
        {finalAlternateActionText}{' '}
        <Link
          href={alternateActionLink}
          className="underline underline-offset-4"
        >
          {finalAlternateActionLinkText}
        </Link>
      </div>
    </div>
  );
}
