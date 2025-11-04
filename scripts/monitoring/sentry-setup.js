/**
 * Sentry Monitoring Setup
 * Initialize Sentry for error tracking and performance monitoring
 */

import * as Sentry from '@sentry/nextjs';

export function initSentry() {
  if (!process.env.SENTRY_DSN) {
    console.warn('⚠️  Sentry DSN not configured - error tracking disabled');
    return;
  }

  Sentry.init({
    dsn: process.env.SENTRY_DSN,

    // Environment configuration
    environment: process.env.NODE_ENV || 'development',
    enabled: process.env.NODE_ENV === 'production',

    // Performance monitoring
    tracesSampleRate: 0.1, // 10% of transactions

    // Session replay for debugging
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0, // 100% when errors occur

    // Integrations
    integrations: [
      new Sentry.BrowserTracing({
        tracingOrigins: ['localhost', /^\//],
      }),
      new Sentry.Replay({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],

    // Error filtering
    ignoreErrors: [
      // Browser extensions
      'top.GLOBALS',
      'chrome-extension',
      'moz-extension',
      // Network errors
      'Network request failed',
      'Failed to fetch',
      // User cancelled actions
      'AbortError',
    ],

    // Custom tags
    initialScope: {
      tags: {
        app_version: process.env.npm_package_version || '0.1.0',
      },
    },

    // Before send hook
    beforeSend(event, hint) {
      // Filter sensitive data
      if (event.request) {
        delete event.request.cookies;
        delete event.request.headers;
      }

      // Add custom context
      if (hint.originalException) {
        event.contexts = {
          ...event.contexts,
          custom: {
            errorType: hint.originalException.constructor.name,
          },
        };
      }

      return event;
    },
  });

  console.log('✅ Sentry monitoring initialized');
}

// Error boundary helper
export function logError(error, context = {}) {
  Sentry.captureException(error, {
    contexts: {
      custom: context,
    },
  });
}

// Performance monitoring helper
export function trackPerformance(transactionName, callback) {
  const transaction = Sentry.startTransaction({
    name: transactionName,
    op: 'function',
  });

  Sentry.getCurrentHub().configureScope(scope => scope.setSpan(transaction));

  try {
    const result = callback();
    transaction.setStatus('ok');
    return result;
  } catch (error) {
    transaction.setStatus('internal_error');
    throw error;
  } finally {
    transaction.finish();
  }
}
