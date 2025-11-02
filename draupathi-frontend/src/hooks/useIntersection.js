import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

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
  const [refs, setRefs] = useState([]);
  const [inViewStates, setInViewStates] = useState([]);

  useEffect(() => {
    const observers = [];
    const newRefs = [];
    const newInViewStates = [];

    for (let i = 0; i < count; i++) {
      const ref = { current: null };
      newRefs.push(ref);
      newInViewStates.push(false);

      const observer = new IntersectionObserver(
        ([entry]) => {
          setInViewStates(prev => {
            const updated = [...prev];
            updated[i] = entry.isIntersecting;
            return updated;
          });
        },
        options
      );

      observers.push(observer);
    }

    setRefs(newRefs);
    setInViewStates(newInViewStates);

    // Observe elements when refs are set
    const observeElements = () => {
      newRefs.forEach((ref, index) => {
        if (ref.current) {
          observers[index].observe(ref.current);
        }
      });
    };

    // Use a timeout to ensure refs are set
    const timeoutId = setTimeout(observeElements, 0);

    return () => {
      clearTimeout(timeoutId);
      observers.forEach(observer => observer.disconnect());
    };
  }, [count, JSON.stringify(options)]);

  return refs.map((ref, index) => ({ ref, inView: inViewStates[index] }));
};

// Alternative export name for backward compatibility
export const useScrollAnimation = useIntersection;