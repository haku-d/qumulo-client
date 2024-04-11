export type Cluster = {
  clusterId: string;
  clusterName: string;
};

export type ClusterPolicy = {
  email: string;
  directory: string;
  scheduleType: string;
  timezone: string;
  scheduleTime: string;
  scheduleDays: number[];
  snapshotRetentionPolicy: string; // never | automatic
  snapshotRetentionDuration: number;
  snapshotRetentionType: string; // day | week | month
  enableLockedSnapshot: boolean;
  enablePolicy: boolean;
};
