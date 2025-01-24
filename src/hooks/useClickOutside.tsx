import React from 'react';

// Hook to hide drop on click outside
export const useClickOutside = (elementReft: React.RefObject<Element>, callback: () => void) => {
  const handleClick = (e: MouseEvent) => {
    if (elementReft.current && !elementReft.current.contains(e.target as Element)) {
      callback();
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  });
};
