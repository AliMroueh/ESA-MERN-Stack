
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
import { useSelector } from "react-redux";
import SearchScreen from "./screens/SearchScreen";
import Items from "./screens/Items";
import Likes from "./screens/Likes";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ChatApp from "./screens/Chat";
import AdminChatPage from "./screens/AdminChat";

function App() {

  const userRefresh = useSelector(state => state.userRefresh);
  const {
    loading,
    refreshTheToken,
    error
  } = userRefresh;

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(renewRefreshToken())
  // }, [dispatch])





  return (

    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/signin" element={<SigninScreen />}></Route>
        <Route path="/register" element={<RegisterScreen />}></Route>
        <Route path="/shipping" element={
        <PrivateRoute>
          <ShippingAddressScreen />
        </PrivateRoute>
        }></Route>
        <Route path="/payment" element={
        <PrivateRoute>
          <PaymentMethodScreen />
        </PrivateRoute>
        }></Route>
        <Route path="/placeorder" element={
        <PrivateRoute>
          <PlaceOrderScreen />
        </PrivateRoute>
        }></Route>
        <Route path="/order/:id" element={
        <PrivateRoute>
          <OrderScreen />
        </PrivateRoute>
        }></Route>

        <Route
          path="/profile"
          element={<PrivateRoute>
            <ProfileScreen />
          </PrivateRoute>}
        />
        <Route
          path="/cart/:id"
          element={<CartItemScreen />}
        />
        <Route
          path="/cart"
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
          path="/chat"
          element={<PrivateRoute>
            <ChatApp />
          </PrivateRoute>
          }
        />

       <Route
          path="/adminchat"
          element={<AdminRoute>
            <AdminChatPage />
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
        <Route path="/orderhistory" element = {
        <PrivateRoute>
        <OrderHistoryScreen />
        </PrivateRoute>
        }></Route>
        <Route
          path="/orders"
          element={
            <AdminRoute>
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
        <Route path='/product/:id' element={<Items />} exact />

        <Route
          path="/updatecategory/:id"
          element={<AdminRoute>
            <AdminUpdateCategory />
          </AdminRoute>
          }
        />

        <Route path='/edit/:id' element={
        <AdminRoute>
        <AdminEditProduct />
        </AdminRoute>} exact />
        <Route path='/like/:id' element={
        <PrivateRoute>
        <Likes />
        </PrivateRoute>} />
        <Route path='/likes' element={
          <PrivateRoute>
        <Likes />
        </PrivateRoute>
        } />

        {/* <Route
          path="/checkout-success"
          element={<CheckoutSuccess />}
        /> */}

        <Route path='*' element={<NotFoundScreen />} />
      </Routes>
      <Footer />
    </BrowserRouter>

  );
}


export default App;





