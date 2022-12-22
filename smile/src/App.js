import { BrowserRouter, Route } from "react-router-dom";
import Home from "./screens/Home";

function App() {
  return (
    <BrowserRouter>
      <Route index element={<Home />} />
    </BrowserRouter>
  );
}

export default App;
