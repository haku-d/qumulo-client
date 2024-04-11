'use client';

import { ClusterProvider } from '@/hooks/use-cluster';
import { Cluster } from '@/types/cluster';
import { Sidebar } from './sidebar';

export default function Layout({
  clusters,
  children,
}: React.PropsWithChildren<{ clusters: Cluster[] }>) {
  return (
    <ClusterProvider clusters={clusters}>
      <div className="">
        <Sidebar />
        <div className="lg:pl-[204px] lg:pr-[4px]">
          <main className="border-gray-light min-h-screen border bg-panel px-4 pb-4">
            {children}
          </main>
        </div>
      </div>
    </ClusterProvider>
  );
}
