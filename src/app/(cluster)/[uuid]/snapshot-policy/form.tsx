'use client';

import { Fragment, useEffect, useMemo, useState } from 'react';

import { useCluster } from '@/hooks/use-cluster';
import { getClusterSnapshotPolicy, updateClusterSnapshotPolicy } from '@/services/cluster';
import Button from '@/ui/button';
import {
  Checkbox,
  Description,
  Field,
  Input,
  InputField,
  InputFieldWithAddon,
  Label,
  Radio,
  Select,
} from '@/ui/form';
import HelpIcon from '@/ui/icons/help';
import Link from '@/ui/link';
import { Spinner } from '@/ui/spinner';
import { ClusterPolicy } from '@/validators/cluster';

const ScheduleDays = ({
  days,
  onChanged,
}: {
  days: number[] | null;
  onChanged?(changed: { value: string | number; checked: boolean }): void;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChanged &&
      onChanged({
        value: e.target.value,
        checked: e.target.checked,
      });
  };
  return (
    <Fragment>
      <Checkbox
        label="Mon"
        id="mon"
        value={1}
        name="scheduleDays"
        defaultChecked={days?.includes(1)}
        onChange={handleChange}
      />
      <Checkbox
        label="Tue"
        id="tue"
        value={2}
        name="scheduleDays"
        defaultChecked={days?.includes(2)}
        onChange={handleChange}
      />
      <Checkbox
        label="Wed"
        id="wed"
        value={3}
        name="scheduleDays"
        defaultChecked={days?.includes(3)}
        onChange={handleChange}
      />
      <Checkbox
        label="Thur"
        id="thur"
        value={4}
        name="scheduleDays"
        defaultChecked={days?.includes(4)}
        onChange={handleChange}
      />
      <Checkbox
        label="Fri"
        id="fri"
        value={5}
        name="scheduleDays"
        defaultChecked={days?.includes(5)}
        onChange={handleChange}
      />
      <Checkbox
        label="Sat"
        id="sat"
        value={6}
        name="scheduleDays"
        defaultChecked={days?.includes(6)}
        onChange={handleChange}
      />
      <Checkbox
        label="Sun"
        id="sun"
        value={0}
        name="scheduleDays"
        defaultChecked={days?.includes(0)}
        onChange={handleChange}
      />
    </Fragment>
  );
};

export default function Form() {
  const [fieldErrors, setFieldErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [policy, setPolicy] = useState<ClusterPolicy>();
  const cluster = useCluster();
  const [isEveryDayChecked, setEveryDayChecked] = useState(false);
  const snapshotRetentionPolicy = useMemo(() => {
    if (!policy) return;
    return policy.snapshotRetentionPolicy;
  }, [policy]);
  const handleSnapshotRetentionPolicyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPolicy({
      ...policy,
      snapshotRetentionPolicy: e.target.value,
    } as ClusterPolicy);
  };
  const handleEveryDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const days = e.target.checked ? [0, 1, 2, 3, 4, 5, 6] : [];
    setEveryDayChecked(e.target.checked);
    setPolicy({
      ...policy,
      scheduleDays: days,
    } as ClusterPolicy);
  };
  const handleScheduleDayChange = (target: any) => {
    let days = policy?.scheduleDays ?? [];
    if (target.checked) {
      days.push(Number(target.value));
    } else {
      const idx = days.indexOf(Number(target.value));
      days = [...days.slice(0, idx), ...days.slice(idx + 1)];
    }
    setPolicy({
      ...policy,
      scheduleDays: days,
    } as ClusterPolicy);
    setEveryDayChecked(days.length === 7);
  };

  const buildPolicyData = (formData: FormData) => {
    const data = Object.fromEntries(formData);
    return {
      ...data,
      timezone: null,
      scheduleDays: formData.getAll('scheduleDays').map(Number),
      scheduleTime: `${data.scheduleTime_hh}:${data.scheduleTime_mm}`,
      snapshotRetentionDuration: Number(data.snapshotRetentionDuration),
      enableLockedSnapshot: formData.get('enableLockedSnapshot') === 'on',
      enablePolicy: formData.get('enablePolicy') === 'on',
    };
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = buildPolicyData(new FormData(e.target as HTMLFormElement));
    const validatedFields = ClusterPolicy.safeParse(formData);
    if (validatedFields.success) {
      setIsLoading(true);
      setFieldErrors({});
      updateClusterSnapshotPolicy(cluster.clusterId, formData).finally(() => {
        setTimeout(() => setIsLoading(false), 1500);
      });
    } else {
      setFieldErrors(validatedFields.error.flatten().fieldErrors);
    }
  };

  useEffect(() => {
    getClusterSnapshotPolicy(cluster.clusterId)
      .then((policy) => {
        setPolicy(policy);
      })
      .finally(() => setIsLoading(false));
  }, [cluster]);

  if (isLoading) return <Spinner text="Loading..." />;

  return (
    <form onSubmit={onSubmit} data-testid="form-policy">
      <div className="grid grid-cols-1 gap-y-4 md:grid-cols-6">
        <div className="md:col-span-4">
          <InputField
            label="Policy Name"
            name="name"
            id="name"
            defaultValue={policy?.name}
            errorMsg={fieldErrors['name']?.[0]}
          />
        </div>
        <div className="md:col-span-4">
          <InputFieldWithAddon
            label="Apply to Directory"
            name="directory"
            id="directory"
            addonBefore={'/'}
            defaultValue={policy?.directory}
            errorMsg={fieldErrors['directory']?.[0]}
          />
        </div>
        <div className="md:col-span-6">
          <Label>Run Policy on the Following Schedule</Label>
          <dl className="space-y-4 border-t border-bright-grey bg-subpanel p-8">
            <div className="grid grid-cols-1 sm:gap-4 md:grid-cols-3">
              <dt className="flex items-center md:justify-end md:text-right">
                <Label>Select Schedule Type</Label>
              </dt>
              <dd className="md:col-span-2">
                <Select
                  defaultValue={policy?.scheduleType ?? 'daily-weekly'}
                  name="scheduleType"
                  options={[
                    { label: 'Hourly or less', value: 'hourly' },
                    { label: 'Daily or Weekly', value: 'daily-weekly' },
                    { label: 'Monthly', value: 'monthly' },
                  ]}
                />
              </dd>
            </div>

            <div className="grid grid-cols-1 sm:gap-4 md:grid-cols-3">
              <dt className="flex items-center md:justify-end md:text-right">
                <Label>Set to Time Zone</Label>
              </dt>
              <dd className="flex items-center md:col-span-2">
                {policy?.timezone} <HelpIcon className="ml-2" />
              </dd>
            </div>

            <div className="grid grid-cols-1 sm:gap-4 md:grid-cols-3">
              <dt className="flex items-center md:justify-end md:text-right">
                <Label>Take a Snapshot at</Label>
              </dt>
              <dd className="md:col-span-2">
                <div className="flex w-32 items-center gap-x-2">
                  <Input
                    name="scheduleTime_hh"
                    placeholder="HH"
                    defaultValue={policy?.scheduleTime.split(':')[0] ?? ''}
                  />
                  :
                  <Input
                    name="scheduleTime_mm"
                    placeholder="MM"
                    defaultValue={policy?.scheduleTime.split(':')[1] ?? ''}
                  />
                </div>
              </dd>
            </div>

            <div className="grid grid-cols-1 sm:gap-4 md:grid-cols-3">
              <dt className="flex items-center md:justify-end md:text-right">
                <Label>On the Following Day(s)</Label>
              </dt>
              <dd className="flex flex-wrap items-center gap-x-4 sm:col-span-2 sm:flex-nowrap">
                <Checkbox
                  label="Every day"
                  id="everyDay"
                  checked={isEveryDayChecked}
                  onChange={handleEveryDayChange}
                />
                <ScheduleDays
                  days={policy?.scheduleDays ?? []}
                  onChanged={handleScheduleDayChange}
                />
              </dd>
            </div>

            <div className="grid grid-cols-1 sm:gap-4 md:grid-cols-3">
              <dt className="flex items-center md:justify-end md:text-right">
                <Label>Delete Each Snapshot</Label>
              </dt>
              <dd className="flex flex-wrap items-center gap-x-4 sm:flex-nowrap md:col-span-2">
                {/* Should be a radio group */}
                <Radio
                  label="Never"
                  id="never"
                  name="snapshotRetentionPolicy"
                  value={'never'}
                  defaultChecked={snapshotRetentionPolicy === 'never'}
                  onChange={handleSnapshotRetentionPolicyChange}
                />
                <Radio
                  label="Automatically after"
                  id="auto"
                  name="snapshotRetentionPolicy"
                  value="auto"
                  defaultChecked={snapshotRetentionPolicy === 'auto'}
                  onChange={handleSnapshotRetentionPolicyChange}
                />
                <div className="flex w-48 items-center gap-x-2">
                  <Input
                    name="snapshotRetentionDuration"
                    type="number"
                    defaultValue={0}
                    disabled={snapshotRetentionPolicy === 'never'}
                  />
                  <Select
                    disabled={snapshotRetentionPolicy === 'never'}
                    name="snapshotRetentionType"
                    options={[
                      {
                        label: 'day(s)',
                        value: 'day',
                      },
                      {
                        label: 'week(s)',
                        value: 'week',
                      },
                      {
                        label: 'month(s)',
                        value: 'month',
                      },
                    ]}
                  />
                </div>
              </dd>
            </div>
          </dl>
        </div>
        <div className="md:col-span-6">
          <Field className="mt-8 w-full">
            <Label>Snapshot Locking</Label>
            <Description>
              Locked snapshots cannot be deleted before the deletion schedule expires. For this
              feature to be available, snapshots must be set to automatically delete.
            </Description>
            <Checkbox
              id="enableLockedSnapshot"
              label="Enable locked snapshots"
              name="enableLockedSnapshot"
              defaultChecked={policy?.enableLockedSnapshot ?? false}
              disabled={snapshotRetentionPolicy === 'never'}
            />
          </Field>
          <Field className="mt-12">
            <Checkbox
              id="enablePolicy"
              label="Enable policy"
              name="enablePolicy"
              defaultChecked={policy?.enablePolicy ?? false}
            />
          </Field>
          <Field className="mt-6 space-x-8">
            <Button type={'submit'}>Save Policy</Button>
            <Link href={'/'}>Cancel</Link>
          </Field>
        </div>
      </div>
    </form>
  );
}
