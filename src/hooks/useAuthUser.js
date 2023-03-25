import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

import { AuthService } from '../api';

/**
 * Hooks for Authentication Process
 */
const onDefaultError = (error) => {
  toast.error(error.message);
};
const useAdminLogin = (onSuccess, onError = onDefaultError) => {
  return useMutation(AuthService.login, {
    onSuccess,
    onError,
  });
};
export { useAdminLogin };
