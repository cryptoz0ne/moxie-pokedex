import { Routes, Route, Navigate } from "react-router-dom";

import List from "./pages";
import Detail from "./pages/detail";

function App() {
  return (
    <div className="h-full overflow-auto pt-10 px-6 pb-6">
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/pokemon/:slug" element={<Detail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
