import React from "react";

export default function ConfigCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card config-card">
      <div className="config-card__header">{title}</div>
      <div className="config-card__body">{children}</div>
    </div>
  );
}
