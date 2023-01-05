import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import RegisterScreen from "./screens/RegisterScreen";
import SigninScreen from "./screens/SigninScreen";
import Header from "./common/Header/Header"; 
import Footer from './common/footer/Footer'
function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/signin" element = {<SigninScreen />}></Route>
        <Route path="/register" element = {<RegisterScreen />}></Route>
      </Routes>
     
    </BrowserRouter>
  );
}

export default App;
