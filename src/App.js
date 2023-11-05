import { Route, Routes } from "react-router-dom";
import LogIn from "./pages/login/LogIn";
import Dashboard from "./pages/home/Page";
import ProtectedRoute from "./components/common/utils/ProtectedRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </>
  );
}

export default App;
