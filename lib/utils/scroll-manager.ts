/**
 * Unified Scroll Manager
 *
 * Single rAF-throttled scroll handler for all page scroll subscriptions.
 * Prevents concurrent scroll listeners and batches updates to eliminate
 * flickering and layout thrashing.
 *
 * @module scroll-manager
 * @category Performance
 */

export interface ScrollData {
  scrollY: number;
  scrollPercentage: number;
  documentHeight: number;
  viewportHeight: number;
}

type ScrollCallback = (data: ScrollData) => void;

class ScrollManagerClass {
  private subscribers = new Set<ScrollCallback>();
  private ticking = false;
  private rafId: number | null = null;

  /**
   * Subscribe to scroll events
   * @param callback - Function to call with scroll data
   * @returns Unsubscribe function
   */
  subscribe(callback: ScrollCallback): () => void {
    this.subscribers.add(callback);

    // If first subscriber, start listening
    if (this.subscribers.size === 1) {
      window.addEventListener('scroll', this.handleScroll, { passive: true });
    }

    // Return unsubscribe function
    return () => {
      this.subscribers.delete(callback);

      // If no more subscribers, stop listening
      if (this.subscribers.size === 0) {
        window.removeEventListener('scroll', this.handleScroll);
        if (this.rafId !== null) {
          cancelAnimationFrame(this.rafId);
          this.rafId = null;
        }
      }
    };
  }

  private handleScroll = () => {
    if (!this.ticking) {
      this.rafId = requestAnimationFrame(() => {
        const scrollData = this.calculateScrollData();

        // Batch notify all subscribers in single frame
        this.subscribers.forEach(callback => {
          try {
            callback(scrollData);
          } catch (error) {
            console.error('ScrollManager callback error:', error);
          }
        });

        this.ticking = false;
        this.rafId = null;
      });
      this.ticking = true;
    }
  };

  private calculateScrollData(): ScrollData {
    const scrollY = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const scrollableHeight = documentHeight - viewportHeight;
    const scrollPercentage = scrollableHeight > 0
      ? Math.min((scrollY / scrollableHeight) * 100, 100)
      : 0;

    return {
      scrollY,
      scrollPercentage,
      documentHeight,
      viewportHeight,
    };
  }
}

// Singleton instance
export const ScrollManager = new ScrollManagerClass();
