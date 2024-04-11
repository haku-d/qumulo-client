import * as api from '@/lib/api';

import { Cluster } from '@/types/cluster';

export const getClusters = async () => {
  /**
   * List of cluster should be from server
   */
  return Promise.resolve<Cluster[]>([
    {
      clusterId: '123e4567-e89b-12d3-a456-426655440000',
      clusterName: 'qumuto-app',
    },
  ]);
};

export const getClusterMetrics = async (clusterId: string, period: string) => {
  try {
    return api.getClusterMetrics(clusterId, period);
  } catch (_ /*Ignored Error*/) {
    return;
  }
};

export const getClusterSnapshotPolicy = async (clusterId: string) => {
  try {
    return api.getClusterSnapshotPolicy(clusterId);
  } catch (_ /*Ignored Error*/) {
    return;
  }
};
export const updateClusterSnapshotPolicy = async (clusterId: string, data: any) => {
  try {
    return api.updateClusterSnapshotPolicy(clusterId, data);
  } catch (_ /*Ignored Error*/) {
    return;
  }
};
