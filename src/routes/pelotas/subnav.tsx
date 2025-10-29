import { memo } from "react";

export type SectionLink = { id: string; label: string };

export default memo(function Subnav({
  sections,
  active,
  onJump,
}: {
  sections: SectionLink[];
  active: string;
  onJump: (id: string) => void;
}) {
  return (
    <nav className="subnav">
      <div className="container">
        <div className="pills">
          {sections.map((s) => (
            <button
              key={s.id}
              className="pill"
              aria-current={active === s.id ? "true" : undefined}
              onClick={() => onJump(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
});