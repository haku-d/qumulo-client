export function Spinner({ text }: { text: string }) {
  return (
    <div
      data-testid="loading"
      className="bg-gray-200/40 fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center"
    >
      <div className="bg-gray-200 bg-sky-400 inline-flex cursor-not-allowed items-center rounded-md px-4 py-2 text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out">
        <svg
          className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        {text || ''}
      </div>
    </div>
  );
}
