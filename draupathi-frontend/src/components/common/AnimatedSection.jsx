import React from 'react';
import { motion } from 'framer-motion';
import { useIntersection } from '../../hooks/useIntersection';

const AnimatedSection = ({ 
  children, 
  className = '', 
  animation = 'fadeInUp',
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
  ...props 
}) => {
  const [ref, isIntersecting] = useIntersection({ 
    threshold, 
    triggerOnce 
  });

  // Animation variants
  const animations = {
    fadeInUp: {
      hidden: {
        opacity: 0,
        y: 20,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut",
          delay,
        },
      },
    },
    fadeInDown: {
      hidden: {
        opacity: 0,
        y: -20,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut",
          delay,
        },
      },
    },
    fadeInLeft: {
      hidden: {
        opacity: 0,
        x: -20,
      },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut",
          delay,
        },
      },
    },
    fadeInRight: {
      hidden: {
        opacity: 0,
        x: 20,
      },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut",
          delay,
        },
      },
    },
    scaleIn: {
      hidden: {
        opacity: 0,
        scale: 0.8,
      },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut",
          delay,
        },
      },
    },
    slideInUp: {
      hidden: {
        y: "100%",
        opacity: 0,
      },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.7,
          ease: "easeOut",
          delay,
        },
      },
    },
    slideInDown: {
      hidden: {
        y: "-100%",
        opacity: 0,
      },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.7,
          ease: "easeOut",
          delay,
        },
      },
    },
    slideInLeft: {
      hidden: {
        x: "-100%",
        opacity: 0,
      },
      visible: {
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.7,
          ease: "easeOut",
          delay,
        },
      },
    },
    slideInRight: {
      hidden: {
        x: "100%",
        opacity: 0,
      },
      visible: {
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.7,
          ease: "easeOut",
          delay,
        },
      },
    },
    zoomIn: {
      hidden: {
        opacity: 0,
        scale: 0,
      },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut",
          delay,
        },
      },
    },
    rotateIn: {
      hidden: {
        opacity: 0,
        rotate: -180,
      },
      visible: {
        opacity: 1,
        rotate: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut",
          delay,
        },
      },
    },
    flipIn: {
      hidden: {
        opacity: 0,
        rotateY: -90,
      },
      visible: {
        opacity: 1,
        rotateY: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut",
          delay,
        },
      },
    },
    bounceIn: {
      hidden: {
        opacity: 0,
        scale: 0.3,
      },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.6,
          ease: "easeOut",
          delay,
          type: "spring",
          damping: 10,
          stiffness: 100,
        },
      },
    },
    staggerChildren: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.1,
          delayChildren: delay,
        },
      },
    },
  };

  const selectedAnimation = animations[animation] || animations.fadeInUp;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isIntersecting ? "visible" : "hidden"}
      variants={selectedAnimation}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;