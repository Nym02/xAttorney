import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import bxsUpArrow from '@iconify-icons/bx/bxs-up-arrow';

export default function BackToTop() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const checkScrollHeight = () => {
      if (!showButton && window.pageYOffset > 400) {
        setShowButton(true);
      } else if (showButton && window.pageYOffset <= 400) {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', checkScrollHeight);
    return () => {
      window.removeEventListener('scroll', checkScrollHeight);
    };
  }, [showButton]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div
        onClick={scrollToTop}
        style={{ position: 'fixed', bottom: '32px', right: '32px' }}
        className={
          showButton
            ? 'flex items-center justify-center h-10 w-10 bg-darkSilver rounded text-deepdark cursor-pointer'
            : 'hidden'
        }
      >
        <Icon icon={bxsUpArrow} />
      </div>
    </>
  );
}
