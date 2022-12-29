import { useState } from 'react';

export default function useInput(initialValue = '') {
  const [value, setValue] = useState(initialValue);
  const set = (e: any) => setValue(e.target.value);
  const reset = () => setValue('');
  const override = (v: string) => setValue(v);
  return { value, set, reset, override };
}
