import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { useClickOutside } from '../hooks/useClickOutside';
import { HiOutlineMenu, HiOutlineMenuAlt2 } from 'react-icons/hi';
import {
  FaDoorOpen,
  FaUser,
  FaHome,
  FaSearch,
  FaPen,
  FaQuestion,
  FaWrench,
} from 'react-icons/fa';

// links for the user that is not authentificated
const notAuthLinks = [
  { icon: <FaHome />, label: 'home', navigateTo: '/' },
  { icon: <FaQuestion />, label: 'about', navigateTo: '/about-app' },
  { icon: <FaSearch />, label: 'discovery', navigateTo: '/discovery' },
  { icon: <FaDoorOpen />, label: 'log in', navigateTo: '/log-into-account' },
  { icon: <FaPen />, label: 'create account', navigateTo: '/register-account' },
  { icon: <FaWrench />, label: 'how to use', navigateTo: '/how-to-use-it' },
];

// links for the user that is authentificated
const authLinks = [
  { icon: <FaHome />, label: 'home', navigateTo: '/' },
  {
    icon: <FaUser />,
    label: 'account',
    navigateTo: '/account-settings',
  },
];

function Navigation() {
  // state to control the sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // custom hook call to close the sidebar menu by clicking outside
  const { containerRef: sidebarMenuRef } = useClickOutside(() =>
    setIsSidebarOpen(false)
  );
  // useLocation call to determine the current path/url
  const url = useLocation();
  // the current pathname value for "active" styles
  const pathname = url.pathname;
  // custom hook call to determine if the user is authentificated or not
  const { isAuthenticated } = useUser();
  // what array should get mapped based on isAuthenticated value
  const navLinks = isAuthenticated === false ? authLinks : notAuthLinks;

  // handler that toggles the visibility of the menu
  const handleSidebar = (event) => {
    event.stopPropagation();
    setIsSidebarOpen((action) => !action);
  };

  return (
    <div>
      <button
        className='flex items-center justify-center outline-none border-none bg-transparent text-2xl text-gray-300'
        onClick={handleSidebar}
      >
        <HiOutlineMenuAlt2 />
      </button>

      <div
        data-role='sidebar-menu'
        className={`fixed z-[9999] bg-black/50 left-0 top-0 right-0 bottom-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-all duration-500`}
      >
        <div
          ref={sidebarMenuRef}
          // py-5 => py-3 from the nav + py-2 from the profile button
          className='flex flex-col gap-6 py-5 px-6 bg-black w-72 h-full border-r border-neutral-800'
        >
          <button
            onClick={handleSidebar}
            className='text-2xl text-gray-300'
          >
            <HiOutlineMenu />
          </button>

          <nav
            data-role='sidebar-links-container'
            className='flex flex-col gap-3'
          >
            {navLinks.map(({ icon, label, navigateTo }, index) => (
              <NavLink
                key={index}
                to={navigateTo}
                className={`text-gray-300 ${
                  pathname === navigateTo && 'text-red-100 bg-neutral-50/10'
                } text-lg capitalize tracking-wider flex items-center justify-start gap-2 py-1 px-2 -ml-1.5 rounded-md hover:bg-neutral-50/20 focus-visible:bg-neutral-50/20 transition-all duration-300`}
              >
                <span
                  className={`text-gray-500 ${
                    pathname === navigateTo && 'text-red-400'
                  }`}
                >
                  {icon}
                </span>
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
