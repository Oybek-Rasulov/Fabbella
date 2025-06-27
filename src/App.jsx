import { lazy } from 'react';
import Home from './ui/Home';
import Error from './ui/Error';
import Select from './ui/Select';
import AppLayout from './ui/AppLayout';
const Orders = lazy(() => import('./ui/Orders'));
const OrderForm = lazy(() => import('./ui/OrderForm'));
const Admin = lazy(() => import('./features/Admin/Dashboard/Admin'));
const OrderSuccess = lazy(() => import('./ui/OrderSuccess'));
import { CategoryProvider } from './context/CategoryContext';
import { SearchProvider } from './context/SearchContext';
import { OrdersSearchProvider } from './context/AdminOrdersSearchContext';
import { ProductsSearchProvider } from './context/AdminProductsSearchContext';
import  { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminLayout from './features/Admin/AdminLayout';
import AdminOrders from './features/Admin/Orders/AdminOrders';
import AdminProducts from './features/Admin/Products/AdminProducts';
import AdminAdd from './features/Admin/AddProduct/AdminAdd';
import AdminOrder from './features/Admin/OrderPage/AdminOrder';
import ProductPage from './features/Admin/Products/ProductPage';
import PrivateRoute from './features/Admin/AdminAuth/PrivateRoute';
import AdminLogin from './features/Admin/AdminAuth/AdminLogin';

const router = createBrowserRouter([
    {
        element: 
            <SearchProvider>
                <CategoryProvider>
                            <AppLayout/>
                    </CategoryProvider> 
            </SearchProvider>,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Home />,
                errorElement: <Error />
            },
            {
                path: '/selection/:id',
                element: <Select />,
                errorElement: <Error />
            },
            {
                path: '/orders',
                element: <Orders />,
                errorElement: <Error />
            },
            {
                path: '/orderForm',
                element: <OrderForm />
            },

        ]
    },
    {
      path: '/orderSuccess',
      element: <OrderSuccess />
    },
    {
        path: "/admin/login",
        element: <AdminLogin />
      },
      {
        path: "/adminboard",
        element: 
        // <PrivateRoute>
            <OrdersSearchProvider>
              <ProductsSearchProvider>
                <AdminLayout />
              </ProductsSearchProvider>
            </OrdersSearchProvider>,
        // </PrivateRoute>,
        errorElement: <Error />,
        children: [
          {
            path: "main",
            element: (
                <Admin />
            ),
          },
          {
            path: "products",
            element: (
                <AdminProducts />
            ),
          },
          {
            path: "products/:id",
            element: (
                <ProductPage />
            ),
          },
          {
            path: "add",
            element: (
                <AdminAdd />
            ),
          },
          {
            path: "orders",
            element: (
                <AdminOrders />
            ),
          },
          {
            path: "order/:id",
            element: (
                <AdminOrder />
            ),
          }
        ]
      }
])

export default function App() {

    return <RouterProvider router={router} />
        // <>
        //                                         <Route path='/' element={ <Home /> } />
        //                             <Route path='/selection/:id' element={ <Select /> } />
        //                             <Route path='/orders' element={ <Orders /> } />
        //                             <Route path='/finalOrder' element={<FinalOrder />} />
        //                             <Route path='/adminLogin' element={<AdminLogin />} />
        //                             <Route element={<ProtectedRoute />}>
        //                                 <Route path="/adminPanel" element={<Admin />} />
        //                                 <Route path='/allProducts' element={<AdminAllProducts />} />
        //                             </Route>
        // </>
}
