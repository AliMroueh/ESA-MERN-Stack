
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
import PrivateRoute from "./components/PrivateRoute";
import AdminOrders from "./screens/AdminOrders";
import AdminCategories from "./screens/AdminCategories";
import AdminProducts from "./screens/AdminProducts";
import AdminEditProduct from "./screens/AdminEditProduct";
import AdminUsers from "./screens/AdminUsers";
import AdminAddCategory from "./screens/AdminAddCategory";
import AdminUpdateCategory from "./screens/AdminUpdateCategory";
import AdminAddProduct from "./screens/AdminAddProduct";
import CartItemScreen from "./screens/CartItemScreen";
import { useEffect } from "react";
import { renewRefreshToken } from "./actions/refreshTokenAction";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "./components/LoadingBox";
import SearchScreen from "./screens/SearchScreen";
import Items from "./screens/Items";
import Likes from "./screens/Likes";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";

function App() {

  const userRefresh = useSelector(state => state.userRefresh);
  const {
    loading,
    refreshTheToken,
    error
  } = userRefresh;

  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(renewRefreshToken())
  },[dispatch])

  return (

      <BrowserRouter>
      <Header/>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/signin" element = {<SigninScreen />}></Route>
        <Route path="/register" element = {<RegisterScreen />}></Route>

        <Route
          path="/profile"
          element={<PrivateRoute>
          <ProfileScreen />
          </PrivateRoute>}
        />
        <Route
          path="/cart"
          element={<CartItemScreen />}
        />
        <Route
          path="/cart/:id"
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
        <Route
          path="/orders"
          element={<AdminRoute>
          <AdminOrders />
          </AdminRoute>
        }
        />
                <Route
        // I think ? after :name has no sense
            path="/search/name/:name"
            element={<SearchScreen />}
            exact
        ></Route>
        <Route
            path="/search/category/:category"
            element={<SearchScreen />}
            exact
        ></Route>
        <Route
            path="/search/category/:category/name/:name"
            element={<SearchScreen />}
            exact
        ></Route>
        <Route
            // path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order"
            path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
            element={<SearchScreen />}
            exact
          ></Route>
          <Route path='/product/:id' element={<Items/>} exact/>
        <Route path='*' element={<NotFoundScreen />}/>

        <Route
          path="/updatecategory/:id"
          element={<AdminRoute>
            <AdminUpdateCategory />
          </AdminRoute>
          }
        />

        <Route path='/edit/:id' element={<AdminEditProduct />} exact />
        <Route path='/like/:id' element={<Likes/>}  />
        {/* <Route path="/shipping" element = {<ShippingAddressScreen />}></Route> */}
        <Route path='*' element={<NotFoundScreen />} />
      </Routes>
      <Footer />
    </BrowserRouter>

  );
}


export default App;





