import { useIntersection } from '../hooks/useIntersection';

// Simple test component to validate the hook works
const TestComponent = () => {
  const [ref, inView] = useIntersection({ threshold: 0.1 });
  
  return (
    <div ref={ref}>
      {inView ? 'In view' : 'Not in view'}
    </div>
  );
};

export default TestComponent;