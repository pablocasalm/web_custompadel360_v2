import { ReactNode } from 'react';

type Props = {
  title: string;
  price?: number;
  period?: string;
  features?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  children?: ReactNode; // ⬅️ ahora acepta children
};

export default function ConfigCard({
  title,
  price,
  period = '',
  features = [],
  ctaLabel = 'Seleccionar',
  ctaHref = '#',
  children,
}: Props) {
  const hasChildren = children !== undefined && children !== null;

  return (
    <div className="rounded-2xl border p-6 flex flex-col">
      <h3 className="text-lg font-semibold">{title}</h3>

      {typeof price === 'number' && (
        <div className="mt-3 text-3xl font-bold">
          € {price.toFixed(0)} <span className="text-base font-normal">{period}</span>
        </div>
      )}

      <div className="mt-4 flex-1">
        {hasChildren ? (
          children
        ) : (
          <ul className="space-y-2 list-disc pl-5">
            {features.map((f, i) => (
              <li key={i} className="opacity-90">
                {f}
              </li>
            ))}
          </ul>
        )}
      </div>

      {!hasChildren && (
        <a
          href={ctaHref}
          className="mt-6 inline-block text-center px-4 py-2 rounded-xl bg-black text-white"
        >
          {ctaLabel}
        </a>
      )}
    </div>
  );
}