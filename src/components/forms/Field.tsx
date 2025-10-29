import { ReactNode } from 'react';

export default function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="cp-field block">
      <span className="text-sm font-medium">{label}</span>
      <div className="mt-1">{children}</div>
      {hint && <span className="block mt-1 text-xs opacity-70">{hint}</span>}
      <style>{`
        .cp-field input,
        .cp-field select,
        .cp-field textarea {
          width: 100%;
          background: #fff;
          border: 1px solid rgba(0,0,0,.1);
          border-radius: 12px;
          padding: 10px 12px;
          outline: none;
        }
        .cp-field input:focus,
        .cp-field select:focus,
        .cp-field textarea:focus {
          border-color: rgba(0,0,0,.25);
        }
      `}</style>
    </label>
  );
}
