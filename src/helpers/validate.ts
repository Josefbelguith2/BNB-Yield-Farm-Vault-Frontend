import { toast } from 'react-toastify';

/**
 * Validats Staking/Withdrawal amount entered by user
 * @param  {string} amount
 * @returns boolean
 */
export function validateAmount(amount: string): boolean {
  if (!amount) {
    toast.info('Please enter an amount');
    return false;
  }

  if (amount === '0') {
    toast.info('Please enter a non zero value');
    return false;
  }

  if (parseFloat(amount) < 0) {
    toast.info('Please enter a positive integer');
    return false;
  }

  return true;
}
