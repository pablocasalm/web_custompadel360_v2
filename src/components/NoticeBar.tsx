import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface NoticeBarProps {
  text: string;
  visible: boolean;
}

export default function NoticeBar({ text, visible }: NoticeBarProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('notice_dismissed');
    setShow(visible && dismissed !== 'true');
  }, [visible]);

  const handleDismiss = () => {
    localStorage.setItem('notice_dismissed', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="notice-bar">
      <div className="container">
        <div className="notice-content">
          <div className="notice-text">{text}</div>
          <button
            className="notice-close"
            onClick={handleDismiss}
            aria-label="Cerrar aviso"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
