'use client';

interface TypographyItemProps {
  label: string;
  className: string;
  specs: string;
}

function TypographyItem({ label, className, specs }: TypographyItemProps) {
  return (
    <div>
      <p className={`${className} text-[#0A0A0A]`}>{label}</p>
      <p className="text-sm text-[#6B7280]">{specs}</p>
    </div>
  );
}

export default function Typography() {
  const typographyItems = [
    {
      label: 'Hero Text',
      className: 'text-hero',
      specs: 'Space Grotesk · 900 · 36-72px',
    },
    {
      label: 'Heading 1',
      className: 'text-h1',
      specs: 'Space Grotesk · 700 · 28-46px',
    },
    {
      label: 'Heading 2',
      className: 'text-h2',
      specs: 'Space Grotesk · 700 · 24-37px',
    },
    {
      label: 'Heading 3',
      className: 'text-h3',
      specs: 'Space Grotesk · 600 · 20-24px',
    },
    {
      label: 'Body Regular',
      className: 'text-body',
      specs: 'Inter · 400 · 16-17px',
    },
    {
      label: 'Body Small',
      className: 'text-body-small',
      specs: 'Inter · 400 · 14-15px',
    },
  ];

  return (
    <section className="mb-16">
      <h2 className="text-h2 text-[#0A0A0A] mb-6">Tipografia</h2>
      <div className="mb-6 bg-[#FFF5E1] border-2 border-[#FFD60A] rounded-lg p-4">
        <p className="text-body-small text-[#0A0A0A]">
          <strong>⚠️ REGOLA IMPORTANTE:</strong> Tutte le classi di tipografia (text-*, font-*)
          devono sempre applicare il colore nero (#0A0A0A) come default. Non usare mai testo bianco
          come colore di default. Il colore del testo deve essere esplicitamente specificato solo
          quando si vuole un colore diverso dal nero.
        </p>
      </div>
      <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-8 space-y-6">
        {typographyItems.map((item) => (
          <TypographyItem
            key={item.label}
            label={item.label}
            className={item.className}
            specs={item.specs}
          />
        ))}
      </div>
    </section>
  );
}
