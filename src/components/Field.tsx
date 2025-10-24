import React from "react";

type Props = {
  label: string;
  hint?: string;
  children: React.ReactNode;
};

export default function Field({ label, hint, children }: Props) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      {hint && <span className="field__hint">{hint}</span>}
      <div className="field__control">{children}</div>
    </label>
  );
}
