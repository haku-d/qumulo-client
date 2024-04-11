import { UTCDate } from '@date-fns/utc';
import { eachDayOfInterval, eachHourOfInterval, parse, subDays, subHours } from 'date-fns';
import { format } from 'date-fns-tz';
import { useCallback, useMemo } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';

export enum Period {
  LAST_24_HOURS = '24h',
  LAST_7_DAYS = '7d',
  LAST_30_DAYS = '30d',
}

type ThemeConfig = {
  readColor?: string;
  writeColor?: string;
  yAxisFormatter?(val: number): string;
  xAxisFormatter?(val: number): string;
};
type ChartProps = {
  period: Period;
  unit: string;
  timestamp: number[];
  read: number[];
  write: number[];
  themeConfig?: ThemeConfig;
  onMouseMove?(v: number[]): void;
};

type LegendProps = {
  title: string;
  unit: string;
  read: number;
  write: number;
  themeConfig?: ThemeConfig;
};

const formatNumber = (number: number, prefix = '') => {
  if (number === undefined) return `${prefix}0`;
  if (isNaN(number)) return `${prefix}0`;
  const _val = Math.floor(number / 1000);
  const _out = _val > 1 ? `${String(_val.toFixed(1))}k` : String(number.toFixed(1));
  return `${prefix}${_out}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export function Chart(props: ChartProps) {
  const { period, timestamp, read, write, themeConfig, onMouseMove } = props;
  const tickFormatter = themeConfig?.yAxisFormatter ? themeConfig.yAxisFormatter : (t: number) => t;
  const xAxisTickFormatter = useCallback(
    ({ x, y, payload }: any) => {
      const formatters = {
        [Period.LAST_24_HOURS]: 'HH:mm',
        [Period.LAST_7_DAYS]: 'MMM dd',
        [Period.LAST_30_DAYS]: 'MMM dd',
      };
      return (
        <text x={x} y={y} fill="#A6AAAE" font-size="12" textAnchor="middle">
          {format(parse(String(payload.value), 't', new Date()), formatters[period])}
        </text>
      );
    },
    [period],
  );
  const yAxisTickFormatter = ({ x, y, payload }: any) => {
    return (
      <text x={x} y={y} fill="#A6AAAE" font-size="12" textAnchor="middle">
        {tickFormatter(payload.value)}
      </text>
    );
  };
  const ticks = useMemo(() => {
    const now = new UTCDate();
    const tickMap = {
      [Period.LAST_24_HOURS]: eachHourOfInterval({
        start: subHours(now, 24),
        end: now,
      }).map((t) => format(t, 't')),
      [Period.LAST_7_DAYS]: eachDayOfInterval({
        start: subDays(now, 7),
        end: now,
      }).map((t) => format(t, 't')),
      [Period.LAST_30_DAYS]: eachDayOfInterval({
        start: subDays(now, 30),
        end: now,
      }).map((t) => format(t, 't')),
    };
    return tickMap[period];
  }, [period]);
  const renderTooltip = ({ active, payload, label }: TooltipProps<any, any>) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${format(parse(String(label), 't', new Date()), 'MMM.d, H:mmaaa')}`}</p>
        </div>
      );
    }

    return null;
  };
  const handleMouseMove = (data: any) => {
    if (!data.isTooltipActive) return;
    if (typeof onMouseMove !== 'function') return;
    onMouseMove([data.activePayload[0].value, data.activePayload[1].value]);
  };
  return (
    <ResponsiveContainer width="100%" height="100%" className={'relative mt-4'}>
      <LineChart
        data={timestamp.map((t, i) => ({
          timestamp: t,
          read: read[i],
          write: write[i],
        }))}
        onMouseMove={handleMouseMove}
      >
        <XAxis
          dataKey="timestamp"
          name="Time"
          domain={['auto', 'auto']}
          tickLine={true}
          type="number"
          tick={xAxisTickFormatter}
          scale="auto"
          ticks={ticks}
          tickMargin={20}
        />
        <YAxis tick={yAxisTickFormatter} tickLine={false} axisLine={false} tickMargin={20} />
        <Tooltip
          active={true}
          position={{ y: -15 }}
          wrapperStyle={{ left: -10 }}
          cursor={{ stroke: '#F3F4F4', strokeWidth: 1 }}
          isAnimationActive={false}
          content={renderTooltip}
        />
        <Line
          type="monotone"
          dot={false}
          activeDot={true}
          dataKey="read"
          stroke={themeConfig?.readColor}
        />
        <Line
          type="monotone"
          dot={false}
          activeDot={true}
          dataKey="write"
          stroke={themeConfig?.writeColor}
        />
        <CartesianGrid vertical={false} horizontal={true} opacity={0.2} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function Legend(props: LegendProps) {
  const { title, read, write, unit, themeConfig } = props;
  return (
    <div className="flex w-40 flex-none flex-col">
      <h3 className="text-ink-pale">{title}</h3>
      <dl className="grid grid-rows-1 gap-px divide-y divide-charcoal-grey bg-ebony-clay/30 ring-1 ring-charcoal-grey">
        <div className="px-3 py-2">
          <dt className="text-cloud-darker">Read</dt>
          <dd style={{ color: themeConfig?.readColor }}>
            {formatNumber(read)} {unit}
          </dd>
        </div>
        <div className="px-3 py-2">
          <dt className="text-cloud-darker">Write</dt>
          <dd style={{ color: themeConfig?.writeColor }}>
            {formatNumber(write)} {unit}
          </dd>
        </div>
      </dl>
    </div>
  );
}
