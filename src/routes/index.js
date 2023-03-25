import { React } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import LoginPage from '../pages/Auth/LoginPage';
import ListProduct from '../pages/Products/ListProduct';
import PageNotFound from '../pages/common/PageNotFound';
import DetailProduct from '../pages/Products/DetailProduct';

const PagesRoutes = () => {
  return (
    <Router basename={'/'}>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route exact path="/dashboard" element={<ListProduct />} />
          <Route exact path="/product-detail/:product_id" element={<DetailProduct />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default PagesRoutes;
