import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  return (
    <Routes>
      <Route element={<Navbar />}>
        <Route index path="/" element={<Home />} />
        {/* <Route path="/store" element={<Store />} /> */}
        {/* <Route path="/cart" element={<Cart />} /> */}
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
