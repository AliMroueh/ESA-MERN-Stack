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

function App() {

  return (
      <BrowserRouter>
          <Header/>

          <Routes>
            <Route index element={<Home />} />
            <Route path="/signin" element = {<SigninScreen />}></Route>
            <Route path="/register" element = {<RegisterScreen />}></Route>
            <Route
              path="/profile"
              element={<ProfileScreen />}
            />
              <Route
              path="/dashboard"
              element={<AdminRoute>
              <AdminDashboard />
              </AdminRoute>
            }
            />
            <Route path='*' element={<NotFoundScreen />}/>
          </Routes>
          <Footer/>
      </BrowserRouter>

  );
}


export default App;
