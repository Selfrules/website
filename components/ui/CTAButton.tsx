'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, MotionProps } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface CTAButtonProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'neon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  iconAnimation?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const variantStyles = {
  primary: 'bg-primary text-brutalist-text-light hover:bg-primary-500 border-brutal border-brutalist-border',
  secondary: 'bg-secondary text-white hover:bg-secondary-500 border-brutal border-brutalist-border',
  accent: 'bg-accent text-white hover:bg-accent-500 border-brutal border-brutalist-border',
  neon: 'bg-white text-brutalist-text-light hover:bg-primary border-brutal border-brutalist-border',
};

const sizeStyles = {
  sm: 'px-3 py-2 md:px-4 md:py-2 text-body-sm gap-2',
  md: 'px-5 py-2.5 md:px-6 md:py-3 text-body gap-2',
  lg: 'px-6 py-3 md:px-8 md:py-4 text-body-lg gap-3',
  xl: 'px-8 py-4 md:px-10 md:py-5 text-body-xl gap-3',
};

const iconSizes = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
};

const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      icon: Icon,
      iconPosition = 'left',
      iconAnimation = true,
      loading = false,
      disabled = false,
      onClick,
      type = 'button',
      ...motionProps
    },
    ref
  ) => {
    const LoadingSpinner = () => (
      <motion.svg
        className="animate-spin"
        width={iconSizes[size]}
        height={iconSizes[size]}
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </motion.svg>
    );

    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        onClick={onClick}
        className={cn(
          'relative inline-flex items-center justify-center font-bold rounded-brutal shadow-brutal transition-all',
          'text-sentence-case',
          variantStyles[variant],
          sizeStyles[size],
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'group',
          className
        )}
        whileHover={
          !disabled && !loading
            ? {
                y: -4,
                x: -4,
                boxShadow: '12px 12px 0px #000000',
              }
            : {}
        }
        whileTap={
          !disabled && !loading
            ? {
                y: 4,
                x: 4,
                boxShadow: '4px 4px 0px #000000',
              }
            : {}
        }
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25,
        }}
        {...motionProps}
      >
        {loading ? (
          <>
            <LoadingSpinner />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {Icon && iconPosition === 'left' && (
              <motion.div
                animate={
                  iconAnimation
                    ? {
                        x: [0, -3, 0],
                      }
                    : {}
                }
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Icon size={iconSizes[size]} />
              </motion.div>
            )}
            {children}
            {Icon && iconPosition === 'right' && (
              <motion.div
                animate={
                  iconAnimation
                    ? {
                        x: [0, 3, 0],
                      }
                    : {}
                }
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Icon size={iconSizes[size]} />
              </motion.div>
            )}
          </>
        )}
      </motion.button>
    );
  }
);

CTAButton.displayName = 'CTAButton';

export default CTAButton;