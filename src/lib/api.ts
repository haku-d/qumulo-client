import axios from 'axios';

const host = process.env.API_URL || 'http://localhost:3333';

export const getClusterMetrics = (clusterId: string, period: string) => {
  return axios.get(`${host}/${clusterId}/metrics`, { params: { period } }).then((res) => res.data);
};

export const getClusterSnapshotPolicy = (clusterId: string) => {
  return axios.get(`${host}/${clusterId}/snapshot_policy`).then((res) => res.data);
};

export const updateClusterSnapshotPolicy = (clusterId: string, data: any) => {
  return axios.put(`${host}/${clusterId}/snapshot_policy`, data).then((res) => res.data);
};
