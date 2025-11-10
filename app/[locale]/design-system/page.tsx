'use client';

import { InsightCard, FrameworkBox, MetricsGrid, HighlightBox } from '@/components/blog/article';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import ColorPalette from '@/components/design-system/ColorPalette';
import Typography from '@/components/design-system/Typography';
import BrutalShadows from '@/components/design-system/BrutalShadows';

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-[#FFFCF2]">
      <div className="container max-w-[1200px] mx-auto px-6 md:px-8 py-12 md:py-16">
        <header className="mb-16">
          <h1 className="text-hero text-[#0A0A0A] mb-4">Design System</h1>
          <p className="text-body-large text-[#2D2D2D] max-w-[700px]">
            Sistema di design neobrutalist con palette cold-tone professionale. WCAG AA compliant.
          </p>
        </header>

        <ColorPalette />

        <Typography />

        <BrutalShadows />

        <section className="mb-16">
          <h2 className="text-h2 text-[#0A0A0A] mb-6">Badges (Categorizzazione Progetti)</h2>
          <div className="space-y-4">
            <div>
              <p className="text-body-small text-[#6B7280] mb-3">Categorie standard:</p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="design">Design/UX</Badge>
                <Badge variant="dev">Development</Badge>
                <Badge variant="pm">Product/Strategy</Badge>
                <Badge variant="tool">Analytics/Tools</Badge>
              </div>
            </div>
            <div>
              <p className="text-body-small text-[#6B7280] mb-3">Badge speciale (solo per elementi in evidenza):</p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="featured">⭐ FEATURED</Badge>
              </div>
            </div>
          </div>
          <div className="mt-6 bg-[#FFF5E1] border-2 border-[#FFD60A] rounded-lg p-4">
            <p className="text-body-small text-[#2D2D2D]">
              <strong>Nota:</strong> Il badge giallo (featured) è riservato esclusivamente per elementi speciali in evidenza.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-h2 text-[#0A0A0A] mb-6">Card Headers</h2>
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
        </section>

        <section className="mb-16">
          <h2 className="text-h2 text-[#0A0A0A] mb-6">Componenti Articoli</h2>

          <h3 className="text-h3 mb-4">Insight Card</h3>
          <InsightCard variant="yellow">
            💡 Insight chiave: Il 70% delle feature richieste dagli stakeholder non risolvevano problemi reali degli utenti.
          </InsightCard>

          <h3 className="text-h3 mb-4 mt-8">Framework Box</h3>
          <FrameworkBox
            title="Framework di prioritizzazione"
            items={[
              { title: 'Impatto Utente', description: 'Quanti utenti beneficiano?' },
              { title: 'Sforzo Tecnico', description: 'Complessità e tempo richiesto' },
              { title: 'Allineamento', description: 'Coerenza con vision aziendale' },
            ]}
          />

          <h3 className="text-h3 mb-4 mt-8">Metrics Grid</h3>
          <MetricsGrid
            metrics={[
              { value: '+42%', label: 'User engagement sulle nuove feature', color: 'blue' },
              { value: '-60%', label: 'Feature ignorate dagli utenti', color: 'pink' },
              { value: '+35%', label: 'Velocità di delivery del team', color: 'purple' },
              { value: '4.8/5', label: 'Soddisfazione stakeholder', color: 'yellow' },
            ]}
          />

          <h3 className="text-h3 mb-4 mt-8">Highlight Box</h3>
          <HighlightBox
            title="1. La trasparenza vince sempre"
            description="Rendere visibile il processo decisionale elimina il 90% delle dispute sulla roadmap."
            color="blue"
          />
          <HighlightBox
            title="2. Focus sul problema, non sulla soluzione"
            description="Iniziare sempre dalla validazione del problema prima di investire nella soluzione."
            color="pink"
          />
        </section>

        <section className="mb-16">
          <h2 className="text-h2 text-[#0A0A0A] mb-6">Regole Colore Testo</h2>
          <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-8">
            <div className="mb-6 bg-[#FFF5E1] border-2 border-[#FFD60A] rounded-lg p-4">
              <p className="text-body text-[#0A0A0A] mb-3">
                <strong>🎯 REGOLA FONDAMENTALE DEL DESIGN SYSTEM:</strong>
              </p>
              <p className="text-body-small text-[#0A0A0A] mb-2">
                Tutte le classi di tipografia applicano automaticamente il colore nero (#0A0A0A) come default.
                Questo include:
              </p>
              <ul className="list-disc list-inside text-body-small text-[#0A0A0A] space-y-1 mb-4">
                <li>Classi text-*: text-hero, text-h1, text-h2, text-h3, text-body, text-body-small, text-body-large</li>
                <li>Classi font-*: font-heading, font-bold</li>
                <li>Utilità Tailwind: text-sentence-case</li>
              </ul>
              <p className="text-body-small text-[#0A0A0A] mb-3">
                <strong>🧠 REGOLA INTELLIGENTE - Contrasto Colori (WCAG AA):</strong>
              </p>
              <div className="bg-white border-2 border-[#000] rounded p-3 mb-3">
                <p className="text-body-small text-[#0A0A0A] mb-2">
                  <strong>Sfondi SCURI</strong> (Electric Blue #0D7EFF, Teal #2A687A, Deep Purple #7209B7, Neon Pink #FF006E, Black #000) → <span className="bg-[#0D7EFF] text-white px-2 py-1 rounded">text-white</span>
                </p>
                <p className="text-body-small text-[#0A0A0A]">
                  <strong>Sfondi CHIARI</strong> (Cyber Yellow #FFD60A, White #FFF, Cream #FFFCF2) → <span className="bg-[#FFD60A] text-[#0A0A0A] px-2 py-1 rounded border border-black">text-[#0A0A0A]</span>
                </p>
              </div>
              <p className="text-body-small text-[#0A0A0A] mb-2">
                <strong>❌ MAI:</strong> Usare testo bianco su sfondi chiari o testo nero su sfondi scuri
              </p>
              <p className="text-body-small text-[#0A0A0A]">
                <strong>✅ SEMPRE:</strong> Scegliere il colore del testo in base al contrasto con lo sfondo
              </p>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#FFFCF2] border-2 border-[#000] rounded p-4">
                  <p className="text-body-small text-[#0A0A0A] mb-2"><strong>✅ Sfondo chiaro (default):</strong></p>
                  <code className="text-xs text-[#0A0A0A] bg-gray-100 p-2 rounded block mb-2">
                    className=&quot;text-h3&quot;
                  </code>
                  <div className="bg-white border border-black rounded p-2">
                    <p className="text-h3">Testo nero automatico</p>
                  </div>
                </div>
                <div className="bg-[#FFFCF2] border-2 border-[#000] rounded p-4">
                  <p className="text-body-small text-[#0A0A0A] mb-2"><strong>✅ Sfondo scuro (blu):</strong></p>
                  <code className="text-xs text-[#0A0A0A] bg-gray-100 p-2 rounded block mb-2">
                    className=&quot;bg-[#0D7EFF] text-white&quot;
                  </code>
                  <div className="bg-[#0D7EFF] border border-black rounded p-2">
                    <p className="text-h3 text-white">Testo bianco per contrasto</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#FFE5E5] border-2 border-red-500 rounded p-4">
                  <p className="text-body-small text-[#0A0A0A] mb-2"><strong>❌ SBAGLIATO - Testo nero su sfondo scuro:</strong></p>
                  <code className="text-xs text-[#0A0A0A] bg-gray-100 p-2 rounded block mb-2">
                    className=&quot;bg-[#7209B7] text-[#0A0A0A]&quot;
                  </code>
                  <div className="bg-[#7209B7] border border-black rounded p-2">
                    <p className="text-body-small text-[#0A0A0A]">Illeggibile ❌</p>
                  </div>
                </div>
                <div className="bg-[#FFE5E5] border-2 border-red-500 rounded p-4">
                  <p className="text-body-small text-[#0A0A0A] mb-2"><strong>❌ SBAGLIATO - Testo bianco su sfondo chiaro:</strong></p>
                  <code className="text-xs text-[#0A0A0A] bg-gray-100 p-2 rounded block mb-2">
                    className=&quot;bg-[#FFD60A] text-white&quot;
                  </code>
                  <div className="bg-[#FFD60A] border border-black rounded p-2">
                    <p className="text-body-small text-white">Illeggibile ❌</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-white border-2 border-[#000] rounded-lg p-6">
              <h4 className="text-h3 text-[#0A0A0A] mb-4">📋 Tabella di Riferimento Rapido</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-[#000]">
                      <th className="text-left p-2 text-[#0A0A0A] font-bold">Colore Sfondo</th>
                      <th className="text-left p-2 text-[#0A0A0A] font-bold">Hex</th>
                      <th className="text-left p-2 text-[#0A0A0A] font-bold">Colore Testo</th>
                      <th className="text-left p-2 text-[#0A0A0A] font-bold">Esempio</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="p-2 text-[#0A0A0A]">Electric Blue</td>
                      <td className="p-2 text-[#0A0A0A] font-mono text-xs">#0D7EFF</td>
                      <td className="p-2 text-[#0A0A0A]">white</td>
                      <td className="p-2"><span className="bg-[#0D7EFF] text-white px-3 py-1 rounded border-2 border-black">Design/UX</span></td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-2 text-[#0A0A0A]">Teal</td>
                      <td className="p-2 text-[#0A0A0A] font-mono text-xs">#2A687A</td>
                      <td className="p-2 text-[#0A0A0A]">white</td>
                      <td className="p-2"><span className="bg-[#2A687A] text-white px-3 py-1 rounded border-2 border-black">Development</span></td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-2 text-[#0A0A0A]">Deep Purple</td>
                      <td className="p-2 text-[#0A0A0A] font-mono text-xs">#7209B7</td>
                      <td className="p-2 text-[#0A0A0A]">white</td>
                      <td className="p-2"><span className="bg-[#7209B7] text-white px-3 py-1 rounded border-2 border-black">PM/Strategy</span></td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-2 text-[#0A0A0A]">Neon Pink</td>
                      <td className="p-2 text-[#0A0A0A] font-mono text-xs">#FF006E</td>
                      <td className="p-2 text-[#0A0A0A]">white</td>
                      <td className="p-2"><span className="bg-[#FF006E] text-white px-3 py-1 rounded border-2 border-black">Analytics/Tools</span></td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-2 text-[#0A0A0A]">Cyber Yellow</td>
                      <td className="p-2 text-[#0A0A0A] font-mono text-xs">#FFD60A</td>
                      <td className="p-2 text-[#0A0A0A]">black (#0A0A0A)</td>
                      <td className="p-2"><span className="bg-[#FFD60A] text-[#0A0A0A] px-3 py-1 rounded border-2 border-black font-bold">⭐ FEATURED</span></td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-2 text-[#0A0A0A]">Black</td>
                      <td className="p-2 text-[#0A0A0A] font-mono text-xs">#000000</td>
                      <td className="p-2 text-[#0A0A0A]">white</td>
                      <td className="p-2"><span className="bg-[#000] text-white px-3 py-1 rounded border-2 border-black">Bordi</span></td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-2 text-[#0A0A0A]">White</td>
                      <td className="p-2 text-[#0A0A0A] font-mono text-xs">#FFFFFF</td>
                      <td className="p-2 text-[#0A0A0A]">black (#0A0A0A)</td>
                      <td className="p-2"><span className="bg-white text-[#0A0A0A] px-3 py-1 rounded border-2 border-black">Card Background</span></td>
                    </tr>
                    <tr>
                      <td className="p-2 text-[#0A0A0A]">Cream</td>
                      <td className="p-2 text-[#0A0A0A] font-mono text-xs">#FFFCF2</td>
                      <td className="p-2 text-[#0A0A0A]">black (#0A0A0A)</td>
                      <td className="p-2"><span className="bg-[#FFFCF2] text-[#0A0A0A] px-3 py-1 rounded border-2 border-black">Page Background</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-h2 text-[#0A0A0A] mb-6">Pattern di Background</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-6">
              <p className="text-body-small text-[#0A0A0A] mb-3"><strong>Grid Pattern</strong></p>
              <div className="h-40 border-2 border-[#000] rounded relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                  }}
                />
              </div>
              <code className="text-xs text-[#0A0A0A] bg-gray-100 p-2 rounded block mt-3">
                backgroundImage: linear-gradient(...)<br/>
                backgroundSize: 40px 40px
              </code>
            </div>

            <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-6">
              <p className="text-body-small text-[#0A0A0A] mb-3"><strong>Radial Dots Pattern</strong></p>
              <div className="h-40 border-2 border-[#000] rounded relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                  }}
                />
              </div>
              <code className="text-xs text-[#0A0A0A] bg-gray-100 p-2 rounded block mt-3">
                backgroundImage: radial-gradient(circle, #000 1px, transparent 1px)<br/>
                backgroundSize: 30px 30px
              </code>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-h2 text-[#0A0A0A] mb-6">Elementi Decorativi (Forme Geometriche)</h2>
          <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-8">
            <div className="h-60 border-2 border-[#000] rounded relative overflow-hidden bg-[#FFFCF2]">
              {/* Cerchio blu */}
              <div className="absolute top-10 right-10 w-20 h-20 bg-[#0D7EFF] border-4 border-[#000] rounded-full opacity-80" />
              {/* Quadrato rosa rotato */}
              <div className="absolute top-10 left-10 w-16 h-16 bg-[#FF006E] border-4 border-[#000] rotate-45 opacity-80" />
              {/* Quadrato giallo */}
              <div className="absolute bottom-10 right-16 w-18 h-18 bg-[#FFD60A] border-4 border-[#000] opacity-80" />
              {/* Cerchio viola */}
              <div className="absolute bottom-10 left-16 w-14 h-14 bg-[#7209B7] border-4 border-[#000] rounded-full opacity-70" />
            </div>
            <p className="text-body-small text-[#6B7280] mt-4">
              Forme geometriche con position absolute, border-4, opacity 70-80%, animate-float o animate-wiggle
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-h2 text-[#0A0A0A] mb-6">Tipografia con Sottolineatura Colorata</h2>
          <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-8 space-y-8">
            <div>
              <h3 className="text-h2 text-[#0A0A0A]">
                Testo con{' '}
                <span className="inline-block relative z-10">
                  sottolineatura gialla
                  <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#FFD60A] -rotate-1 z-[-1]" />
                </span>
              </h3>
              <code className="text-xs text-[#0A0A0A] bg-gray-100 p-2 rounded block mt-3">
                &lt;span className=&quot;inline-block relative z-10&quot;&gt;<br/>
                  {"  "}testo<br/>
                  {"  "}&lt;span className=&quot;absolute -bottom-2 left-0 w-full h-3 bg-[#FFD60A] -rotate-1 z-[-1]&quot; /&gt;<br/>
                &lt;/span&gt;
              </code>
            </div>

            <div>
              <h3 className="text-h2 text-[#0A0A0A]">
                Testo con{' '}
                <span className="inline-block relative z-10">
                  sottolineatura blu
                  <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#0D7EFF] rotate-1 z-[-1]" />
                </span>
              </h3>
            </div>

            <div>
              <h3 className="text-h2 text-[#0A0A0A]">
                Testo con{' '}
                <span className="inline-block relative z-10">
                  sottolineatura rosa
                  <span className="absolute -bottom-1 left-0 w-full h-2 bg-[#FF006E] -rotate-1 z-[-1]" />
                </span>
              </h3>
              <p className="text-body-small text-[#6B7280] mt-2">Altezza h-2 per sottolineature più sottili</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-h2 text-[#0A0A0A] mb-6">Pulsanti CTA</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-6">
              <p className="text-body-small text-[#0A0A0A] mb-4"><strong>Primary Button (sfondo chiaro)</strong></p>
              <button
                className="w-full px-6 py-3 bg-[#0D7EFF] text-white border-3 border-[#000] rounded shadow-brutal transition-all hover:-translate-y-1 hover:shadow-brutal-lg active:translate-y-0 active:shadow-brutal-sm"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '14px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                Primary Action
              </button>
              <code className="text-xs text-[#0A0A0A] bg-gray-100 p-2 rounded block mt-3">
                hover:-translate-y-1 hover:shadow-brutal-lg<br/>
                active:translate-y-0 active:shadow-brutal-sm
              </code>
            </div>

            <div className="bg-[#0A0A0A] border-4 border-[#000] rounded-lg shadow-brutal p-6">
              <p className="text-body-small text-white mb-4"><strong>Primary Button (sfondo scuro)</strong></p>
              <button
                className="w-full px-6 py-3 bg-[#0D7EFF] text-white border-3 border-[#000] rounded shadow-brutal transition-all hover:-translate-y-1 hover:shadow-brutal-lg active:translate-y-0 active:shadow-brutal-sm"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '14px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                Start Chat
              </button>
            </div>

            <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-6">
              <p className="text-body-small text-[#0A0A0A] mb-4"><strong>Outline Button</strong></p>
              <button
                className="w-full px-6 py-3 bg-white text-[#0A0A0A] border-3 border-[#000] rounded shadow-brutal transition-all hover:-translate-y-1 hover:shadow-brutal-lg active:translate-y-0 active:shadow-brutal-sm"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '14px',
                  fontWeight: 700,
                }}
              >
                Secondary Action
              </button>
            </div>

            <div className="bg-[#0A0A0A] border-4 border-[#000] rounded-lg shadow-brutal p-6">
              <p className="text-body-small text-white mb-4"><strong>Outline Button (sfondo scuro)</strong></p>
              <button
                className="w-full px-4 py-2 bg-transparent border-3 border-[#FFD60A] text-[#FFD60A] rounded shadow-brutal-sm transition-all hover:-translate-y-0.5"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                Badge Outline
              </button>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-h2 text-[#0A0A0A] mb-6">Form Elements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-6">
              <p className="text-body-small text-[#0A0A0A] mb-4"><strong>Input Field (sfondo chiaro)</strong></p>
              <input
                type="text"
                placeholder="Il tuo nome"
                className="w-full px-4 py-3 bg-white text-[#0A0A0A] border-3 border-[#000] rounded placeholder:text-[#6B7280] focus:border-[#0D7EFF] focus:outline-none transition-all"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '15px',
                }}
              />
            </div>

            <div className="bg-[#0A0A0A] border-4 border-[#000] rounded-lg shadow-brutal p-6">
              <p className="text-body-small text-white mb-4"><strong>Input Field (sfondo scuro)</strong></p>
              <input
                type="text"
                placeholder="Il tuo nome"
                className="w-full px-4 py-3 bg-[#0A0A0A] text-white border-3 border-[#2D2D2D] rounded placeholder:text-[#6B7280] focus:border-[#FF006E] focus:outline-none transition-all"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '15px',
                }}
              />
            </div>

            <div className="bg-[#0A0A0A] border-4 border-[#000] rounded-lg shadow-brutal p-6 md:col-span-2">
              <p className="text-body-small text-white mb-4"><strong>Text Area</strong></p>
              <textarea
                placeholder="La tua domanda *"
                rows={4}
                className="w-full px-4 py-3 bg-[#0A0A0A] text-white border-3 border-[#2D2D2D] rounded placeholder:text-[#6B7280] focus:border-[#FF006E] focus:outline-none transition-all resize-none"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '15px',
                }}
              />
              <button
                className="mt-3 w-full px-6 py-3 bg-[#FF006E] text-white border-3 border-[#000] rounded shadow-brutal transition-all hover:-translate-y-1 hover:shadow-brutal-lg"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '14px',
                  fontWeight: 700,
                }}
              >
                Invia Domanda
              </button>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-h2 text-[#0A0A0A] mb-6">Card con Icona (Work Together)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg">
              <div className="flex items-center justify-between mb-5">
                <div className="w-14 h-14 rounded-lg border-4 border-[#000] flex items-center justify-center bg-[#0D7EFF]">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M12 3v18m0-18a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9z"/>
                  </svg>
                </div>
                <span className="text-6xl opacity-10 text-[#0D7EFF]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900 }}>
                  01
                </span>
              </div>
              <h3 className="text-h3 text-[#0A0A0A] mb-3">Consulting</h3>
              <p className="text-body-small text-[#2D2D2D] mb-4">
                Aiuto aziende a definire la strategia di prodotto e validare le idee.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#0D7EFF]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"/>
                  </svg>
                  <span className="text-body-small text-[#2D2D2D]">Feature prioritaria</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg">
              <div className="flex items-center justify-between mb-5">
                <div className="w-14 h-14 rounded-lg border-4 border-[#000] flex items-center justify-center bg-[#FF006E]">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 0 1 9.288 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm6 3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM7 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
                  </svg>
                </div>
                <span className="text-6xl opacity-10 text-[#FF006E]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900 }}>
                  02
                </span>
              </div>
              <h3 className="text-h3 text-[#0A0A0A] mb-3">Brainstorming</h3>
              <p className="text-body-small text-[#2D2D2D]">
                Sessioni collaborative per generare idee innovative.
              </p>
            </div>

            <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg">
              <div className="flex items-center justify-between mb-5">
                <div className="w-14 h-14 rounded-lg border-4 border-[#000] flex items-center justify-center bg-[#7209B7]">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 0 1.834 6.383L12 21.043l-6.16-3.422a12.083 12.083 0 0 1 .834-6.383L12 14z"/>
                  </svg>
                </div>
                <span className="text-6xl opacity-10 text-[#7209B7]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900 }}>
                  03
                </span>
              </div>
              <h3 className="text-h3 text-[#0A0A0A] mb-3">Mentorship</h3>
              <p className="text-body-small text-[#2D2D2D]">
                Accompagno PM junior nel loro percorso di crescita.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-h2 text-[#0A0A0A] mb-6">Card con Gradient Overlay</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1A1A1A] border-4 border-[#0D7EFF] rounded-lg shadow-brutal p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0D7EFF]/10 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-[#0D7EFF] rounded-lg flex items-center justify-center mb-5 border-3 border-[#000]">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-5l-5 5v-5z"/>
                  </svg>
                </div>
                <h3 className="text-white mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '20px' }}>
                  Chat AI
                </h3>
                <p className="text-white mb-6" style={{ opacity: 0.9, fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
                  Chatta con il mio gemello digitale alimentato da Claude AI.
                </p>
                <button className="w-full px-6 py-3 bg-[#0D7EFF] text-white border-3 border-[#000] rounded shadow-brutal">
                  Inizia Chat
                </button>
              </div>
            </div>

            <div className="bg-[#1A1A1A] border-4 border-[#FF006E] rounded-lg shadow-brutal p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF006E]/10 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-[#FF006E] rounded-lg flex items-center justify-center mb-5 border-3 border-[#000]">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"/>
                  </svg>
                </div>
                <h3 className="text-white mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '20px' }}>
                  Form Anonimo
                </h3>
                <p className="text-white" style={{ opacity: 0.9, fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
                  Lascia una domanda anonima, rispondo sul blog.
                </p>
              </div>
            </div>
          </div>
          <p className="text-body-small text-[#6B7280] mt-4">
            ⚠️ Usare style inline per text-white quando ci sono conflitti con le classi tipografiche
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-h2 text-[#0A0A0A] mb-6">Card Articolo Blog</h2>

          <h3 className="text-h3 text-[#0A0A0A] mb-4">Featured Article Card</h3>
          <div className="mb-8 bg-gradient-to-br from-[#0D7EFF] via-[#7209B7] to-[#FF006E] border-4 border-[#000] rounded-lg shadow-brutal p-8 min-h-[300px] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="featured">⭐ FEATURED</Badge>
                <span className="px-3 py-1 border-2 border-[#000] rounded-lg bg-[#FFD60A] text-[#0A0A0A] inline-block text-xs font-bold">
                  Design
                </span>
              </div>
              <h3 className="text-h2 text-white mb-4">
                Come ho scalato il design system di Spotify
              </h3>
              <p className="text-body-small text-white/95 mb-6">
                La storia di come abbiamo trasformato 500+ componenti disallineati in un sistema coerente usato da 40+ team.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-3 text-white/90 text-sm">
                <span>15 Gen 2024</span>
                <span>•</span>
                <span>8 min lettura</span>
              </div>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFD60A] text-[#0A0A0A] border-3 border-[#000] rounded-lg shadow-brutal-sm font-bold">
                Leggi ora →
              </div>
            </div>
          </div>

          <h3 className="text-h3 text-[#0A0A0A] mb-4">Standard Article Card</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-6 min-h-[280px] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg cursor-pointer">
              <div>
                <Badge variant="design">Design/UX</Badge>
                <h3 className="text-h3 text-[#0A0A0A] mt-3 mb-2">
                  Design System Best Practices
                </h3>
                <p className="text-body-small text-[#2D2D2D] mb-4 line-clamp-2">
                  Le lezioni che ho imparato costruendo design system per startup e enterprise.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-3 text-[#6B7280] text-xs mb-3">
                  <span>10 Gen 2024</span>
                  <span>•</span>
                  <span>5 min</span>
                </div>
                <div className="inline-flex items-center gap-2 text-[#0D7EFF] font-semibold text-sm">
                  Leggi articolo →
                </div>
              </div>
            </div>

            <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-6 min-h-[280px] flex flex-col justify-between">
              <div>
                <Badge variant="pm">Product/Strategy</Badge>
                <h3 className="text-h3 text-[#0A0A0A] mt-3 mb-2">
                  OKR Framework Applicato
                </h3>
                <p className="text-body-small text-[#2D2D2D] mb-4 line-clamp-2">
                  Come allineare team e stakeholder con obiettivi misurabili.
                </p>
              </div>
            </div>

            <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-6 min-h-[280px] flex flex-col justify-between">
              <div>
                <Badge variant="dev">Development</Badge>
                <h3 className="text-h3 text-[#0A0A0A] mt-3 mb-2">
                  Next.js 14 Migration Guide
                </h3>
                <p className="text-body-small text-[#2D2D2D] mb-4 line-clamp-2">
                  Tutto quello che serve sapere per migrare da Pages a App Router.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-h2 text-[#0A0A0A] mb-6">Table of Contents & Social Share</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-6">
              <h3 className="text-h3 text-[#0A0A0A] mb-4 pb-3 border-b-4 border-[#000]">
                Indice
              </h3>
              <nav className="space-y-2">
                <button className="block w-full text-left px-3 py-2 rounded bg-[#0D7EFF] text-white font-semibold">
                  Introduzione
                </button>
                <button className="block w-full text-left px-3 py-2 rounded text-[#2D2D2D] hover:bg-gray-100">
                  Il problema
                </button>
                <button className="block w-full text-left px-3 py-2 rounded text-[#2D2D2D] hover:bg-gray-100">
                  La soluzione
                </button>
                <button className="block w-full text-left px-3 py-2 rounded text-[#2D2D2D] hover:bg-gray-100">
                  Risultati
                </button>
                <button className="block w-full text-left px-3 py-2 rounded text-[#2D2D2D] hover:bg-gray-100">
                  Conclusioni
                </button>
              </nav>
            </div>

            <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-6">
              <h4 className="text-h3 text-[#0A0A0A] mb-4 pb-3 border-b-4 border-[#000]">
                Condividi
              </h4>
              <div className="space-y-2">
                <button className="flex items-center gap-3 w-full px-4 py-2 bg-[#1DA1F2] text-white border-2 border-[#000] rounded hover:opacity-90 transition-opacity">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  <span className="text-sm font-medium">Twitter</span>
                </button>
                <button className="flex items-center gap-3 w-full px-4 py-2 bg-[#0A66C2] text-white border-2 border-[#000] rounded hover:opacity-90 transition-opacity">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="text-sm font-medium">LinkedIn</span>
                </button>
                <button className="flex items-center gap-3 w-full px-4 py-2 bg-white border-2 border-[#000] rounded hover:bg-gray-50 transition-colors">
                  <svg className="w-4 h-4 text-[#0A0A0A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
                  </svg>
                  <span className="text-sm font-medium text-[#0A0A0A]">Copia link</span>
                </button>
              </div>
              <code className="text-xs text-[#0A0A0A] bg-gray-100 p-2 rounded block mt-4">
                Twitter: bg-[#1DA1F2] text-white border-2 border-[#000]<br/>
                LinkedIn: bg-[#0A66C2] text-white border-2 border-[#000]<br/>
                Copy Link: bg-white text-[#0A0A0A] border-2 border-[#000]<br/>
                Hover: opacity-90 (per Twitter/LinkedIn), bg-gray-50 (Copy Link)
              </code>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-h2 text-[#0A0A0A] mb-6">Language Switcher</h2>
          <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-8">
            <p className="text-body-small text-[#6B7280] mb-4">Switch tra Italiano e Inglese (stile Header)</p>
            <div className="flex items-center gap-2 bg-white border-[3px] border-[#000] rounded-lg shadow-brutal-sm overflow-hidden w-fit">
              <button
                className="px-3 py-1.5 bg-[#FF006E] text-white transition-all"
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontWeight: 700,
                  fontSize: '12px',
                }}
              >
                IT
              </button>
              <div className="w-px h-6 bg-[#000]" />
              <button
                className="px-3 py-1.5 bg-transparent text-[#2D2D2D] hover:bg-[#FFFCF2] transition-all"
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontWeight: 700,
                  fontSize: '12px',
                }}
              >
                EN
              </button>
            </div>
            <code className="text-xs text-[#0A0A0A] bg-gray-100 p-2 rounded block mt-4">
              Container: bg-white border-[3px] border-[#000] rounded-lg shadow-brutal-sm overflow-hidden<br/>
              Active: bg-[#FF006E] text-white<br/>
              Inactive: bg-transparent text-[#2D2D2D] hover:bg-[#FFFCF2]<br/>
              Divider: w-px h-6 bg-[#000]<br/>
              Font: Space Mono, 700, 12px
            </code>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-h2 text-[#0A0A0A] mb-6">Menu Hover Animations</h2>
          <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-8">
            <p className="text-body-small text-[#6B7280] mb-4">Animazione underline progressiva per i link del menu di navigazione</p>
            <nav className="flex gap-8">
              <a
                href="#"
                className="px-4 py-2 text-[#2D2D2D] hover:text-[#0D7EFF] transition-colors relative group"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 600,
                  fontSize: '15px',
                }}
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0D7EFF] group-hover:w-full transition-all duration-300" />
              </a>
              <a
                href="#"
                className="px-4 py-2 text-[#2D2D2D] hover:text-[#0D7EFF] transition-colors relative group"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 600,
                  fontSize: '15px',
                }}
              >
                Blog
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0D7EFF] group-hover:w-full transition-all duration-300" />
              </a>
              <a
                href="#"
                className="px-4 py-2 text-[#2D2D2D] hover:text-[#0D7EFF] transition-colors relative group"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 600,
                  fontSize: '15px',
                }}
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0D7EFF] group-hover:w-full transition-all duration-300" />
              </a>
            </nav>
            <code className="text-xs text-[#0A0A0A] bg-gray-100 p-2 rounded block mt-6">
              Link: text-[#2D2D2D] hover:text-[#0D7EFF] transition-colors relative group<br/>
              Underline: absolute bottom-0 left-0 w-0 h-0.5 bg-[#0D7EFF] group-hover:w-full transition-all duration-300
            </code>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-h2 text-[#0A0A0A] mb-6">Footer Link Animations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0A0A0A] border-4 border-[#000] rounded-lg shadow-brutal p-8">
              <p className="text-body-small text-white mb-4"><strong>Internal Links</strong></p>
              <p className="text-body-small text-white/80 mb-6">Arrow e testo diventano #0D7EFF al hover</p>
              <style jsx>{`
                .internal-link {
                  color: rgba(255, 255, 255, 0.8);
                  transition: color 0.3s;
                }
                .internal-link:hover {
                  color: #0D7EFF !important;
                }
              `}</style>
              <nav className="space-y-3">
                <a
                  href="#"
                  className="internal-link text-sm inline-flex items-center gap-2 group"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 text-[#0D7EFF] transition-opacity" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7"/>
                  </svg>
                  About
                </a>
                <br/>
                <a
                  href="#"
                  className="internal-link text-sm inline-flex items-center gap-2 group"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 text-[#0D7EFF] transition-opacity" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7"/>
                  </svg>
                  Blog
                </a>
                <br/>
                <a
                  href="#"
                  className="internal-link text-sm inline-flex items-center gap-2 group"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 text-[#0D7EFF] transition-opacity" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7"/>
                  </svg>
                  Contact
                </a>
              </nav>
              <code className="text-xs text-white bg-[#1A1A1A] p-2 rounded block mt-4">
                Default: color: rgba(255, 255, 255, 0.8)<br/>
                Hover: color: #0D7EFF !important<br/>
                Icon: text-[#0D7EFF] opacity-0 group-hover:opacity-100
              </code>
            </div>

            <div className="bg-[#0A0A0A] border-4 border-[#000] rounded-lg shadow-brutal p-8">
              <p className="text-body-small text-white mb-4"><strong>External Links</strong></p>
              <p className="text-body-small text-white/80 mb-6">ExternalLink icon e testo diventano #FF006E al hover</p>
              <style jsx>{`
                .external-link {
                  color: rgba(255, 255, 255, 0.8);
                  transition: color 0.3s;
                }
                .external-link:hover {
                  color: #FF006E !important;
                }
              `}</style>
              <nav className="space-y-3">
                <a
                  href="#"
                  className="external-link text-sm inline-flex items-center gap-2 group"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  LinkedIn
                  <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 text-[#FF006E] transition-opacity" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <path d="M15 3h6v6"/>
                    <path d="M10 14L21 3"/>
                  </svg>
                </a>
                <br/>
                <a
                  href="#"
                  className="external-link text-sm inline-flex items-center gap-2 group"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  GitHub
                  <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 text-[#FF006E] transition-opacity" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <path d="M15 3h6v6"/>
                    <path d="M10 14L21 3"/>
                  </svg>
                </a>
                <br/>
                <a
                  href="#"
                  className="external-link text-sm inline-flex items-center gap-2 group"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  Portfolio
                  <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 text-[#FF006E] transition-opacity" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <path d="M15 3h6v6"/>
                    <path d="M10 14L21 3"/>
                  </svg>
                </a>
              </nav>
              <code className="text-xs text-white bg-[#1A1A1A] p-2 rounded block mt-4">
                Default: color: rgba(255, 255, 255, 0.8)<br/>
                Hover: color: #FF006E !important<br/>
                Icon: text-[#FF006E] opacity-0 group-hover:opacity-100
              </code>
            </div>
          </div>
          <p className="text-body-small text-[#6B7280] mt-4">
            <strong>Regola:</strong> Link interni usano ArrowRight (#0D7EFF), link esterni usano ExternalLink (#FF006E). Icona e testo stesso colore al hover. Usare !important per forzare il colore.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-h2 text-[#0A0A0A] mb-6">Accessibilità (WCAG AA)</h2>
          <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-8">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-[#0D7EFF] mt-1">✓</span>
                <div>
                  <p className="font-bold">Contrasto Colori</p>
                  <p className="text-sm text-[#6B7280]">Tutti i colori ≥4.5:1 contrast ratio</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#0D7EFF] mt-1">✓</span>
                <div>
                  <p className="font-bold">Touch Targets</p>
                  <p className="text-sm text-[#6B7280]">Minimo 48×48px su mobile</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#0D7EFF] mt-1">✓</span>
                <div>
                  <p className="font-bold">Focus Indicators</p>
                  <p className="text-sm text-[#6B7280]">4px solid Electric Blue outline</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#0D7EFF] mt-1">✓</span>
                <div>
                  <p className="font-bold">Reduced Motion</p>
                  <p className="text-sm text-[#6B7280]">Rispetta prefers-reduced-motion</p>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
