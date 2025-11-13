# [BL-001] Ricostruzione Design Sezione Blog Homepage

## Metadata
- **Story ID**: BL-001 | **Epic**: [EPIC-006](./../epic.md)
- **Priorità**: 🟠 Alta | **Dimensione**: 🟡 M (1-2 giorni)
- **Execution Environment**: 🌐 **Claude Code Web**
- **Stato**: 📋 Todo | **Data**: 2025-11-13

## User Story
**Come** visitatore **Voglio** una sezione blog accattivante nella homepage **Così che** sia invogliato a leggere articoli

## Criteri di Accettazione
- [ ] **AC1**: Design basato su prototipo Figma (`to_copy` folder)
- [ ] **AC2**: Mostra 3 articoli featured/recenti
- [ ] **AC3**: Card articoli con: immagine, titolo, excerpt, tag, data
- [ ] **AC4**: CTA "Vedi tutti gli articoli" → `/blog`
- [ ] **AC5**: Design system neobrutalist applicato
- [ ] **AC6**: Animazioni Framer Motion

## Implementazione

### 1. Analisi Prototipo
```bash
# Leggere codice in:
C:\Users\Utente\Desktop\selfrules\mattia_web\to_copy

# Estrarre:
- Layout structure
- Component styling
- Grid/spacing pattern
- Typography hierarchy
```

### 2. Componente Sezione Blog
```tsx
// components/sections/BlogSection.tsx
export function BlogSection() {
  const featuredPosts = getBlogPosts().slice(0, 3);

  return (
    <section className="blog-section py-brutal-xl bg-slate-50">
      <div className="container">
        <div className="mb-brutal-lg">
          <h2 className="text-4xl font-bold">Ultimi articoli</h2>
          <p className="text-slate-blue mt-brutal-sm">
            Riflessioni su prodotto, design e sviluppo
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-brutal-md">
          {featuredPosts.map(post => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>

        <div className="text-center mt-brutal-lg">
          <Button variant="secondary" href="/blog">
            Vedi tutti gli articoli →
          </Button>
        </div>
      </div>
    </section>
  );
}
```

### 3. Blog Card Component
```tsx
// components/BlogCard.tsx
interface BlogCardProps {
  title: string;
  excerpt: string;
  slug: string;
  coverImage: string;
  tags: string[];
  publishedAt: string;
}

export function BlogCard(props: BlogCardProps) {
  return (
    <motion.article
      whileHover={{ x: -4, y: -4 }}
      className="border-brutal shadow-brutal hover:shadow-brutal-hover rounded-brutal bg-white overflow-hidden"
    >
      <img
        src={props.coverImage}
        alt={props.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-brutal-md">
        <div className="flex gap-2 mb-brutal-sm">
          {props.tags.map(tag => (
            <Badge key={tag} variant="secondary" size="sm">
              {tag}
            </Badge>
          ))}
        </div>

        <h3 className="font-bold text-xl mb-brutal-sm">
          {props.title}
        </h3>

        <p className="text-slate-blue text-sm mb-brutal-sm">
          {props.excerpt}
        </p>

        <div className="flex justify-between items-center">
          <time className="text-xs text-slate-blue">
            {formatDate(props.publishedAt)}
          </time>
          <Link
            href={`/blog/${props.slug}`}
            className="text-electric-blue font-bold text-sm"
          >
            Leggi →
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
```

## Files da Modificare/Creare
- `/components/sections/BlogSection.tsx` (nuovo)
- `/components/BlogCard.tsx` (nuovo)
- `/app/[locale]/page.tsx` (aggiungere BlogSection)

## Test Plan
- [ ] Verifica visiva vs prototipo Figma
- [ ] Test hover animations
- [ ] Test mobile responsive
- [ ] Test dark mode
- [ ] Verifica link funzionanti

## Definition of Done
- [ ] Codice prototipo Figma analizzato
- [ ] BlogSection implementata
- [ ] BlogCard implementato
- [ ] Design system applicato
- [ ] Animazioni fluide
- [ ] Mobile responsive
- [ ] Integrato in homepage
- [ ] Verifica visiva vs Figma ✓

## Dipendenze
- [ ] EPIC-001 DS-001 (Design tokens)
- [ ] Prototipo Figma in `to_copy` folder
