import type { LinkProps } from 'next/link';
import NextLink from 'next/link';

/**
 * A wrapper of next/link
 * @param props
 * @returns
 */
export default function Link(props: React.PropsWithChildren<LinkProps>) {
  return <NextLink className="text-lg font-semibold text-blueberry-lighter" {...props} />;
}
