'use client';

import GmailProfileWatcher from '@/components/GmailProfileWatcher';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
  <SessionProvider>
    <GmailProfileWatcher />
      {children}
    </SessionProvider>
    );
}
export default Providers;