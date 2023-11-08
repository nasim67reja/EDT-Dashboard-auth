import { Route, Routes } from "react-router-dom";
import axios from "axios";
// import LogIn from "./pages/login/LogIn";
import Dashboard from "./pages/home/Page";
import ProtectedRoute from "./components/common/utils/ProtectedRoutes";
import LogIn from "./pages/login/U_LogIn";
import Auth from "./pages/login/Auth";
import Page from "./pages/campaign/Page";
import Home from "./pages/home/Home";
axios.defaults.withCredentials = true;
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            // <ProtectedRoute>
            <Dashboard />
            // </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="/campaign" element={<Page />} />
        </Route>
        <Route path="/login" element={<Auth />} />

        <Route path="/test" element={<LogIn />} />
      </Routes>
    </>
  );
}

export default App;
