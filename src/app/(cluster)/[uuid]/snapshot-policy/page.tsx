'use client';

import Header from '@/ui/layout/header';
import Form from './form';

export default function Page() {
  return (
    <div className="flex flex-col text-cloud-pale">
      <Header title="Edit Snapshot Policy" />
      <Form />
    </div>
  );
}
