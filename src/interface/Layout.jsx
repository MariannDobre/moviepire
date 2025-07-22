import { Outlet } from 'react-router-dom';
import Topbar from '../components/_topbar/Topbar';
import Footer from '../components/_footer/Footer';

function Layout() {
  return (
    <div className='w-full flex flex-col relative'>
      <Topbar />

      <main className='w-full mt-[calc(80px+1px)] p-3 md:p-6 xl:p-9 2xl:p-12'>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
