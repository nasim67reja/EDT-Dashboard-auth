import { Route, Routes } from "react-router-dom";
import LogIn from "./pages/login/LogIn";
import Dashboard from "./pages/home/Page";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </>
  );
}

export default App;
