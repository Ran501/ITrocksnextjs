import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { motion } from 'framer-motion';
import { fadeIn, fadeInUp, slideInLeft, slideInRight, scaleUp } from '@/utils/scrollAnimations';

interface AnimatedElementProps {
  children: ReactNode;
  animation?: 'fadeIn' | 'fadeInUp' | 'slideInLeft' | 'slideInRight' | 'scaleUp';
  className?: string;
  threshold?: number;
  rootMargin?: string;
  delay?: number;
}

const animations = {
  fadeIn,
  fadeInUp,
  slideInLeft,
  slideInRight,
  scaleUp,
};

export default function AnimatedElement({
  children,
  animation = 'fadeIn',
  className = '',
  threshold = 0.1,
  rootMargin = '0px',
  delay = 0,
}: AnimatedElementProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold, rootMargin });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={animations[animation]}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
} 