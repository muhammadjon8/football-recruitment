// layouts/DefaultLayout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const DefaultLayout = () => {
  return (
    <div className="">
      <Navbar />
      <main className="">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
