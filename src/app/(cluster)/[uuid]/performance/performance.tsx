'use client';

import { useEffect, useState } from 'react';

import { useCluster } from '@/hooks/use-cluster';
import { getClusterMetrics } from '@/services/cluster';
import { Period } from '@/ui/chart';
import Header from '@/ui/layout/header';
import { RangePicker } from '@/ui/range-picker';
import { Spinner } from '@/ui/spinner';
import IOPSChart from './iops-chart';
import ThroughPutChart from './throughput-chart';

export function Performance() {
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState<any>();
  const [period, setPeriod] = useState(Period.LAST_7_DAYS);
  const cluster = useCluster();

  useEffect(() => {
    getClusterMetrics(cluster.clusterId, period)
      .then(setMetrics)
      .finally(() => setIsLoading(false));
  }, [period, cluster]);

  if (isLoading) return <Spinner text="Loading..." />;

  return (
    <div className="flex flex-col text-cloud-pale">
      <Header
        title="Performance Metrics"
        extras={[<RangePicker key={'range-picker'} onChange={(k: Period) => setPeriod(k)} />]}
      />
      {/* IOPS */}
      <IOPSChart
        period={period}
        timestamp={metrics.timestamp}
        read={metrics.indicators.iops.read}
        write={metrics.indicators.iops.write}
      />

      {/* Throughput */}
      <ThroughPutChart
        period={period}
        timestamp={metrics.timestamp}
        read={metrics.indicators.throughput.read}
        write={metrics.indicators.throughput.write}
      />
    </div>
  );
}
