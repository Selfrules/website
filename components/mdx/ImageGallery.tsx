/**
 * ImageGallery component for displaying multiple images in a grid in MDX articles
 * @component
 * @category MDX Components
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export default function ImageGallery({
  images,
  columns = 2,
  className,
}: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <>
      <div
        className={cn(
          'grid gap-brutal-sm my-brutal-lg',
          gridCols[columns],
          className
        )}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            whileHover={{ x: -4, y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="group cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <div className="relative aspect-video rounded-brutal border-brutal shadow-brutal hover:shadow-brutal-hover overflow-hidden bg-white">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            {image.caption && (
              <p className="mt-2 text-body-small text-brutalist-text-tertiary text-center">
                {image.caption}
              </p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-white rounded-brutal border-brutal shadow-brutal hover:shadow-brutal-hover transition-all"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6 text-brutalist-text-primary" />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video rounded-brutal border-brutal-thick shadow-brutal-lg overflow-hidden bg-white">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>
              {selectedImage.caption && (
                <p className="mt-4 text-center text-white text-body">
                  {selectedImage.caption}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
