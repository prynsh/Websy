import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/landing-page';
import { Builder } from './components/builderComponent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/builder" element={<Builder />} />
      </Routes>
    </Router>
  );
}

export default App;
