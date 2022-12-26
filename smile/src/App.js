import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import RegisterScreen from "./screens/RegisterScreen";
import SigninScreen from "./screens/SigninScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/signin" element = {<SigninScreen />}></Route>
        <Route path="/register" element = {<RegisterScreen />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
