'use client';

interface ColorSwatchProps {
  name: string;
  hex: string;
  usage: string;
  textColor?: 'white' | 'black';
}

function ColorSwatch({ name, hex, usage, textColor = 'white' }: ColorSwatchProps) {
  const textClass = textColor === 'white' ? 'text-white' : 'text-[#0A0A0A]';
  const textSecondaryClass = textColor === 'white' ? 'text-white/80' : 'text-[#0A0A0A]/80';
  const textTertiaryClass = textColor === 'white' ? 'text-white/60' : 'text-[#0A0A0A]/60';

  return (
    <div
      className="border-4 border-[#000] rounded-lg shadow-brutal p-6"
      style={{ backgroundColor: hex }}
    >
      <p className={`${textClass} font-bold mb-1`}>{name}</p>
      <p className={`${textSecondaryClass} text-sm`}>{hex}</p>
      <p className={`${textTertiaryClass} text-xs mt-2`}>{usage}</p>
    </div>
  );
}

export default function ColorPalette() {
  const colors = [
    {
      name: 'Electric Blue',
      hex: '#0D7EFF',
      usage: 'Design/UX',
      textColor: 'white' as const,
    },
    {
      name: 'Teal',
      hex: '#2A687A',
      usage: 'Development',
      textColor: 'white' as const,
    },
    {
      name: 'Deep Purple',
      hex: '#7209B7',
      usage: 'PM/Strategy',
      textColor: 'white' as const,
    },
    {
      name: 'Neon Pink',
      hex: '#FF006E',
      usage: 'Tools/Analytics',
      textColor: 'white' as const,
    },
    {
      name: 'Cyber Yellow',
      hex: '#FFD60A',
      usage: 'Featured only',
      textColor: 'black' as const,
    },
  ];

  return (
    <section className="mb-16">
      <h2 className="text-h2 text-[#0A0A0A] mb-6">Palette Colori</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {colors.map((color) => (
          <ColorSwatch
            key={color.hex}
            name={color.name}
            hex={color.hex}
            usage={color.usage}
            textColor={color.textColor}
          />
        ))}
      </div>
    </section>
  );
}
