import { Helmet } from "react-helmet-async";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Page";
import Login from "./pages/Login/Login";
import SuperAdmin from "./pages/superadmin/page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        link
        <title>Lazer Pos || Home</title>
      </Helmet>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/superadmin" element={<SuperAdmin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}
