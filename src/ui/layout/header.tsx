import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { Fragment, useState } from 'react';

import { useCluster } from '@/hooks/use-cluster';
import { Navigation } from '@/types/ui';
import { classNames } from '@/ui/class-names';
import { Bars3Icon } from '@/ui/icons/bar3';
import { DotIcon } from '@/ui/icons/dot';
import { LogoIcon } from '@/ui/icons/logo';
import { XMarkIcon } from '@/ui/icons/x';
import { Dialog, Transition } from '@headlessui/react';
import { UserMenu } from './user-menu';

const navigation: Navigation[] = [
  {
    name: 'Performance Metrics',
    href: '/uuid/performance',
    exact: true,
  },
  {
    name: 'Edit Snapshot Policy',
    href: '/uuid/snapshot-policy',
    exact: false,
  },
];

export default function Header({
  title,
  extras,
}: {
  title: string;
  extras?: React.ReactElement[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { clusterName } = useCluster();

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

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="-mt-[3px] flex h-16 w-full items-center">
      <button type="button" className="-m-1 mr-2 p-1 text-agave lg:hidden">
        <Bars3Icon onClick={openModal} />
      </button>
      <h1 className="text-xl font-light leading-8">{title}</h1>
      <div className="flex flex-1 items-center justify-end gap-x-4 self-stretch lg:gap-x-6">
        {extras}
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-ink/70" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-out duration-300"
              enterFrom="opacity-0 transform -translate-x-72"
              enterTo="opacity-100 transform translate-x-0"
              leave="transition ease-in duration-300"
              leaveFrom="opacity-100 transform translate-x-0"
              leaveTo="opacity-0 transform -translate-x-72"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <div className="absolute left-full top-0 flex w-16 justify-center pt-6">
                  <button type="button" className="-m-2.5 p-2.5 text-white" onClick={closeModal}>
                    <XMarkIcon />
                  </button>
                </div>
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-subpanel px-6 pt-4">
                  <div className="flex h-16 shrink-0 items-center gap-x-2 font-light text-cloud-pale">
                    <LogoIcon className="h-7 w-auto" />
                    {clusterName}
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name} className="relative">
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
