import { Outlet } from 'react-router-dom';
import Navbar from '@components/Navbar/Navbar';
import Footer from '@components/Footer/Footer';
import './MainLayout.css';

/**
 * MainLayout
 * Root layout wrapper: Navbar → <main> (page content via Outlet) → Footer.
 * Used as the parent <Route element> in App.jsx.
 */
const MainLayout = ({ onTogglePalette }) => {
  return (
    <>
      <Navbar onTogglePalette={onTogglePalette} />
      <main className="main-layout__content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
