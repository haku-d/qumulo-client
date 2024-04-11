import { z } from 'zod';

export const ClusterPolicy = z.object({
  name: z.string().min(1, { message: 'Enter policy name' }),
  directory: z.string().min(1, { message: 'Enter directory' }),
  scheduleType: z.string(),
  timezone: z.string().nullable(),
  scheduleTime: z.string().length(5),
  scheduleDays: z.number().array().nullable(),
  snapshotRetentionPolicy: z.string().nullable(),
  snapshotRetentionDuration: z.number().nullable(),
  snapshotRetentionType: z.string().nullable(),
  enableLockedSnapshot: z.boolean().nullable(),
  enablePolicy: z.boolean().nullable(),
});

export type ClusterPolicy = z.infer<typeof ClusterPolicy>;
