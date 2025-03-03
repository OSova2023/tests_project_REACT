import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import Finalize from './components/routes/finalize/Finalize.jsx'
import Results from './components/routes/results/Results.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
        <Routes>
      <Route index element={<App />} />
      <Route path="/finalize/:id" element={<Finalize />} />
      <Route path="/results/:id" element={<Results />} />
    </Routes>
  </BrowserRouter>
)
