import VerifyEmailContent from '@/app/verify-email/verify-email-content/verify-email-content';
import { Suspense } from 'react';

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
