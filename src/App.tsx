import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CitySelection } from "./components/CitySelection";
import { MoodSelection } from "./components/MoodSelection";
import { QuoteDisplay } from "./components/QuoteDisplay";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CitySelection />} />
        <Route path="/mood-quote" element={<MoodSelection />} />
        <Route path="/mood-quote/result" element={<QuoteDisplay />} />
      </Routes>
    </Router>
  );
}

export default App;
