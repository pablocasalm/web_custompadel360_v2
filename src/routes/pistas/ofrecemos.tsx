export default function Ofrecemos({
    id,
    title,
    text,
  }: {
    id: string;
    title: string;
    text: string;
  }) {
    return (
      <section id={id} className="section">
        <div className="container">
          <h2 className="h2 text-center">{title}</h2>
          <p className="lead text-center reading">{text}</p>
        </div>
      </section>
    );
  }