import { Route, Routes } from "react-router-dom";
import LogIn from "./pages/login/LogIn";
import Page from "./pages/home/Page";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </>
  );
}

export default App;
