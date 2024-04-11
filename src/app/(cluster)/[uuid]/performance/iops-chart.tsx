'use client';

import { useState } from 'react';

import { Chart, Legend, Period } from '@/ui/chart';

type ChartProps = {
  period: Period;
  timestamp: number[];
  read: number[];
  write: number[];
};

export default function IOPSChart(props: ChartProps) {
  const { period, timestamp, read, write } = props;
  const [iops, setIops] = useState([0, 0]);

  return (
    <section className="">
      <div className="w-full flex-1 p-4">
        <h4 className="text-ink-pale">IOPS</h4>
        <div className="flex gap-x-4">
          <div className="flex h-[144px] grow">
            <Chart
              unit="IOPS"
              period={period}
              timestamp={timestamp}
              read={read}
              write={write}
              themeConfig={{
                yAxisFormatter: (val: number) => {
                  const _val = Math.floor(val / 1000);
                  return `${_val}k`;
                },
                readColor: '#AA7EDD',
                writeColor: '#00A3CA',
              }}
              onMouseMove={setIops}
            />
          </div>
          <Legend
            title="IOPS"
            read={iops[0]}
            write={iops[1]}
            unit="IOPS"
            themeConfig={{ readColor: '#AA7EDD', writeColor: '#00A3CA' }}
          />
        </div>
      </div>
    </section>
  );
}
