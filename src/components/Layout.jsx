import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="app">
      <Sidebar />
      <div className="content-wrapper">
        <Header />
        <main className="content">
          {/* The Outlet is the placeholder for specific page content */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default Layout;
