import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route element={<Navbar />}>
        <Route index path="/" element={<Home />} />
        {/* <Route path="/store" element={<Store />} /> */}
        {/* <Route path="/cart" element={<Cart />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
