"use client";

import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from 'next-intl';
import { AbstractIntlMessages } from "next-intl";
import React from "react";

type ProvidersProps = {
  children: React.ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
}

export function Providers({ children, locale, messages }: ProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SessionProvider>
        {children}
      </SessionProvider>
    </NextIntlClientProvider>
  );
} 