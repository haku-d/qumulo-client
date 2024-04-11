import { ClusterProvider } from '@/hooks/use-cluster';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { describe, expect, test } from 'vitest';

import { flushPromises } from '@/lib/test-util';
import Form from './form';

const host = process.env.API_URL || 'http://localhost:3333';

const mockClusterPolicy = (mockData = {}) => {
  return {
    name: 'ProjectX_Daily',
    directory: 'prod/bucket',
    scheduleType: 'daily',
    timezone: 'America/Toronto',
    scheduleTime: '07:00',
    scheduleDays: [2, 3, 4],
    snapshotRetentionPolicy: 'auto', // never | automatic
    snapshotRetentionDuration: 99,
    snapshotRetentionType: 'day', // day | week | month
    enableLockedSnapshot: false,
    enablePolicy: true,
    ...mockData,
  };
};

const renderSnapshotPolicyForm = () =>
  render(
    <ClusterProvider clusters={[{ clusterId: 1 }]}>
      <Form />
    </ClusterProvider>,
  );

const setupHTTPMocks = (mockData: any) => {
  const httpMock = new AxiosMockAdapter(axios, { delayResponse: 0 });
  httpMock.onGet(`${host}/1/snapshot_policy`).reply(200, mockClusterPolicy(mockData));
  return httpMock;
};

describe('<SnapshotPolicy>', () => {
  test('renders <Spinner> before receiving response from API', async () => {
    // arrange
    setupHTTPMocks({
      name: 'ProjectX_Daily',
    });
    // act
    const { getByTestId } = renderSnapshotPolicyForm();
    // assert
    expect(getByTestId('loading')).toBeDefined();
    // cleanup
    await flushPromises();
  });

  test('populates <policy name>', async () => {
    // arrange
    setupHTTPMocks({
      name: 'ProjectX_Daily',
    });
    // act
    renderSnapshotPolicyForm();

    const inputNode = screen.getByLabelText<HTMLInputElement>('Policy Name');
    expect(inputNode.value).toEqual('ProjectX_Daily');
  });

  test('populates <schedule time>', async () => {
    // arrange
    setupHTTPMocks({
      scheduleTime: '07:00',
    });
    // act
    renderSnapshotPolicyForm();

    const hhNode = screen.getByPlaceholderText<HTMLInputElement>('HH');
    const mmNode = screen.getByPlaceholderText<HTMLInputElement>('MM');
    expect(hhNode.value).toEqual('07');
    expect(mmNode.value).toEqual('00');
  });

  test('populates <schedule days>', async () => {
    // arrange
    setupHTTPMocks({});
    // act
    renderSnapshotPolicyForm();

    const tueNode = screen.getByLabelText<HTMLInputElement>('Tue');
    const wedNode = screen.getByLabelText<HTMLInputElement>('Wed');
    const thueNode = screen.getByLabelText<HTMLInputElement>('Thur');

    expect(tueNode.checked).toBeTruthy();
    expect(wedNode.checked).toBeTruthy();
    expect(thueNode.checked).toBeTruthy();
  });
});
