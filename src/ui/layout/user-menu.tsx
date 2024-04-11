'use client';

import { ArrowDropdownIcon } from '@/ui/icons/arrow-drop-down';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const options = [{ name: 'Your Profile' }, { name: 'Settings' }, { name: 'Sign out' }];

export function UserMenu() {
  return (
    <Menu as="div" className="z-10 block text-left">
      <div>
        <Menu.Button className="flex w-full items-center justify-between rounded-md px-2 py-2 text-white">
          <div className="flex items-center space-x-2 text-sm text-cloud-pale">
            <span className="flex size-3.5 items-center justify-center rounded-full bg-cloud-pale text-xs font-semibold text-subpanel">
              S
            </span>
            <span>AD\user</span>
          </div>
          <ArrowDropdownIcon
            className="text-violet-200 hover:text-violet-100 -mr-1 ml-2 h-5 w-5"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="divide-gray-100 absolute bottom-10 left-2 mt-2 w-[200px] origin-bottom-left divide-y rounded-md bg-ebony-clay shadow-lg ring-1 ring-charcoal-grey focus:outline-none">
          <div className="px-1 py-1 ">
            {options.map((option, key) => (
              <Menu.Item key={key}>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-panel text-cloud-pale' : 'text-cloud'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {option.name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
