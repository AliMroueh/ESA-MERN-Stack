import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import NotFoundScreen from "./screens/NotFoundScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SigninScreen from "./screens/SigninScreen";
import Header from "./common/Header/Header";
import Footer from './common/footer/Footer'
import AdminDashboard from "./screens/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import AdminOrders from "./screens/AdminOrders";
import AdminCategories from "./screens/AdminCategories";
import AdminProducts from "./screens/AdminProducts";
import AdminEditProduct from "./screens/AdminEditProduct";
import AdminUsers from "./screens/AdminUsers";
import AdminAddCategory from "./screens/AdminAddCategory";
import AdminAddProduct from "./screens/AdminAddProduct";
import CartItemScreen from "./screens/CartItemScreen";

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/signin" element={<SigninScreen />}></Route>
        <Route path="/register" element={<RegisterScreen />}></Route>
        <Route
          path="/profile"
          element={<ProfileScreen />}
        />
        <Route
          path="/cartItem"
          element={<CartItemScreen />}
        />
        <Route
          path="/dashboard"
          element={<AdminRoute>
            <AdminDashboard />
          </AdminRoute>
          }
        />
        <Route
          path="/users"
          element={<AdminRoute>
            <AdminUsers />
          </AdminRoute>
          }
        />
        <Route
          path="/products"
          element={<AdminRoute>
            <AdminProducts />
          </AdminRoute>
          }
        />
        <Route
          path="/categories"
          element={<AdminRoute>
            <AdminCategories />
          </AdminRoute>
          }
        />
        <Route
          path="/addcategory"
          element={<AdminRoute>
            <AdminAddCategory />
          </AdminRoute>
          }
        />
        <Route
          path="/addproduct"
          element={<AdminRoute>
            <AdminAddProduct />
          </AdminRoute>
          }
        />

        <Route path='/edit/:id' element={<AdminEditProduct />} exact />

        <Route
          path="/orders"
          element={<AdminRoute>
            <AdminOrders />
          </AdminRoute>
          }
        />
        <Route path='*' element={<NotFoundScreen />} />
      </Routes>
      <Footer />
    </BrowserRouter>

  );
}


export default App;
