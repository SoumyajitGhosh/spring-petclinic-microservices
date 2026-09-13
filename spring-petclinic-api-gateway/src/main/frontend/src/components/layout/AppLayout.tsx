import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import ChatWidget from '../chat/ChatWidget';

export default function AppLayout() {
  return (
    <>
      <NavBar />
      <div className="container-fluid">
        <div className="container xd-container">
          <Outlet />
        </div>
      </div>
      <ChatWidget />
      <Footer />
    </>
  );
}
