type SectionDef = { id: string; label: string };

export default function Subnav({
  sections,
  activeId,
  onJump,
}: {
  sections: SectionDef[];
  activeId: string;
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
              aria-current={activeId === s.id ? "true" : undefined}
              onClick={() => onJump(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}