import type { Metadata } from 'next';
import { Inter, Nunito } from 'next/font/google';

import { classNames } from '@/ui/class-names';
import Layout from '@/ui/layout/main';
import './globals.css';

import { getClusters } from '@/services/cluster';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const nunito = Nunito({
  subsets: [],
  variable: '--font-nunito',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Qumulo Dashboard',
  description: 'Qumulo Dashboard',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clusters = await getClusters();

  return (
    <html lang="en">
      <body className={classNames(inter.variable, nunito.className, 'bg-mirage')}>
        <Layout clusters={clusters}>{children}</Layout>
      </body>
    </html>
  );
}
