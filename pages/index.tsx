import clsx from 'clsx';
import { Inter, Source_Code_Pro } from 'next/font/google';

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-source-code-pro'
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter'
});

type TooltipOptions = {
  bulleted?: boolean;
  bolded?: boolean;
  colorClassNames?: string;
};

type TooltipItem = string | [string, TooltipOptions];

type CommandOptions = {
  tooltip?: TooltipItem[];
  commandColorClass?: string;
  isText?: boolean;
};

type Command = [string, string, CommandOptions?];

type Section = {
  title: string;
  colorClass: string;
  tooltip?: TooltipItem[];
  commands: Command[];
};

const sections: Section[] = [
  {
    title: 'Movement',
    colorClass: 'text-blue-600 dark:text-blue-400',
    commands: [
      ['h/j/k/l', '←/↓/↑/→'],
      ['w/b', 'word start →/←'],
      ['e/ge', 'word end →/←'],
      ['W/B', 'spaced word start →/←'],
      ['E/gE', 'spaced word end →/←'],
      ['0/$', 'line start/end'],
      ['^/g_', 'first/last non-blank on line'],
      ['gg/G', 'file top/bottom'],
      ['(/)', 'sentences ←/→'],
      ['{/}', 'paragraphs ←/→'],
      ['[[/]]', 'sections ←/→'],
      ['Ctrl-o/Ctrl-i', 'older/newer position'],
      ['%', 'matching bracket']
    ]
  },
  {
    title: 'Scrolling',
    colorClass: 'text-pink-600 dark:text-pink-400',
    commands: [
      [
        'WITHOUT cursor',
        '',
        { isText: true, commandColorClass: 'font-semibold' }
      ],
      ['Ctrl-e', 'scroll down one line'],
      ['Ctrl-y', 'scroll up one line'],
      ['zt', 'current line to top'],
      ['zz', 'center current line'],
      ['zb', 'current line to bottom'],
      ['', '', { isText: true }],
      ['with CURSOR', '', { isText: true, commandColorClass: 'font-semibold' }],
      ['Ctrl-d/u', 'half page ↓/↑'],
      ['Ctrl-f/b', 'full page ↓/↑'],
      ['H/M/L', 'top/middle/bottom of screen'],
      ['[number]G', 'go to line [number]'],
      [':[number]', 'go to line [number]']
    ]
  },
  {
    title: 'Basic Editing',
    colorClass: 'text-green-600 dark:text-green-400',
    commands: [
      ['i/a', 'insert before/after'],
      ['I/A', 'insert at start/end of line'],
      ['o/O', 'new line below/above'],
      ['x/X', 'delete/backspace'],
      ['s', 'substitute character'],
      [
        'S',
        'substitute line',
        {
          tooltip: [
            'Deletes entire line and enters insert mode',
            "Keeps the line's indentation",
            'Equivalent to <kbd>cc</kbd>'
          ]
        }
      ],
      ['u/Ctrl-r', 'undo/redo'],
      ['.', 'repeat last action'],
      ['>>/<<', 'indent/unindent'],
      ['==', 'auto-indent line'],
      ['J', 'join lines'],
      ['~', 'toggle case']
    ]
  },
  {
    title: 'Copy/Cut/Paste',
    colorClass: 'text-cyan-600 dark:text-cyan-400',
    commands: [
      ['yy', 'copy line'],
      ['yw', 'copy word'],
      ['y$', 'copy to line end'],
      ['dd', 'cut line'],
      ['dw', 'cut word'],
      ['d$', 'cut to line end'],
      ['p/P', 'paste after/before'],
      ['"+y', 'copy to clipboard'],
      ['"+p', 'paste from clipboard']
    ]
  },
  {
    title: 'Visual Mode',
    colorClass: 'text-yellow-600 dark:text-yellow-400',
    commands: [
      [
        'v',
        'select characters',
        {
          tooltip: [
            [
              "Why <kbd>vt$</kbd> doesn't select to end of line as you may expect:",
              { bulleted: false, bolded: true }
            ],
            '<kbd>$</kbd> is a motion command, not a character to search for',
            '<kbd>t</kbd> and <kbd>f</kbd> search for actual characters in the text',
            '<kbd>vt$</kbd> would look for a literal $ character',
            ['Use these instead:', { bulleted: false, bolded: true }],
            '<kbd>v$</kbd> - select to end of line',
            '<kbd>vg_</kbd> - select to last non-blank character',
            '<kbd>^vg_</kbd> - select line without indent or new line'
          ]
        }
      ],
      ['V', 'select lines'],
      ['Ctrl-v', 'select block'],
      ['y', 'copy selection'],
      ['d', 'delete selection'],
      [
        'c/s',
        'change selection',
        {
          tooltip: [
            [
              "In visual mode, <kbd>c</kbd> and <kbd>s</kbd> do the same thing. In normal mode they're different:",
              { bulleted: false }
            ],
            '<kbd>s</kbd> substitutes one character',
            '<kbd>c</kbd> requires a motion'
          ]
        }
      ],
      ['>/<', 'indent/unindent'],
      ['Esc', 'exit visual mode']
    ]
  },
  {
    title: 'Search & Replace',
    colorClass: 'text-purple-600 dark:text-purple-400',
    commands: [
      ['/word', 'search forward'],
      ['?word', 'search backward'],
      ['n/N', 'next/prev match'],
      ['*/#', 'next/prev word under cursor'],
      [':noh', 'clear highlights'],
      [':%s/old/new/g', 'replace all'],
      [':%s/old/new/gc', 'replace with confirm']
    ]
  },
  {
    title: 'Files',
    colorClass: 'text-red-600 dark:text-red-400',
    commands: [
      [':w', 'save file'],
      [':q', 'quit vim'],
      [':wq', 'save and quit'],
      [':q!', 'quit without saving'],
      [
        ':cq',
        'exit with error',
        {
          tooltip: [
            'Great for aborting Git operations',
            'Cancels rebase, merge, commit'
          ]
        }
      ],
      [':e filename', 'open file'],
      [':sp', 'split horizontal'],
      [':vsp', 'split vertical'],
      ['Ctrl-w Ctrl-w', 'switch windows'],
      ['Ctrl-w Ctrl-h/j/k/l', '←/↓/↑/→']
    ]
  },
  {
    title: 'Text Objects',
    colorClass: 'text-orange-600 dark:text-orange-400',
    commands: [
      [
        'Pattern: [action][scope][object]',
        '',
        { isText: true, commandColorClass: 'font-bold !text-sm' }
      ],
      ['', '', { isText: true }],
      ['Actions', '', { isText: true, commandColorClass: 'font-bold' }],
      ['d', 'delete'],
      ['c', 'change'],
      ['y', 'yank (copy)'],
      ['v', 'visual select'],
      ['gU', 'uppercase'],
      ['gu', 'lowercase'],
      ['g~', 'toggle case'],
      ['', '', { isText: true }],
      ['Scopes', '', { isText: true, commandColorClass: 'font-bold' }],
      ['i', 'inside (exclusive)'],
      ['a', 'around (inclusive)'],
      ['', '', { isText: true }],
      ['Objects', '', { isText: true, commandColorClass: 'font-bold' }],
      ['w', 'word'],
      ['W', 'word with punctuation'],
      ['s', 'sentence'],
      ['p', 'paragraph'],
      ['b', "block (same as '(')"],
      ['B', "Block (same as '{')"],
      ['t', 'tag (HTML/XML)'],
      ['" \' `', 'quoted strings'],
      ['( ) or b', 'parentheses'],
      ['{ } or B', 'braces'],
      ['[ ]', 'brackets'],
      ['< >', 'angle brackets'],
      ['', '', { isText: true }],
      ['Examples', '', { isText: true, commandColorClass: 'font-bold' }],
      ['iw', 'word'],
      ['aw', 'word with space'],
      [
        'i[char]',
        'inside [char]',
        {
          tooltip: [
            [
              'Works with any delimiter character:',
              { bulleted: false, bolded: true }
            ],
            '<kbd>i"</kbd> - inside quotes',
            '<kbd>i(</kbd> - inside parens',
            '<kbd>i{</kbd> - inside braces',
            '<kbd>i[</kbd> - inside brackets',
            "<kbd>i'</kbd> - inside single quotes",
            '<kbd>i`</kbd> - inside backticks'
          ]
        }
      ],
      [
        'a[char]',
        'around [char]',
        {
          tooltip: [
            [
              'Includes the delimiter characters:',
              { bulleted: false, bolded: true }
            ],
            '<kbd>a"</kbd> - inside with quotes',
            '<kbd>a(</kbd> - inside with parens',
            '<kbd>a{</kbd> - inside with braces',
            '<kbd>a[</kbd> - inside with brackets',
            "<kbd>a'</kbd> - inside with single quotes",
            '<kbd>a`</kbd> - inside with backticks'
          ]
        }
      ],
      ['it', 'tag content'],
      ['at', 'tag content with tags']
    ]
  },
  {
    title: 'Character Motion Commands',
    colorClass: 'text-indigo-600 dark:text-indigo-400',
    commands: [
      ['f/F[char]', 'to (inclusive) char →/←'],
      ['t/T[char]', 'till (exclusive) char →/←'],
      [';/,', 'repeat →/←'],
      ['', '', { isText: true }],
      [
        'Can prefix with actions:',
        '',
        { isText: true, commandColorClass: 'font-bold !text-sm' }
      ],
      ['d', 'delete'],
      ['c', 'change'],
      ['y', 'copy'],
      ['v', 'visual select'],
      ['Examples', '', { isText: true, commandColorClass: 'font-bold' }],
      ['dt<space>', 'delete till space (exclusive)'],
      ['df<space>', 'delete to space (inclusive)'],
      ['ct)', 'change till closing paren (exclusive)'],
      ['yf.', 'copy to period (inclusive)'],
      ['vt:', 'select till colon (exclusive)']
    ]
  },
  {
    title: 'Other',
    colorClass: 'text-teal-600 dark:text-teal-400',
    commands: [
      [':set number', 'show line numbers'],
      [':set nonumber', 'hide line numbers']
    ]
  }
];

function parseTextWithKbd(text: string) {
  const parts = text.split(/(<kbd>.*?<\/kbd>)/g);
  return parts.map((part, i) => {
    if (part.startsWith('<kbd>') && part.endsWith('</kbd>')) {
      const content = part.slice(5, -6);
      return (
        <kbd
          key={i}
          className="inline-block px-0.5 py-px mx-0.5 text-xs font-mono bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded border border-gray-300 dark:border-gray-600 shadow-sm"
          style={{
            fontFamily: 'var(--font-source-code-pro), monospace',
            boxShadow:
              '0 1px 2px rgba(0, 0, 0, 0.1), inset 0 -1px 2px rgba(0, 0, 0, 0.1)'
          }}
        >
          {content}
        </kbd>
      );
    }
    return part;
  });
}

function renderTooltipContent(items: TooltipItem[]) {
  return items.map((item, index) => {
    const isString = typeof item === 'string';
    const text = isString ? item : item[0];
    const options = isString ? {} : item[1];
    const bulleted = options.bulleted !== false;
    const bolded = options.bolded || false;
    const colorClassNames = options.colorClassNames || '';

    return (
      <p
        key={index}
        className={`${index < items.length - 1 ? 'mb-2' : ''} ${
          bolded ? 'font-semibold' : ''
        } ${colorClassNames}`}
      >
        {bulleted ? '• ' : ''}
        {parseTextWithKbd(text)}
      </p>
    );
  });
}

export default function Home() {
  return (
    <div
      className={clsx(
        'min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4',
        sourceCodePro.variable,
        inter.variable
      )}
    >
      <h1 className="text-2xl font-bold text-center mb-4">
        Vim Cheat Sheet for Beginners
      </h1>

      <style jsx global>{`
        body {
          font-family:
            var(--font-inter),
            -apple-system,
            BlinkMacSystemFont,
            'Segoe UI',
            'Roboto',
            'Oxygen',
            'Ubuntu',
            'Cantarell',
            'Fira Sans',
            'Droid Sans',
            'Helvetica Neue',
            sans-serif;
        }
        .font-mono {
          font-family:
            var(--font-source-code-pro), 'SF Mono', Monaco, 'Cascadia Code',
            'Roboto Mono', Consolas, 'Courier New', monospace;
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.025em;
          white-space: nowrap;
        }
      `}</style>

      <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 text-sm">
        {sections.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm dark:shadow-none"
          >
            <div className={section.tooltip ? 'group relative' : ''}>
              <h2
                className={clsx(
                  'text-base font-bold mb-2 flex items-center justify-between',
                  section.colorClass
                )}
              >
                {section.title}
                {section.tooltip && (
                  <svg
                    className="w-4 h-4 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
              </h2>
              {section.tooltip && (
                <div
                  className={`
                  fixed z-50 invisible group-hover:visible            /* positioning & visibility */
                  bg-white dark:bg-gray-900                       /* background colors */
                  text-gray-700 dark:text-gray-100 text-sm        /* text color & size */
                  rounded-lg p-4 shadow-xl                            /* shape, padding & shadow */
                  border border-gray-200 dark:border-gray-700     /* border styling */
                  max-w-[90vw] md:max-w-md                            /* max width constraints */
                  lg:absolute lg:w-80 lg:top-full lg:mt-2 lg:left-0   /* large screen: absolute below trigger */
                  left-[5vw] top-[30vh]                               /* mobile: fixed position */
                  md:absolute md:top-full md:mt-2 md:left-0           /* medium screen: absolute below trigger */
                `}
                >
                  {renderTooltipContent(section.tooltip)}
                </div>
              )}
            </div>
            <div className="space-y-1">
              {section.commands.map((cmd, cmdIndex) => {
                const [command, description, options = {}] = cmd;
                const isText = options.isText || false;
                const commandColorClass = options.commandColorClass || '';
                const tooltip = options.tooltip;

                if (isText) {
                  return (
                    <div
                      key={cmdIndex}
                      className={clsx(
                        'text-gray-700 dark:text-gray-300 text-xs',
                        commandColorClass
                      )}
                    >
                      {command}
                    </div>
                  );
                }

                return (
                  <div
                    key={cmdIndex}
                    className={clsx(
                      'flex justify-between items-start gap-1',
                      tooltip && 'group relative'
                    )}
                  >
                    <span
                      className={`font-mono flex items-center gap-1 ${commandColorClass}`}
                      style={tooltip ? { whiteSpace: 'nowrap' } : {}}
                    >
                      {command}
                      {tooltip && (
                        <svg
                          className="w-4 h-4 text-blue-600 dark:text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}
                    </span>
                    <span className="text-right">{description}</span>
                    {tooltip && (
                      <div
                        className={`
                        fixed z-50 invisible group-hover:visible        /* positioning & visibility */
                        bg-white dark:bg-gray-900                       /* background colors */
                        text-gray-700 dark:text-gray-100 text-sm       /* text color & size */
                        rounded-lg p-3 shadow-xl                        /* shape, padding & shadow */
                        border border-gray-200 dark:border-gray-700    /* border styling */
                        max-w-[90vw] md:max-w-sm                       /* max width constraints */
                        lg:absolute lg:top-full lg:mt-1 lg:left-0 lg:w-64  /* large screen: absolute below trigger */
                        left-[5vw] top-[40vh]                           /* mobile: fixed position */
                        md:absolute md:top-full md:mt-1 md:left-0 md:w-64  /* medium screen: absolute below trigger */
                      `}
                      >
                        {renderTooltipContent(tooltip)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
