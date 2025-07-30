import LinkBadge from '@/components/LinkBadge';
import Tooltip from '@/components/Tooltip';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

type TooltipOptions = {
  bulleted?: boolean;
  bolded?: boolean;
  colorClassNames?: string;
};

type TooltipItem = string | [string, TooltipOptions];

type CommandOptions = {
  tooltip?: TooltipItem[];
  commandColorClass?: string;
  commandSizeClass?: string;
  descriptionClassNames?: string;
  isText?: boolean;
};

type Command = [React.ReactNode, React.ReactNode, CommandOptions?];

type Section = {
  title: React.ReactNode;
  colorClass: string;
  tooltip?: TooltipItem[];
  commands: Command[];
};

const titleColorClassNames = {
  movement: 'text-blue-600 dark:text-blue-400',
  scrolling: 'text-pink-500 dark:text-pink-400',
  basicEditing: 'text-green-700 dark:text-green-400',
  basicActions: 'text-cyan-600 dark:text-cyan-400',
  visualMode: 'text-yellow-600 dark:text-yellow-400',
  searchReplace: 'text-purple-700 dark:text-purple-400',
  files: 'text-red-600 dark:text-red-400',
  textObjects: 'text-emerald-500 dark:text-emerald-400',
  surround: 'text-amber-500 dark:text-amber-400',
  miscellaneous: 'text-indigo-600 dark:text-indigo-400'
};

const sections: Section[] = [
  {
    title: 'Movement',
    colorClass: titleColorClassNames.movement,
    commands: [
      ['h/j/k/l', '←/↓/↑/→'],
      ['w/b', 'word start →/←'],
      ['e/ge', 'word end →/←'],
      ['W/B', 'spaced word start →/←'],
      ['E/gE', 'spaced word end →/←'],
      ['0/$', 'line start/end'],
      ['^/g_', 'first/last non-blank on line'],
      ['gg/G', 'file top/bottom'],
      [
        '(/)',
        'sentences ←/→',
        {
          tooltip: [
            'Jumps to previous/next . ! ? followed by space',
            'In code: often jumps between comments or strings'
          ]
        }
      ],
      [
        '{/}',
        'paragraphs ←/→',
        {
          tooltip: [
            'Jumps to previous/next blank line',
            'Great for navigating between code blocks'
          ]
        }
      ],
      [
        '[[/]]',
        'sections ←/→',
        {
          tooltip: [
            'In TypeScript/React: often jumps to file start/end',
            'Designed for C where { starts functions at column 0',
            'Consider using { } for code navigation instead'
          ]
        }
      ],
      ['f/F[char]', 'to (inclusive) char →/←'],
      ['t/T[char]', 'till (exclusive) char →/←'],
      [';/,', 'repeat [char] →/←']
    ]
  },
  {
    title: 'Scrolling',
    colorClass: titleColorClassNames.scrolling,
    commands: [
      ['Without Cursor', '', { isText: true, commandColorClass: 'font-bold' }],
      ['Ctrl-e', 'scroll down one line'],
      ['Ctrl-y', 'scroll up one line'],
      ['zt', 'current line to top'],
      ['zz', 'center current line'],
      ['zb', 'current line to bottom'],
      ['', '', { isText: true }],
      ['With Cursor', '', { isText: true, commandColorClass: 'font-bold' }],
      ['Ctrl-d/u', 'half page ↓/↑'],
      ['Ctrl-f/b', 'full page ↓/↑'],
      ['H/M/L', 'top/middle/bottom of screen'],
      ['[number]G', 'go to line [number]'],
      [':[number]', 'go to line [number]'],
      ['Ctrl-o/Ctrl-i', 'older/newer position'],
      ['%', 'matching bracket']
    ]
  },
  {
    title: 'Basic Editing',
    colorClass: titleColorClassNames.basicEditing,
    commands: [
      ['i/a', 'insert before/after'],
      ['I/A', 'insert at start/end of line'],
      ['o/O', 'new line below/above'],
      ['u/Ctrl-r', 'undo/redo'],
      [
        '.',
        'repeat last action',
        {
          tooltip: [
            'If the last action entered insert mode, it repeats without re-entering insert mode',
            'Example: After typing <kbd>ciw</kbd> then <kbd>hello</kbd>, pressing <kbd>.</kbd> will change the next word to <kbd>hello</kbd>'
          ]
        }
      ],
      ['>>/<<', 'indent/unindent'],
      ['==', 'auto-indent line'],
      ['J', 'join lines'],
      ['~', 'toggle case and move right']
    ]
  },
  {
    title: 'Basic Actions',
    colorClass: titleColorClassNames.basicActions,
    commands: [
      [
        'Pattern: [action][motion]',
        '',
        {
          isText: true,
          commandColorClass: 'font-bold',
          commandSizeClass: 'text-sm'
        }
      ],
      ['Actions', '', { isText: true, commandColorClass: 'font-bold' }],
      ['y', 'yank '],
      ['d', 'cut'],
      ['c', 'cut & insert'],
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
      [
        '"+y',
        'copy to clipboard',
        {
          tooltip: [
            'Native copy commands (Cmd+C on macOS, Ctrl+C on Windows/Linux) work in visual mode too!',
            'Modern terminals intercept native copy commands and copy visual selection',
            'Both achieve the same result for local use',
            ['Differences:', { bulleted: false, bolded: true }],
            '<kbd>"+y</kbd> works over SSH, native copy does not',
            '<kbd>"+y</kbd> puts text in Vim registers too',
            'Native copy depends on your terminal app'
          ]
        }
      ],
      ['gu/U', 'lower/upper-case'],
      ['g~', 'toggle case'],
      ['Motions', '', { isText: true, commandColorClass: 'font-bold' }],
      [
        <>
          See Movement{' '}
          <span className="text-xs font-normal text-gray-900 dark:text-gray-100">
            except repeat (;/,)
          </span>
        </>,
        '',
        {
          isText: true,
          commandColorClass: `font-bold ${titleColorClassNames.movement}`,
          commandSizeClass: 'text-sm'
        }
      ],
      [
        'Shortcuts (Special Cases)',
        '',
        {
          isText: true,
          commandColorClass: 'font-bold',
          commandSizeClass: 'text-sm'
        }
      ],
      ['yy/Y', 'yank line'],
      ['dd', 'cut line'],
      [
        'cc/S',
        'cut & insert line',
        {
          tooltip: ["Keeps the line's indentation"]
        }
      ],
      ['s/cl', 'substitute char'],
      ['x/X (dl/dh)', 'cut char right/left'],
      ['D/d$', 'cut to line end'],
      ['C/c$', 'cut & insert to line end'],
      [
        '"_d',
        'delete to black hole',
        {
          tooltip: [
            'The black hole register prevents deleted text from overwriting the default register',
            'Example: <kbd>"_dd</kbd> deletes the line without storing it',
            'This allows you to paste previously yanked text without it being replaced',
            'Works with any delete operation: <kbd>"_d</kbd>, <kbd>"_x</kbd>, <kbd>"_c</kbd>, etc.'
          ]
        }
      ],
      [
        'Pasting (No Motion)',
        '',
        {
          isText: true,
          commandColorClass: 'font-bold',
          commandSizeClass: 'text-sm'
        }
      ],
      ['p/P', 'paste after/before'],
      [
        '"+p/P',
        'paste from clipboard after/before',
        {
          tooltip: [
            [
              'Warning about native paste (Cmd+V on macOS, Ctrl+V on Windows/Linux):',
              { bulleted: false, bolded: true }
            ],
            'In Normal mode: Each character acts as a command!',
            'In Insert mode: Works but can mess up formatting',
            ['Best practices:', { bulleted: false, bolded: true }],
            'Use <kbd>"+p</kbd> in Normal mode (recommended)',
            'Or enter Insert mode first, then <kbd>:set paste</kbd>',
            'Use native paste, then <kbd>:set nopaste</kbd>',
            'This prevents auto-indent issues'
          ]
        }
      ]
    ]
  },
  {
    title: 'Visual Mode',
    colorClass: titleColorClassNames.visualMode,
    commands: [
      ['V', 'select lines'],
      ['Ctrl-v', 'select block'],
      [
        'Actions',
        '',
        {
          isText: true,
          commandColorClass: 'font-bold',
          commandSizeClass: 'text-sm'
        }
      ],
      [
        'See Movement',
        '',
        {
          isText: true,
          commandColorClass: `font-bold ${titleColorClassNames.movement}`
        }
      ],
      [
        'See "With Cursor" in Scrolling',
        '',
        {
          isText: true,
          commandColorClass: `font-bold ${titleColorClassNames.scrolling}`
        }
      ],
      [
        'See "Actions" in Basic Actions',
        '',
        {
          isText: true,
          commandColorClass: `font-bold ${titleColorClassNames.basicActions}`
        }
      ],
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
      ['=', 'auto-indent'],
      ['Esc', 'exit visual mode']
    ]
  },
  {
    title: 'Search & Replace',
    colorClass: titleColorClassNames.searchReplace,
    commands: [
      ['/word', 'search forward'],
      ['?word', 'search backward'],
      ['n/N', 'next/prev match'],
      ['*/#', 'next/prev word under cursor'],
      [':noh', 'clear highlights'],
      [':%s/old/new/g', 'replace all', { tooltip: [
        'The g flag means "global" - without it, only the first match on each line is replaced',
        ['Using a different delimiter:', { bulleted: false, bolded: true }],
        'When text contains many forward slashes (like paths), you can use a different delimiter instead of escaping:',
        '<kbd>:%s#/home/team#/home/team/Downloads#g</kbd>',
        'Common delimiter alternatives: <kbd>#</kbd>, <kbd>_</kbd>, <kbd>@</kbd>'
      ] }],
      [':%s/old/new/gc', 'replace with confirm']
    ]
  },
  {
    title: 'Files',
    colorClass: titleColorClassNames.files,
    commands: [
      [':w', 'save file'],
      [':q', 'quit vim'],
      [':wq', 'save even if no changes and quit'],
      ['ZZ/:x', 'save if changes then quit'],
      ['ZQ/:q!', 'quit without saving'],
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
    colorClass: titleColorClassNames.textObjects,
    commands: [
      [
        'Pattern: [action][scope][object]',
        '',
        {
          isText: true,
          commandColorClass: 'font-bold',
          commandSizeClass: 'text-sm'
        }
      ],
      ['', '', { isText: true }],
      ['Actions', '', { isText: true, commandColorClass: 'font-bold' }],
      [
        'See "Actions" in Basic Actions',
        '',
        {
          isText: true,
          commandColorClass: `font-bold ${titleColorClassNames.basicActions}`
        }
      ],
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
      ['b', "paren block (same as '(')"],
      ['B', "brace block (same as '{')"],
      ['t', 'tag'],
      ['" \' `', 'quoted strings'],
      ['( ) or b', 'parentheses'],
      ['{ } or B', 'braces'],
      ['[ ]', 'brackets'],
      ['< >', 'angle brackets'],
      ['', '', { isText: true }],
      ['Examples', '', { isText: true, commandColorClass: 'font-bold' }],
      ['[action]iw', 'word'],
      ['[action]aw', 'word with space'],
      [
        '[action]i[char]',
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
        '[action]a[char]',
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
      ['[action]it', 'tag content'],
      ['[action]at', 'tag content with tags']
    ]
  },
  {
    title: (
      <>
        <span className="align-middle">Surround</span>

        <LinkBadge
          label="Extension"
          href="https://github.com/tpope/vim-surround"
          color="amber"
        />
      </>
    ),
    colorClass: titleColorClassNames.surround,
    commands: [
      ['cs[old][new]', 'change [old] to [new]'],
      ['ds[surrounder]', 'delete [surrounder]'],
      ['ys[motion][surrounder]', 'add'],
      ['S[surrounder]', 'add around visual'],
      ['', '', { isText: true }],
      ['Surrounders', '', { isText: true, commandColorClass: 'font-bold' }],
      ['"/\'/`/)/]/}', 'itself'],
      ['(/{/[', 'itself with space'],
      [
        'See "Objects" in Text Objects',
        '',
        {
          isText: true,
          commandColorClass: `font-bold ${titleColorClassNames.textObjects}`
        }
      ],
      ['Examples', '', { isText: true, commandColorClass: 'font-bold' }],
      ['ysiw<p class="red">', 'surround word'],
      ['viwS<p class="red">', 'surround selected word'],
      ['yss)', 'surround sentence (typically line)'],
      ["cs'<q>", 'change quotes to <q>'],
      ['cst"', 'change tags to "'],
      ['cst<span>', 'change tags to <span>']
    ]
  },
  {
    title: 'Miscellaneous',
    colorClass: titleColorClassNames.miscellaneous,
    commands: [
      [':set nu/nonu', 'toggle line numbers'],
      [
        ':set ai/noai',
        'toggle auto-indent',
        {
          tooltip: ["Copies current line's indentation to new line"]
        }
      ],
      [
        ':set tabstop=#',
        'Tab key # spaces',
        {
          tooltip: [
            'Also sets indent width for <kbd>>></kbd> and <kbd><<</kbd> (<kbd>><</kbd> and <kbd><</kbd> in visual mode) operations unless explicitly configured with <kbd>:set shiftwidth=#</kbd>'
          ]
        }
      ],
      [
        ':% [command]',
        'apply command to all lines',
        {
          tooltip: [
            '<kbd>%</kbd> is a range that means "all lines in the file"',
            ['Common uses:', { bulleted: false, bolded: true }],
            '<kbd>:%y</kbd> - copy all lines',
            '<kbd>:%y+</kbd> - copy all lines to system clipboard',
            '<kbd>:%d</kbd> - delete all lines',
            '<kbd>:%s/old/new/g</kbd> - replace all occurrences',
            ['Other ranges:', { bulleted: false, bolded: true }],
            '<kbd>:.</kbd> - current line only',
            '<kbd>:$</kbd> - last line',
            '<kbd>:1,10</kbd> - lines 1 to 10',
            '<kbd>:.,+5</kbd> - current line plus next 5'
          ]
        }
      ]
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
        className={clsx(
          index < items.length - 1 && 'mb-2',
          bolded && 'font-semibold',
          colorClassNames
        )}
      >
        {bulleted ? '• ' : ''}
        {parseTextWithKbd(text)}
      </p>
    );
  });
}

export default function Home() {
  const [headerVisible, setHeaderVisible] = useState(true);

  useEffect(function hideHeaderAfterMount() {
    function hideHeaderAfterDelay() {
      setHeaderVisible(false);
    }

    const timer = setTimeout(hideHeaderAfterDelay, 3000);

    return function cancelHidingHeaderBeforeUnmount() {
      clearTimeout(timer);
    };
  }, []);

  return (
    <main className="p-4">
      <h1
        className={clsx(
          'text-2xl font-bold text-center transition-all duration-500 ease-in-out overflow-hidden',
          headerVisible ? 'opacity-100 mb-4 max-h-10' : 'opacity-0 mb-0 max-h-0'
        )}
      >
        Vim Cheat Sheet for Beginners
      </h1>

      <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 text-sm">
        {sections.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm dark:shadow-none"
          >
            <div>
              {section.tooltip ? (
                <Tooltip
                  content={
                    <div className="p-1">
                      {renderTooltipContent(section.tooltip)}
                    </div>
                  }
                >
                  <h2
                    className={clsx(
                      'text-base font-bold mb-2 flex items-center justify-between',
                      section.colorClass
                    )}
                  >
                    {section.title}
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
                  </h2>
                </Tooltip>
              ) : (
                <h2
                  className={clsx(
                    'text-base font-bold mb-2',
                    section.colorClass
                  )}
                >
                  {section.title}
                </h2>
              )}
            </div>
            <div className="space-y-1">
              {section.commands.map((cmd, cmdIndex) => {
                const [command, description, options = {}] = cmd;
                const isText = options.isText || false;
                const commandColorClass =
                  options.commandColorClass ||
                  'text-gray-700 dark:text-gray-300';
                const commandSizeClass = options.commandSizeClass || 'text-xs';
                const tooltip = options.tooltip;

                if (isText) {
                  return (
                    <div
                      key={cmdIndex}
                      className={clsx(commandSizeClass, commandColorClass)}
                    >
                      {command}
                    </div>
                  );
                }

                if (tooltip) {
                  return (
                    <div
                      key={cmdIndex}
                      className="flex justify-between items-start gap-1"
                    >
                      <Tooltip content={renderTooltipContent(tooltip)}>
                        <span
                          className={clsx(
                            'font-mono flex items-center gap-1 whitespace-nowrap',
                            commandColorClass
                          )}
                        >
                          {command}
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
                        </span>
                      </Tooltip>
                      <span
                        className={clsx(
                          'text-right',
                          options.descriptionClassNames
                        )}
                      >
                        {description}
                      </span>
                    </div>
                  );
                }

                return (
                  <div
                    key={cmdIndex}
                    className="flex justify-between items-start gap-1"
                  >
                    <span
                      className={clsx(
                        'font-mono flex items-center gap-1',
                        commandColorClass
                      )}
                    >
                      {command}
                    </span>
                    <span
                      className={clsx(
                        'text-right',
                        options.descriptionClassNames
                      )}
                    >
                      {description}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
