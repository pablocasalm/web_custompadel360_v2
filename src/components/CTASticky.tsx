import { Mail } from 'lucide-react';

export default function CTASticky() {
  return (
    <div className="cta-sticky">
      <a href="mailto:info@custompadel360.com" className="cta-button">
        <Mail size={20} />
        Contacto
      </a>
    </div>
  );
}
