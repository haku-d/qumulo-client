'use client';

import { ArrowDropdownIcon } from '@/ui/icons/arrow-drop-down';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

const options = [
  { name: 'Last 24 hours', value: '24h' },
  { name: 'Last 7 days', value: '7d' },
  { name: 'Last 30 days', value: '30d' },
];

export function RangePicker({
  value = '7d',
  onChange,
}: {
  value?: string;
  onChange(item: string): void;
}) {
  const [selected, setSelected] = useState(options.find((option) => option.value === value));
  return (
    <Menu as="div" className="relative z-10 inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-ebony-clay px-4 py-2 text-sm font-medium text-white ring-1 ring-inset ring-charcoal-grey focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
          {selected?.name}
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
        <Menu.Items className="divide-gray-100 absolute right-0 mt-2 w-56 origin-top-right divide-y rounded-md bg-ebony-clay shadow-lg ring-1 ring-charcoal-grey focus:outline-none">
          <div className="px-1 py-1 ">
            {options.map((option, key) => (
              <Menu.Item key={key}>
                {({ active }) => (
                  <button
                    className={`${
                      active || selected?.value === option.value
                        ? 'bg-panel text-cloud-pale'
                        : 'text-cloud'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => {
                      setSelected(option);
                      onChange(option.value);
                    }}
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
