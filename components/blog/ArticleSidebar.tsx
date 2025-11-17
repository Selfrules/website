'use client';

import TableOfContents, { TableOfContentItem } from './TableOfContents';
import SocialShareButtons from './SocialShareButtons';

interface ArticleSidebarProps {
  tableOfContents: TableOfContentItem[];
  activeSection: string;
  onSectionClick: (id: string) => void;
  shareUrl: string;
  shareTitle: string;
}

/**
 * ArticleSidebar - Sticky sidebar with ToC and share buttons
 * @component
 * @category Blog Components
 */
export default function ArticleSidebar({
  tableOfContents,
  activeSection,
  onSectionClick,
  shareUrl,
  shareTitle,
}: ArticleSidebarProps) {

  return (
    <aside className="hidden lg:block lg:col-span-3">
      <div className="sticky top-28 space-y-6">
        {/* Table of Contents */}
        {tableOfContents.length > 0 && (
          <TableOfContents
            items={tableOfContents}
            activeSection={activeSection}
            onSectionClick={onSectionClick}
            variant="sidebar"
          />
        )}

        {/* Share Buttons */}
        <SocialShareButtons
          url={shareUrl}
          title={shareTitle}
          variant="sidebar"
          platforms={['twitter', 'linkedin', 'copy']}
        />
      </div>
    </aside>
  );
}
