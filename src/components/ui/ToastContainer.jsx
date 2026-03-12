import { CheckCircle, Info, AlertCircle } from 'lucide-react'
import './ToastContainer.css'

export default function ToastContainer({ toasts }) {
  if (!toasts.length) return null

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast--${t.type || 'success'}`}>
          {t.type === 'error'   ? <AlertCircle size={18} /> :
           t.type === 'neutral' ? <Info size={18} />        :
           <CheckCircle size={18} />}
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  )
}
