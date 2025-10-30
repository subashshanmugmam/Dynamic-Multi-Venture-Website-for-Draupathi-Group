import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const AnimatedCounter = ({ 
  end, 
  duration = 2, 
  prefix = '', 
  suffix = '', 
  className = '',
  startAnimation = true 
}) => {
  const counterRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!startAnimation) return;

    const counter = counterRef.current;
    if (!counter) return;

    // Clear any existing animation
    if (animationRef.current) {
      animationRef.current.kill();
    }

    // Set initial value
    counter.textContent = prefix + '0' + suffix;

    // Create the animation
    animationRef.current = gsap.to({ value: 0 }, {
      value: end,
      duration: duration,
      ease: "power2.out",
      onUpdate: function() {
        const currentValue = Math.round(this.targets()[0].value);
        counter.textContent = prefix + currentValue.toLocaleString() + suffix;
      }
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [end, duration, prefix, suffix, startAnimation]);

  return (
    <motion.span
      ref={counterRef}
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {prefix}0{suffix}
    </motion.span>
  );
};

export default AnimatedCounter;