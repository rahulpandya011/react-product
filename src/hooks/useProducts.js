import { useQuery } from 'react-query';

import { ProductService } from '../api';
import { toast } from 'react-toastify';

/**
 * Hook for user login
 */
const onDefaultError = (error) => {
  toast.error(error.message);
};

const useProductList = (params, onSuccess, onError = onDefaultError) => {
  return useQuery(['product-list', [params]], () => ProductService.productlist(params), {
    onSuccess,
    keepPreviousData: true,
    onError,
  });
};

const useProductDetail = (params, onSuccess, onError = onDefaultError) => {
  return useQuery(['product-detail', [params]], () => ProductService.productdetail(params), {
    onSuccess,
    keepPreviousData: true,
    onError,
  });
};

export { useProductList, useProductDetail };
