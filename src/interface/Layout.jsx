import { Outlet } from 'react-router-dom';
import Sidebar from '../components/_sidebar/Sidebar';

function Layout() {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <Sidebar />

      <main className='w-[calc(100vw-384px)] h-full p-9 overflow-x-hidden overflow-y-auto'>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
