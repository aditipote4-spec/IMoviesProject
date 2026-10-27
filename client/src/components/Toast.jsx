import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Toast({ toasts = [], onDismiss }) {
  useEffect(() => {
    if (toasts.length === 0) return;

    const timer = setTimeout(() => {
      onDismiss(toasts[0].id);
    }, 4500);

    return () => clearTimeout(timer);
  }, [toasts, onDismiss]);

  if (!toasts.length) return null;

  return (
    <div className="toast-container" role="region" aria-live="polite">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type || 'info'}`}>
          {t.type === 'error' ? (
            <AlertCircle size={20} color="var(--accent-danger)" />
          ) : (
            <CheckCircle2 size={20} color="var(--accent-success)" />
          )}
          <div style={{ flex: 1 }}>{t.message}</div>
          <button
            onClick={() => onDismiss(t.id)}
            style={{ background: 'none', color: '#94a3b8', display: 'flex', padding: 2 }}
            aria-label="Close notification"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
