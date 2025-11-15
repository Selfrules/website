# [BL-002] Redesign Pagina Blog (Lista Articoli)

## Metadata
- **Story ID**: BL-002 | **Epic**: [EPIC-006](./../epic.md)
- **Priorità**: 🟠 Alta | **Dimensione**: 🟡 M (1-2 giorni)
- **Execution Environment**: 🌐 **Claude Code Web**
- **Stato**: 📋 Todo | **Data**: 2025-11-13

## User Story
**Come** lettore **Voglio** navigare facilmente tutti gli articoli del blog **Così che** possa trovare contenuti di mio interesse

## Criteri di Accettazione
- [ ] **AC1**: Design basato su prototipo Figma
- [ ] **AC2**: Grid di articoli con BlogCard component (riuso da BL-001)
- [ ] **AC3**: Filtri per tag/categoria (Prodotto, Design, Dev, Leadership, Strategy)
- [ ] **AC4**: Search bar per cercare articoli
- [ ] **AC5**: Paginazione o infinite scroll
- [ ] **AC6**: SEO ottimizzato (meta tags, schema.org)

## Layout Structure
```tsx
// app/[locale]/blog/page.tsx
export default function BlogPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = filterPosts(allPosts, { selectedTags, searchQuery });

  return (
    <div className="container py-brutal-xl">
      {/* Hero */}
      <header className="mb-brutal-lg">
        <h1 className="text-5xl font-bold">Blog</h1>
        <p className="text-xl text-slate-blue mt-brutal-sm">
          Riflessioni su prodotto, design, sviluppo e leadership
        </p>
      </header>

      {/* Filters & Search */}
      <div className="mb-brutal-lg">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <TagFilter
          tags={['Prodotto', 'Design', 'Dev', 'Leadership', 'Strategy']}
          selected={selectedTags}
          onChange={setSelectedTags}
        />
      </div>

      {/* Articles Grid */}
      <div className="grid md:grid-cols-3 gap-brutal-md">
        {filteredPosts.map(post => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination currentPage={1} totalPages={5} />
    </div>
  );
}
```

## Components to Create

### SearchBar
```tsx
function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <input
        type="search"
        placeholder="Cerca articoli..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-brutal rounded-brutal p-brutal-sm w-full md:w-96"
      />
      <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2" />
    </div>
  );
}
```

### TagFilter
```tsx
function TagFilter({ tags, selected, onChange }) {
  const toggleTag = (tag) => {
    if (selected.includes(tag)) {
      onChange(selected.filter(t => t !== tag));
    } else {
      onChange([...selected, tag]);
    }
  };

  return (
    <div className="flex gap-2 mt-brutal-sm flex-wrap">
      {tags.map(tag => (
        <button
          key={tag}
          onClick={() => toggleTag(tag)}
          className={cn(
            "border-brutal rounded-brutal px-brutal-sm py-2",
            selected.includes(tag)
              ? "bg-electric-blue text-white"
              : "bg-white text-black"
          )}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
```

## SEO Implementation
```tsx
// app/[locale]/blog/page.tsx
export const metadata: Metadata = {
  title: 'Blog | Mattia Filippo De Luca - PM, Designer, Developer',
  description: 'Articoli su product management, design, sviluppo e leadership',
  openGraph: {
    title: 'Blog | Mattia Filippo De Luca',
    description: 'Riflessioni su prodotto, design e sviluppo',
    type: 'website',
  },
};
```

## Test Plan
- [ ] Search funziona correttamente
- [ ] Filtri tag funzionano
- [ ] Combinazione search + filter
- [ ] Mobile responsive
- [ ] SEO meta tags presenti
- [ ] Performance con molti articoli

## Definition of Done
- [ ] Pagina `/blog` implementata
- [ ] Search bar funzionante
- [ ] Tag filters funzionanti
- [ ] BlogCard riusato da BL-001
- [ ] SEO ottimizzato
- [ ] Mobile responsive
- [ ] Performance ottimizzata

## Dipendenze
- [ ] BL-001 (BlogCard component)
