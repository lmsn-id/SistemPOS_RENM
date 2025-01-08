import { Helmet } from "react-helmet-async";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import Home from "./pages/Home/Page";
import Login from "./pages/Login/Page";
import LayoutSuperAdmin from "./pages/Superadmin/Layout";
import AkunSA from "./pages/Superadmin/Akun/Page";
import AddAkun from "./pages/Superadmin/Akun/Post/Add";
import UpdateDataAkun from "./pages/Superadmin/Akun/Update/Update";
import LayoutAdmin from "./pages/Admin/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <Helmet>
        <title>Lazer Pos || Home</title>
      </Helmet>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/superadmin/" element={<LayoutSuperAdmin />}>
            <Route path="akun" element={<AkunSA />} />
            <Route path="akun/add" element={<AddAkun />} />
            <Route path="akun/update/:id" element={<UpdateDataAkun />} />
          </Route>
          <Route path="/admin/" element={<LayoutAdmin />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
