import "./App.css";
import { Route, Routes } from "react-router";
import KanbanBoard from "./pages/KanbanBoard";
import Authenticate from "./pages/Authenticate";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        index
        element={
          <PrivateRoute>
            <KanbanBoard />
          </PrivateRoute>
        }
      />
      <Route path="auth" element={<Authenticate />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}

export default App;
