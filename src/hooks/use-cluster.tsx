'use client';

import { createContext, useContext } from 'react';

import { Cluster } from '@/types/cluster';

const Context = createContext<{
  clusters: Cluster[];
} | null>(null);

export function ClusterProvider({
  clusters,
  children,
}: {
  clusters: any;
  children: React.ReactNode;
}) {
  return (
    <Context.Provider
      value={{
        clusters,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useCluster() {
  const ctx = useContext(Context);
  if (!ctx) {
    throw new Error('There is no <ClusterProvider/> found');
  }

  return ctx.clusters[0];
}
