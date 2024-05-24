import { Routes, Route, Navigate } from "react-router-dom";

import List from "./pages";
import Detail from "./pages/detail";

function App() {
  return (
    <div className="h-full overflow-auto p-6">
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/pokemon/:pokemonName" element={<Detail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
