'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useCluster } from '@/hooks/use-cluster';
import { Navigation } from '@/types/ui';
import { classNames } from '@/ui/class-names';
import { DotIcon } from '@/ui/icons/dot';
import { LogoIcon } from '@/ui/icons/logo';
import { UserMenu } from './user-menu';

export function Sidebar() {
  const pathname = usePathname();
  const { clusterId, clusterName } = useCluster();

  const navigation: Navigation[] = [
    {
      name: 'Performance Metrics',
      href: `/${clusterId}/performance`,
      exact: true,
    },
    {
      name: 'Edit Snapshot Policy',
      href: `/${clusterId}/snapshot-policy`,
      exact: false,
    },
  ];

  function isActive(item: Navigation) {
    if (item.exact) {
      return item.href === pathname;
    }

    let paths = pathname?.split('/').filter(Boolean);
    let myPaths = item.href.split('/').filter(Boolean);

    for (let [idx, path] of myPaths.entries()) {
      if (path !== paths[idx]) {
        return false;
      }
    }

    return true;
  }

  return (
    <div className="hidden lg:fixed lg:bottom-0 lg:top-0 lg:z-50 lg:flex lg:w-[200px] lg:flex-col">
      <div className="border-gray-light flex grow flex-col space-y-2 divide-y divide-pickled-bluewood overflow-y-auto border bg-subpanel pl-3 pr-2">
        <header className="flex h-12 shrink-0 items-center gap-x-2 pt-4 text-xl font-light text-cloud-pale">
          <LogoIcon className="h-7 w-auto" />
          {clusterName}
        </header>
        <nav className="flex flex-1 flex-col pt-4">
          <ul role="list" className="flex flex-1 flex-col">
            <li className="-mr-2">
              <ul role="list" className="space-y-1">
                {navigation.map((item) => (
                  <li key={item.name} className="relative">
                    {isActive(item) && (
                      <motion.div
                        layout
                        layoutId="active-indicator"
                        className="absolute right-0 top-0 flex items-center"
                      >
                        <div className="h-7 w-0.5 bg-agave" />
                      </motion.div>
                    )}
                    <Link
                      href={item.href}
                      className={classNames(
                        isActive(item) ? 'bg-mirage' : '',
                        'flex items-center gap-x-2 px-2 py-0.5 text-sm leading-6 text-white',
                      )}
                    >
                      <DotIcon />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="mt-auto">
              <UserMenu />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
