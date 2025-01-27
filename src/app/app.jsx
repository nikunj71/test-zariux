'use client';

import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import RTL from '@/app/(Panel)/layout/shared/customizer/RTL';
import { ThemeSettings } from '@/utils/theme/Theme';
import { useSelector } from 'react-redux';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { usePathname, useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';

import '@/utils/i18n';
import '@/app/api/index';

const MyApp = ({ children }) => {
  const router = useRouter();
  const theme = ThemeSettings();
  const pathname = usePathname();
  const pathWithoutLastPart = pathname.split('/')[2];
  const customizer = useSelector((state) => state.customizer);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      if (pathWithoutLastPart === 'a') {
        router.replace('/auth/a/login');
      } else {
        router.replace('/auth/u/login');
      }
    }
  }, [router]);
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <RTL direction={customizer.activeDir}>
          <CssBaseline />
          <Toaster />
          {children}
        </RTL>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default MyApp;
