import clsx from 'clsx';

type LinkBadgeProps = {
  label: string;
  href: string;
  color:
    | 'amber'
    | 'blue'
    | 'green'
    | 'red'
    | 'purple'
    | 'pink'
    | 'teal'
    | 'indigo';
};

const colorClasses = {
  amber:
    'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 hover:bg-amber-200 dark:hover:bg-amber-800',
  blue: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800',
  green:
    'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800',
  red: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800',
  purple:
    'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 hover:bg-purple-200 dark:hover:bg-purple-800',
  pink: 'bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 hover:bg-pink-200 dark:hover:bg-pink-800',
  teal: 'bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 hover:bg-teal-200 dark:hover:bg-teal-800',
  indigo:
    'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 hover:bg-indigo-200 dark:hover:bg-indigo-800'
};

export default function LinkBadge({ label, href, color }: LinkBadgeProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        'ml-2 inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full transition-colors',
        colorClasses[color]
      )}
    >
      {label}
      <svg
        className="w-3 h-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </a>
  );
}
