import { useCallback, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { PortfolioPage } from "@/pages/PortfolioPage";
import { Loader } from "@/components/Loader";

export function App() {
  const [loading, setLoading] = useState(true);
  const finishLoading = useCallback(() => setLoading(false), []);

  return (
    <BrowserRouter>
      <Analytics />
      {loading && <Loader onDone={finishLoading} />}
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/all-projects" element={<PortfolioPage archive />} />
        <Route path="/projects" element={<Navigate to="/#work" replace />} />
        <Route path="/about" element={<Navigate to="/#about" replace />} />
        <Route path="/experience" element={<Navigate to="/#experience" replace />} />
        <Route path="/tech" element={<Navigate to="/#skills" replace />} />
        <Route path="/contact" element={<Navigate to="/#contact" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
