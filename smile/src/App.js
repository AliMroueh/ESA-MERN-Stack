import { BrowserRouter, redirect, Route, Routes, useLocation } from "react-router-dom";
import Home from "./screens/Home";
import NotFoundScreen from "./screens/NotFoundScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SigninScreen from "./screens/SigninScreen";
<<<<<<< Updated upstream

=======
import Header from "./common/Header/Header"; 
import Footer from './common/footer/Footer'
import { useEffect } from "react";
>>>>>>> Stashed changes
function App() {
      
  return (
    <BrowserRouter>
<<<<<<< Updated upstream
      <Routes>
        <Route index element={<Home />} />
        <Route path="/signin" element = {<SigninScreen />}></Route>
        <Route path="/register" element = {<RegisterScreen />}></Route>
        <Route
           path="/profile"
           element={<ProfileScreen />}
         />
         <Route path='*' element={<NotFoundScreen />}/>
      </Routes>
=======

      <Header/>

        <Routes>
          <Route index element={<Home />} />
          <Route path="/signin" element = {<SigninScreen />}></Route>
          <Route path="/register" element = {<RegisterScreen />}></Route>
          <Route
            path="/profile"
            element={<ProfileScreen />}
          />
          <Route path='*' element={<NotFoundScreen />}/>
        </Routes>

      <Footer/>
>>>>>>> Stashed changes
    </BrowserRouter>
  );
}

export default App;
