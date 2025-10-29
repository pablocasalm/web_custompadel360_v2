export default function Faqs({
    faqs,
  }: {
    faqs: { q: string; a: string }[];
  }) {
    return (
      <section id="faqs" className="section">
        <div className="container">
          <h2 className="h2 text-center">FAQs</h2>
          <div className="stack-md mt-6">
            {faqs.map((f, i) => (
              <details key={i} className="card">
                <summary className="cursor-pointer h4">{f.q}</summary>
                <p className="mt-1">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    );
  }