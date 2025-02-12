import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Auctions from "./Pages/Auctions";
import FixedDeals from "./Pages/FixedDeals";
import DealersList from "./Pages/DealersList";
import AboutUs from "./Pages/AboutUs";

function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Auctions" element={<Auctions />} />
        <Route path="/FixedDeals" element={<FixedDeals />} />
        <Route path="/DealersList" element={<DealersList />} />
        <Route path="/AboutUs" element={<AboutUs />} />
    </Routes>
  );
}

export default App;