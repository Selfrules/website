'use client';

import * as Tabs from '@radix-ui/react-tabs';
import ComponentPreview from '@/components/design-system/ComponentPreview';
import { Badge } from '@/components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export default function DesignSystemPage() {

  const categories = [
    { id: 'colors', label: 'Colors' },
    { id: 'typography', label: 'Typography' },
    { id: 'buttons', label: 'Buttons' },
    { id: 'cards', label: 'Cards' },
    { id: 'forms', label: 'Forms' },
    { id: 'badges', label: 'Badges' },
    { id: 'spacing', label: 'Spacing' },
  ];

  return (
    <div className="min-h-screen bg-[#FFFCF2]">
      <div className="container max-w-[1200px] mx-auto px-6 md:px-8 py-12 md:py-16">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-hero text-[#0A0A0A] mb-4">
            Design System
          </h1>
          <p className="text-body-large max-w-[700px] text-[#2D2D2D]">
            Sistema di design neobrutalist con palette cold-tone professionale. WCAG AA compliant.
          </p>
        </header>

        {/* Tabs Navigation */}
        <Tabs.Root defaultValue="colors" className="space-y-8">
          {/* Tab List */}
          <Tabs.List className="flex flex-wrap gap-2 border-b-4 border-[#000] pb-4">
            {categories.map((category) => (
              <Tabs.Trigger
                key={category.id}
                value={category.id}
                className="px-4 py-2 border-3 border-[#000] rounded-brutal shadow-brutal data-[state=active]:bg-[#0D7EFF] data-[state=active]:text-white bg-white text-[#0A0A0A] hover:-translate-y-0.5 transition-all"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 600,
                  fontSize: '14px',
                }}
              >
                {category.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {/* Colors Tab */}
          <Tabs.Content value="colors" className="space-y-8">
            <ComponentPreview
              title="Color Palette"
              description="Palette principale per badge e progetti"
              preview={
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {[
                    { name: 'Electric Blue', hex: '#0D7EFF', use: 'Design/UX' },
                    { name: 'Teal', hex: '#2A687A', use: 'Development' },
                    { name: 'Deep Purple', hex: '#7209B7', use: 'PM/Strategy' },
                    { name: 'Cyber Yellow', hex: '#FFD60A', use: 'Featured', textClass: 'text-[#0A0A0A]' },
                    { name: 'Neon Pink', hex: '#FF006E', use: 'Analytics/Tools' },
                  ].map((color) => (
                    <div key={color.hex} className="space-y-2">
                      <div
                        className={`h-24 rounded-brutal border-4 border-[#000] shadow-brutal flex items-center justify-center ${color.textClass || 'text-white'}`}
                        style={{ backgroundColor: color.hex }}
                      >
                        <span className="font-bold text-sm">{color.hex}</span>
                      </div>
                      <div className="text-[#0A0A0A]">
                        <p className="font-bold text-sm">{color.name}</p>
                        <p className="text-xs text-[#6B7280]">{color.use}</p>
                      </div>
                    </div>
                  ))}
                </div>
              }
              code={`const colors = {
  electricBlue: '#0D7EFF', // Design/UX
  teal: '#2A687A',         // Development
  deepPurple: '#7209B7',   // PM/Strategy
  cyberYellow: '#FFD60A',  // Featured (use black text)
  neonPink: '#FF006E',     // Analytics/Tools
};`}
              language="tsx"
            />
          </Tabs.Content>

          {/* Typography Tab */}
          <Tabs.Content value="typography" className="space-y-8">
            <ComponentPreview
              title="Typography Scale"
              description="Gerarchia tipografica del design system"
              preview={
                <div className="space-y-6">
                  <div className="text-[#0A0A0A]">
                    <p className="text-hero mb-2">Hero Title</p>
                    <code className="text-xs text-[#6B7280]">text-hero (56px)</code>
                  </div>
                  <div className="text-[#0A0A0A]">
                    <p className="text-h1 mb-2">Heading 1</p>
                    <code className="text-xs text-[#6B7280]">text-h1 (48px)</code>
                  </div>
                  <div className="text-[#0A0A0A]">
                    <p className="text-h2 mb-2">Heading 2</p>
                    <code className="text-xs text-[#6B7280]">text-h2 (36px)</code>
                  </div>
                  <div className="text-[#0A0A0A]">
                    <p className="text-h3 mb-2">Heading 3</p>
                    <code className="text-xs text-[#6B7280]">text-h3 (24px)</code>
                  </div>
                  <div className="text-[#0A0A0A]">
                    <p className="text-body mb-2">Body Text</p>
                    <code className="text-xs text-[#6B7280]">text-body (16px)</code>
                  </div>
                </div>
              }
              code={`<h1 className="text-hero">Hero Title</h1>
<h2 className="text-h1">Heading 1</h2>
<h3 className="text-h2">Heading 2</h3>
<h4 className="text-h3">Heading 3</h4>
<p className="text-body">Body Text</p>`}
            />
          </Tabs.Content>

          {/* Buttons Tab */}
          <Tabs.Content value="buttons" className="space-y-8">
            <ComponentPreview
              title="Primary Button"
              description="Bottone principale con effetto hover"
              preview={
                <button
                  className="px-6 py-3 bg-[#0D7EFF] text-white border-3 border-[#000] rounded shadow-brutal transition-all hover:-translate-y-1 hover:shadow-brutal-lg active:translate-y-0 active:shadow-brutal-sm"
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '14px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                >
                  Primary Action
                </button>
              }
              code={`<button className="px-6 py-3 bg-[#0D7EFF] text-white border-3 border-[#000] rounded shadow-brutal transition-all hover:-translate-y-1 hover:shadow-brutal-lg">
  Primary Action
</button>`}
            />

            <ComponentPreview
              title="Secondary Button"
              description="Bottone secondario outline"
              preview={
                <button
                  className="px-6 py-3 bg-white text-[#0A0A0A] border-3 border-[#000] rounded shadow-brutal transition-all hover:-translate-y-1 hover:shadow-brutal-lg"
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '14px',
                    fontWeight: 700,
                  }}
                >
                  Secondary Action
                </button>
              }
              code={`<button className="px-6 py-3 bg-white text-[#0A0A0A] border-3 border-[#000] rounded shadow-brutal transition-all hover:-translate-y-1 hover:shadow-brutal-lg">
  Secondary Action
</button>`}
            />
          </Tabs.Content>

          {/* Cards Tab */}
          <Tabs.Content value="cards" className="space-y-8">
            <ComponentPreview
              title="Basic Card"
              description="Card con header colorato e contenuto"
              preview={
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader variant="design">
                      <CardTitle>Design/UX Project</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-body-small text-[#2D2D2D]">
                        Progetti di design, Figma, sistemi di design, user experience.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader variant="dev">
                      <CardTitle>Development Project</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-body-small text-[#2D2D2D]">
                        Progetti di sviluppo, React, Next.js, migrazioni tecniche.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              }
              code={`<Card>
  <CardHeader variant="design">
    <CardTitle>Design/UX Project</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-body-small text-[#2D2D2D]">
      Progetti di design, Figma, sistemi di design.
    </p>
  </CardContent>
</Card>`}
            />
          </Tabs.Content>

          {/* Forms Tab */}
          <Tabs.Content value="forms" className="space-y-8">
            <ComponentPreview
              title="Input Field"
              description="Campo input con bordi brutalist"
              preview={
                <input
                  type="text"
                  placeholder="Il tuo nome"
                  className="w-full px-4 py-3 bg-white text-[#0A0A0A] border-3 border-[#000] rounded placeholder:text-[#6B7280] focus:border-[#0D7EFF] focus:outline-none transition-all"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                  }}
                />
              }
              code={`<input
  type="text"
  placeholder="Il tuo nome"
  className="w-full px-4 py-3 bg-white text-[#0A0A0A] border-3 border-[#000] rounded placeholder:text-[#6B7280] focus:border-[#0D7EFF] focus:outline-none transition-all"
/>`}
            />

            <ComponentPreview
              title="Text Area"
              description="Campo textarea per messaggi lunghi"
              preview={
                <textarea
                  placeholder="Il tuo messaggio"
                  rows={4}
                  className="w-full px-4 py-3 bg-white text-[#0A0A0A] border-3 border-[#000] rounded placeholder:text-[#6B7280] focus:border-[#FF006E] focus:outline-none transition-all resize-none"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                  }}
                />
              }
              code={`<textarea
  placeholder="Il tuo messaggio"
  rows={4}
  className="w-full px-4 py-3 bg-white text-[#0A0A0A] border-3 border-[#000] rounded placeholder:text-[#6B7280] focus:border-[#FF006E] focus:outline-none transition-all resize-none"
/>`}
            />
          </Tabs.Content>

          {/* Badges Tab */}
          <Tabs.Content value="badges" className="space-y-8">
            <ComponentPreview
              title="Badge Variants"
              description="Badge per categorizzazione progetti"
              preview={
                <div className="flex flex-wrap gap-3">
                  <Badge variant="design">Design/UX</Badge>
                  <Badge variant="dev">Development</Badge>
                  <Badge variant="pm">Product/Strategy</Badge>
                  <Badge variant="tool">Analytics/Tools</Badge>
                  <Badge variant="featured">⭐ FEATURED</Badge>
                </div>
              }
              code={`<Badge variant="design">Design/UX</Badge>
<Badge variant="dev">Development</Badge>
<Badge variant="pm">Product/Strategy</Badge>
<Badge variant="tool">Analytics/Tools</Badge>
<Badge variant="featured">⭐ FEATURED</Badge>`}
            />
          </Tabs.Content>

          {/* Spacing Tab */}
          <Tabs.Content value="spacing" className="space-y-8">
            <ComponentPreview
              title="8pt Grid System"
              description="Sistema di spaziatura basato su multipli di 8px"
              preview={
                <div className="space-y-4">
                  {[
                    { class: 'p-brutal-xs', px: '8px' },
                    { class: 'p-brutal-sm', px: '16px' },
                    { class: 'p-brutal-md', px: '24px' },
                    { class: 'p-brutal-lg', px: '32px' },
                    { class: 'p-brutal-xl', px: '48px' },
                  ].map((spacing) => (
                    <div key={spacing.class} className="flex items-center gap-4">
                      <code className="text-xs text-[#0A0A0A] w-32">
                        {spacing.class}
                      </code>
                      <div
                        className={`${spacing.class} bg-[#0D7EFF] border-2 border-[#000] rounded`}
                      >
                        <div className="bg-white text-[#0A0A0A] text-xs px-2 py-1 rounded">
                          {spacing.px}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              }
              code={`// 8pt Grid Spacing Scale
p-brutal-xs  // 8px
p-brutal-sm  // 16px
p-brutal-md  // 24px
p-brutal-lg  // 32px
p-brutal-xl  // 48px

// Usage
<div className="p-brutal-md">Content</div>`}
            />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}
