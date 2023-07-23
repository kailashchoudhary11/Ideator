import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import "../styles/Layout.css"

export default function Layout() {
  return (
    <div className="parentContainer">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}