# [BL-003] Redesign Singola Pagina Articolo

## Metadata
- **Story ID**: BL-003 | **Epic**: [EPIC-006](./../epic.md)
- **Priorità**: 🔴 Critica | **Dimensione**: 🔴 L (3-5 giorni)
- **Execution Environment**: 🌐 **Claude Code Web**
- **Stato**: 📋 Todo | **Data**: 2025-11-13

## User Story
**Come** lettore **Voglio** un'esperienza di lettura ottimale **Così che** possa comprendere e godere gli articoli

## Criteri di Accettazione
- [ ] **AC1**: Design basato su prototipo Figma con elementi grafici
- [ ] **AC2**: Typography ottimizzata per leggibilità (line-height, font size)
- [ ] **AC3**: Table of Contents (TOC) per articoli lunghi
- [ ] **AC4**: Syntax highlighting per code blocks
- [ ] **AC5**: Componenti MDX interattivi (callout, quote, image gallery)
- [ ] **AC6**: Reading progress indicator
- [ ] **AC7**: Share buttons (Twitter, LinkedIn, Copy link)
- [ ] **AC8**: "Articoli correlati" section
- [ ] **AC9**: CTA conversion (chatbot, booking)

## Layout Structure
```tsx
// app/[locale]/blog/[slug]/page.tsx
export default function ArticlePage({ params }) {
  const post = getPostBySlug(params.slug);

  return (
    <>
      <ReadingProgressBar />

      <article className="container max-w-3xl py-brutal-xl">
        {/* Hero */}
        <header className="mb-brutal-lg">
          <div className="flex gap-2 mb-brutal-sm">
            {post.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
          </div>

          <h1 className="text-5xl font-bold mb-brutal-sm">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-slate-blue">
            <time>{formatDate(post.publishedAt)}</time>
            <span>•</span>
            <span>{post.readingTime} min lettura</span>
          </div>

          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-96 object-cover rounded-brutal border-brutal mt-brutal-md"
          />
        </header>

        {/* Table of Contents (sticky) */}
        {post.headings.length > 3 && (
          <aside className="md:fixed md:left-8 md:top-32">
            <TableOfContents headings={post.headings} />
          </aside>
        )}

        {/* Content */}
        <div className="prose prose-lg prose-brutal">
          <MDXContent source={post.content} />
        </div>

        {/* Share */}
        <ShareButtons url={post.url} title={post.title} />

        {/* CTA */}
        <ConversionCTA />
      </article>

      {/* Related Articles */}
      <section className="bg-slate-50 py-brutal-xl">
        <div className="container">
          <h2 className="text-3xl font-bold mb-brutal-md">
            Articoli correlati
          </h2>
          <div className="grid md:grid-cols-3 gap-brutal-md">
            {relatedPosts.map(post => <BlogCard key={post.slug} {...post} />)}
          </div>
        </div>
      </section>
    </>
  );
}
```

## Componenti Grafici per Leggibilità

### 1. Callout Component
```tsx
// components/mdx/Callout.tsx
export function Callout({ type = 'info', children }) {
  const styles = {
    info: 'border-electric-blue bg-blue-50',
    warning: 'border-yellow-500 bg-yellow-50',
    tip: 'border-teal bg-teal-50',
  };

  return (
    <div className={cn("border-brutal-thick rounded-brutal p-brutal-md", styles[type])}>
      {children}
    </div>
  );
}
```

### 2. Pull Quote
```tsx
export function PullQuote({ children, author }) {
  return (
    <blockquote className="border-l-brutal-thick border-deep-navy pl-brutal-md my-brutal-lg italic text-2xl">
      {children}
      {author && <cite className="block mt-brutal-sm text-lg">— {author}</cite>}
    </blockquote>
  );
}
```

### 3. Image Gallery
```tsx
export function ImageGallery({ images }) {
  return (
    <div className="grid grid-cols-2 gap-brutal-sm">
      {images.map(img => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          className="rounded-brutal border-brutal"
        />
      ))}
    </div>
  );
}
```

### 4. Reading Progress Bar
```tsx
function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      setProgress((scrolled / total) * 100);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 z-50">
      <div
        className="h-full bg-electric-blue transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
```

## Typography Configuration
```css
/* app/globals.css */
.prose-brutal {
  /* Headings */
  h2: font-size: 2rem; margin-top: 3rem; margin-bottom: 1.5rem;
  h3: font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;

  /* Paragraphs */
  p: font-size: 1.125rem; line-height: 1.8; margin-bottom: 1.5rem;

  /* Lists */
  ul, ol: margin-left: 2rem; margin-bottom: 1.5rem;

  /* Code */
  code: background: #f5f5f5; padding: 0.25rem 0.5rem; border-radius: 4px;
  pre: border: 4px solid black; border-radius: 6px; padding: 1.5rem;

  /* Links */
  a: color: #1E90FF; text-decoration: underline;
}
```

## SEO per Articolo
```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  return {
    title: `${post.title} | Mattia Filippo De Luca`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: ['Mattia Filippo De Luca'],
    },
  };
}
```

## Test Plan
- [ ] Typography leggibile su tutti i device
- [ ] TOC funziona e sticky
- [ ] Code syntax highlighting funziona
- [ ] Componenti MDX renderizzano correttamente
- [ ] Reading progress accurate
- [ ] Share buttons funzionano
- [ ] Related articles relevanti
- [ ] SEO meta tags completi

## Definition of Done
- [ ] Layout articolo implementato
- [ ] Typography ottimizzata
- [ ] TOC sticky funzionante
- [ ] Code highlighting configurato
- [ ] Componenti MDX creati (Callout, Quote, Gallery)
- [ ] Reading progress bar
- [ ] Share buttons
- [ ] Related articles
- [ ] CTA conversion
- [ ] SEO completo
- [ ] Mobile responsive
- [ ] Performance ottimizzata

## Dipendenze
- [ ] BL-001 (BlogCard per related)
- [ ] EPIC-003 (CTA optimization con agenti)
