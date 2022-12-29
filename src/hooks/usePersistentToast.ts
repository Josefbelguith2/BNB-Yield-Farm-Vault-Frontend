import { useState } from 'react';
import { toast, TypeOptions } from 'react-toastify';

export default function usePersistentToast(message = '', type: TypeOptions = 'default') {
  const [persistentToastID, setPersistentToastID] = useState<React.ReactText>();

  const trigger = () => {
    toast.dismiss(persistentToastID);
    let toastID = toast(message, {
      type: type,
      autoClose: false,
      closeButton: false,
    });
    setPersistentToastID(toastID);
  };

  const dismiss = () => {
    setPersistentToastID(undefined);
    toast.dismiss(persistentToastID);
  };

  return { trigger, dismiss };
}
