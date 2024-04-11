import { classNames } from './class-names';

export function Label(props: React.ComponentProps<'label'>) {
  return (
    <label
      className="mb-1 block select-none text-lg text-cloud data-[disabled]:opacity-50"
      {...props}
    />
  );
}

export function Input({
  hasError = false,
  ...props
}: React.ComponentProps<'input'> & { hasError?: boolean }) {
  return (
    <input
      type="text"
      className={classNames(
        'focus:shadow-input focus:shadow-moss-green focus:ring-moss-green block w-full rounded border-0 bg-ink/50 px-2.5 py-1.5 text-lg text-cloud ring-1 ring-inset ring-ink focus:outline-none focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6',
        hasError && 'ring-pomegranate focus:ring-pomegranate focus-within:ring-pomegranate',
      )}
      {...props}
    />
  );
}

export function InputField({
  label,
  errorMsg,
  ...props
}: React.ComponentProps<'input'> & {
  label: string;
  errorMsg?: string;
}) {
  return (
    <div>
      <Label htmlFor={props.id}>{label}</Label>
      <Input id={props.id} {...props} hasError={!!errorMsg} />
      {errorMsg && <p className="text-pomegranate mt-2">{errorMsg}</p>}
    </div>
  );
}

export function InputWithAddon({
  addonBefore,
  hasError = false,
  ...props
}: React.ComponentProps<'input'> & {
  addonBefore: string | React.ReactElement;
  hasError?: boolean;
}) {
  return (
    <div className="flex rounded ring-1 ring-inset ring-ink">
      <span className="bg-transparent inline-flex items-center rounded-l px-4 text-cloud">
        {addonBefore}
      </span>
      <input
        type="text"
        className={classNames(
          'focus:shadow-input focus:shadow-moss-green focus:ring-moss-green block w-full rounded border-0 bg-ink/50 px-2.5 py-1.5 text-lg text-cloud ring-1 ring-inset ring-ink focus:outline-none focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6',
          hasError && 'ring-pomegranate focus:ring-pomegranate focus-within:ring-pomegranate',
        )}
        {...props}
      />
    </div>
  );
}

export function InputFieldWithAddon({
  label,
  errorMsg,
  ...props
}: React.ComponentProps<'input'> & {
  label: string;
  errorMsg?: string;
  addonBefore: string | React.ReactElement;
}) {
  return (
    <div>
      <Label htmlFor={props.id}>{label}</Label>
      <InputWithAddon id={props.id} {...props} hasError={!!errorMsg} />
      {errorMsg && <p className="text-pomegranate mt-2">{errorMsg}</p>}
    </div>
  );
}

export function Field(props: React.ComponentProps<'div'>) {
  return <div {...props}>{props.children}</div>;
}

export function Legend(props: React.ComponentProps<'legend'>) {
  return <legend className="bg-secondary-surface border-t border-[#3D454D] p-8" {...props} />;
}

type SelectOption = {
  label: string;
  value: string | number;
};

export function Select({
  options,
  ...props
}: React.ComponentProps<'select'> & {
  options: SelectOption[];
}) {
  return (
    <select
      className={classNames(
        'active:ring-moss-green active:shadow-input active:shadow-moss-green',
        'focus:shadow-input focus:shadow-moss-green focus:ring-moss-green border-0 shadow',
        'disabled:shadow-none disabled:ring-0',
        'block rounded bg-ink/40 py-1.5 pl-2.5 pr-10 text-cloud ring-1 ring-ink',
      )}
      {...props}
    >
      {options.map((option, key) => (
        <option key={key} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export function Checkbox({ label, ...props }: React.ComponentProps<'input'> & { label: string }) {
  return (
    <div className="relative flex items-start">
      <div className="flex h-6 items-center">
        <input
          type="checkbox"
          id={props.id}
          {...props}
          className="h-4 w-4 rounded-sm text-blueberry focus:ring-blueberry disabled:bg-ink-lighter disabled:ring-1 disabled:ring-inset disabled:ring-ink disabled:hover:bg-ink-lighter"
        />
      </div>
      <div className="ml-2 h-6">
        <label htmlFor={props.id} className="text-cloud">
          {label}
        </label>
      </div>
    </div>
  );
}

export function Description(props: React.PropsWithChildren) {
  return <div className="mb-2 text-base text-cloud-darker">{props.children}</div>;
}

export function Radio({ label, ...props }: React.ComponentProps<'input'> & { label: string }) {
  return (
    <div className="relative flex items-start">
      <div className="flex h-6 items-center">
        <input
          id={props.id}
          type="radio"
          {...props}
          className="h-4 w-4 text-blueberry focus:ring-blueberry"
        />
      </div>
      <div className="ml-2 h-6">
        <label htmlFor={props.id} className="text-cloud">
          {label}
        </label>
      </div>
    </div>
  );
}
