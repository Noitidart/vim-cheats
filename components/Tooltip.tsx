import type { Placement } from '@popperjs/core';
import { createPopper, Instance } from '@popperjs/core';
import { useEffect, useRef, useState } from 'react';

type TooltipProps = {
  children: React.ReactNode;
  content: React.ReactNode;
  placement?: Placement;
};

export default function Tooltip({
  children,
  content,
  placement = 'auto'
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const popperInstanceRef = useRef<Instance | null>(null);

  useEffect(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    popperInstanceRef.current = createPopper(
      triggerRef.current,
      tooltipRef.current,
      {
        placement,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 8]
            }
          },
          {
            name: 'preventOverflow',
            options: {
              boundary: 'viewport',
              padding: 8
            }
          },
          {
            name: 'flip',
            options: {
              fallbackPlacements: ['top', 'bottom', 'left', 'right']
            }
          }
        ]
      }
    );

    return () => {
      popperInstanceRef.current?.destroy();
      popperInstanceRef.current = null;
    };
  }, [placement]);

  useEffect(() => {
    if (isVisible && popperInstanceRef.current) {
      popperInstanceRef.current.update();
    }
  }, [isVisible]);

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="inline-flex"
      >
        {children}
      </div>
      <div
        ref={tooltipRef}
        className={`
          z-50 transition-opacity duration-200
          bg-white dark:bg-gray-900
          text-gray-700 dark:text-gray-100 text-sm
          rounded-lg p-3 shadow-xl
          border border-gray-200 dark:border-gray-700
          max-w-[90vw] md:max-w-sm
          ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      >
        {content}
      </div>
    </>
  );
}
