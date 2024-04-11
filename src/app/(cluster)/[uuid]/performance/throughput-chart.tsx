'use client';

import { useState } from 'react';

import { Chart, Legend, Period } from '@/ui/chart';

type ChartProps = {
  period: Period;
  timestamp: number[];
  read: number[];
  write: number[];
};

export default function ThroughPutChart(props: ChartProps) {
  const { period, timestamp, read, write } = props;
  const [throughput, setThroughput] = useState([0, 0]);

  return (
    <section className="">
      <div className="w-full flex-1 p-4">
        <h4 className="text-ink-pale">Throughput</h4>
        <div className="flex gap-x-4">
          <div className="flex h-[144px] grow">
            <Chart
              unit="KB/s"
              period={period}
              timestamp={timestamp}
              read={read}
              write={write}
              themeConfig={{
                yAxisFormatter: (val: number) => {
                  const kb2gb = (val: number) => {
                    const anchor = 1e6;
                    return Math.floor(val / anchor);
                  };
                  return `${kb2gb(val)} GB/s`;
                },
                readColor: '#8E8ECD',
                writeColor: '#00A3CA',
              }}
              onMouseMove={setThroughput}
            />
          </div>
          <Legend
            title="Throughput"
            read={throughput[0]}
            write={throughput[1]}
            unit="KB/s"
            themeConfig={{
              readColor: '#8E8ECD',
              writeColor: '#00A3CA',
            }}
          />
        </div>
      </div>
    </section>
  );
}
