import React from 'react';
import { Providers } from '@/store/providers';
import MyApp from './app';

import './global.css';

export const metadata = {
  title: 'Zariux',
  description: '',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <MyApp>{children}</MyApp>
        </Providers>
      </body>
    </html>
  );
}
