import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="section-brutal">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-display mb-8 sentence-case">
            {t('hero.headline')}
          </h1>
          <p className="text-body-xl mb-8 max-w-3xl">
            {t('hero.subtitle')}
          </p>
          <button className="btn-brutal-primary">
            {t('hero.cta')}
          </button>
        </div>
      </section>

      {/* TODO: Add more sections as per PRD
        - My Journey Section
        - Latest Thinking (Blog)
        - Work Together Section
        - What I'm Up To Section
        - Ask Me Anything Section
      */}
    </main>
  );
}
