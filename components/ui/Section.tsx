import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'accent';
  spacing?: 'sm' | 'md' | 'lg';
  contained?: boolean;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    { className, variant = 'default', spacing = 'md', contained = true, children, ...props },
    ref
  ) => {
    const spacingStyles = {
      sm: 'py-12 md:py-16',
      md: 'py-16 md:py-24 lg:py-32',
      lg: 'py-24 md:py-32 lg:py-40',
    };

    const variantStyles = {
      default: 'bg-brutalist-bg-light',
      primary: 'bg-primary text-brutalist-text-light',
      secondary: 'bg-secondary text-white',
      accent: 'bg-accent text-white',
    };

    return (
      <section
        ref={ref}
        className={cn(spacingStyles[spacing], variantStyles[variant], className)}
        {...props}
      >
        {contained ? <div className="brutal-container">{children}</div> : children}
      </section>
    );
  }
);

Section.displayName = 'Section';

const SectionHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mb-12 md:mb-16 lg:mb-20 space-y-4 text-center', className)}
      {...props}
    >
      {children}
    </div>
  )
);
SectionHeader.displayName = 'SectionHeader';

const SectionTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn(
        'font-heading font-black text-responsive-h1 text-sentence-case',
        className
      )}
      {...props}
    />
  )
);
SectionTitle.displayName = 'SectionTitle';

const SectionDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'text-body-lg md:text-body-xl max-w-3xl mx-auto',
      'text-brutalist-text-light/80',
      className
    )}
    {...props}
  />
));
SectionDescription.displayName = 'SectionDescription';

export { Section, SectionHeader, SectionTitle, SectionDescription };
