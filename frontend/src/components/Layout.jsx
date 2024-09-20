import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Headers/Header";

function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isLogIn = location.pathname === "/login";

  useEffect(() => {
    const token = localStorage.getItem("token");

    // ถ้าไม่มี token และไม่ได้อยู่ที่หน้า login ให้เปลี่ยนเส้นทางไปที่หน้า login
    if (!token && !isLogIn) {
      navigate("/login", { replace: true }); // ใช้ replace เพื่อป้องกันปัญหาการย้อนกลับ
    }
  }, [isLogIn, navigate]);

  return (
    <>
      {!isLogIn && <Header />}
      <main className="container mt-2">{children}</main>
    </>
  );
}

export default Layout;
