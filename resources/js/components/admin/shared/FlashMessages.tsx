import { usePage } from '@inertiajs/react';
import * as React from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FlashMessages() {
  const page = usePage();
  const flash = (page.props as { flash?: { success?: string; error?: string; warning?: string; info?: string } }).flash || {};
  const errors = (page.props as { errors?: Record<string, string> }).errors || {};
  const [messageList, setMessageList] = React.useState<Array<{ id: string; type: 'success' | 'error' | 'warning' | 'info'; message: string }>>([]);

  React.useEffect(() => {
    const newMessages: Array<{ id: string; type: 'success' | 'error' | 'warning' | 'info'; message: string }> = [];
    
    // Add flash messages
    if (flash.success) {
      newMessages.push({ id: `success-${Date.now()}`, type: 'success', message: flash.success });
    }
    if (flash.error) {
      newMessages.push({ id: `error-${Date.now()}`, type: 'error', message: flash.error });
    }
    if (flash.warning) {
      newMessages.push({ id: `warning-${Date.now()}`, type: 'warning', message: flash.warning });
    }
    if (flash.info) {
      newMessages.push({ id: `info-${Date.now()}`, type: 'info', message: flash.info });
    }
    
    // Convert validation errors to a single error message
    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.values(errors).join(', ');
      newMessages.push({ id: `validation-${Date.now()}`, type: 'error', message: errorMessages });
    }
    
    if (newMessages.length > 0) {
      setMessageList(newMessages);
      
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setMessageList([]);
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setMessageList([]);
    }
  }, [flash, errors]);

  const dismiss = (id: string) => {
    setMessageList(prev => prev.filter(msg => msg.id !== id));
  };

  if (messageList.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-[100] space-y-2">
      {messageList.map((msg) => (
        <Message
          key={msg.id}
          type={msg.type}
          message={msg.message}
          onDismiss={() => dismiss(msg.id)}
        />
      ))}
    </div>
  );
}

interface MessageProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onDismiss: () => void;
}

function Message({ type, message, onDismiss }: MessageProps) {
  const icons = {
    success: <CheckCircle className="h-5 w-5" aria-hidden="true" />,
    error: <XCircle className="h-5 w-5" aria-hidden="true" />,
    warning: <AlertCircle className="h-5 w-5" aria-hidden="true" />,
    info: <AlertCircle className="h-5 w-5" aria-hidden="true" />,
  };

  const styles = {
    success: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200',
    error: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200',
    info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200',
  };

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-lg border p-4 shadow-lg transition-all duration-300',
        styles[type]
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="flex-shrink-0">
        {icons[type]}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button
        onClick={onDismiss}
        className="flex-shrink-0 rounded-md p-1 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        aria-label="Dismiss message"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
