import { useInView } from 'react-intersection-observer';

// Hook for scroll-triggered animations
export const useIntersection = (options = {}) => {
  const {
    threshold = 0.1,
    triggerOnce = true,
    rootMargin = '0px',
  } = options;

  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
    rootMargin,
  });

  return [ref, inView];
};

// Hook for multiple intersection observers (for staggered animations)
export const useMultipleIntersection = (count, options = {}) => {
  const observers = [];
  
  for (let i = 0; i < count; i++) {
    const [ref, inView] = useIntersection(options);
    observers.push({ ref, inView });
  }
  
  return observers;
};

// Alternative export name for backward compatibility
export const useScrollAnimation = useIntersection;