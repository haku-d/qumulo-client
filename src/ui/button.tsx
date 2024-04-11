import { classNames } from './class-names';

export interface ButtonProps {
  disabled?: boolean;
  rounded?: boolean;
}

export default function Button(props: React.ComponentProps<'button'> & ButtonProps) {
  const { children, rounded = true, disabled = false } = props;

  return (
    <button
      className={classNames(
        'relative isolate inline-flex px-4 py-1.5 sm:text-sm sm:leading-6',
        'bg-blueberry',
        'text-white',
        rounded && 'rounded-md',
        'after:shadow-[shadow:inset_0_1px_theme(colors.white/25%)]',
        'after:rounded-[calc(theme(borderRadius.lg)-1px)]',
        'after:inset-0',
        'after:absolute',
        'after:-z-10',
        'hover:bg-blueberry-darker',
        'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blueberry-lighter',
        'active:after:shadow-[shadow:inset_0_-1px_theme(colors.white/25%)]',
        'disabled:bg-ink-pale',
        'disabled:after:shadow-none',
        'disabled:text-cloud',
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
