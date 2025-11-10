'use client';

interface ShadowItemProps {
  name: string;
  className: string;
  specs: string;
}

function ShadowItem({ name, className, specs }: ShadowItemProps) {
  return (
    <div className={`bg-white border-4 border-[#000] rounded-lg ${className} p-8`}>
      <p className="font-bold text-[#0A0A0A]">{name}</p>
      <p className="text-sm text-[#6B7280]">{specs}</p>
    </div>
  );
}

export default function BrutalShadows() {
  const shadows = [
    {
      name: 'shadow-brutal-sm',
      className: 'shadow-brutal-sm',
      specs: '3px 3px 0 #000',
    },
    {
      name: 'shadow-brutal',
      className: 'shadow-brutal',
      specs: '6px 6px 0 #000',
    },
    {
      name: 'shadow-brutal-lg',
      className: 'shadow-brutal-lg',
      specs: '10px 10px 0 #000',
    },
  ];

  return (
    <section className="mb-16">
      <h2 className="text-h2 text-[#0A0A0A] mb-6">Brutal Shadows</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {shadows.map((shadow) => (
          <ShadowItem
            key={shadow.name}
            name={shadow.name}
            className={shadow.className}
            specs={shadow.specs}
          />
        ))}
      </div>
    </section>
  );
}
