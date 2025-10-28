import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import Modal from '../../_modal/Modal';
import SearchMovie from '../../_search/SearchMovie';

import {
  FaSearch,
  FaHome,
  FaCompass,
  FaBook,
  FaChartBar,
} from 'react-icons/fa';

const generalLinks = [
  {
    id: 0,
    value: '/',
    label: 'Home',
    icon: <FaHome />,
  },
  {
    id: 1,
    value: '/discovery',
    label: 'Discovery',
    icon: <FaCompass />,
  },
  {
    id: 2,
    value: '/diary',
    label: 'Diary',
    icon: <FaBook />,
  },
  {
    id: 3,
    value: '/account-stats',
    label: 'Stats',
    icon: <FaChartBar />,
  },
];

export default function GeneralLinks() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <React.Fragment>
      <div className='w-full h-auto flex flex-col items-start justify-center gap-6'>
        <span className='text-neutral-400 text-xl font-medium tracking-wide'>
          General
        </span>

        <nav className='w-full h-auto flex flex-col items-start justify-center gap-6'>
          <button
            type='button'
            aria-label='Opens the search title modal'
            title='Open the search title modal'
            onClick={() => setIsModalOpen(true)}
            className='outline-none border-none cursor-pointer w-full h-10 flex items-center justify-start gap-2 text-neutral-500 text-lg font-normal tracking-wide py-1.5 px-3 rounded-md hover:bg-neutral-500/40 focus-visible:bg-neutral-500/40 transition-colors duration-300'
          >
            <span className='text-xl text-neutral-500'>
              <FaSearch />
            </span>
            &nbsp;Search
          </button>

          {generalLinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.value}
              className={({ isActive }) =>
                `outline-none cursor-pointer w-full h-10 flex items-center justify-start gap-2 text-lg font-normal tracking-wide py-1.5 px-3 rounded-md ${
                  isActive
                    ? 'border-r-2 border-amber-400 text-white bg-neutral-500/35'
                    : 'border-none text-neutral-500'
                } hover:bg-neutral-500/40 focus-visible:bg-neutral-500/40 transition-colors duration-300`
              }
            >
              {({ isActive }) => (
                <React.Fragment>
                  <span
                    className={`${
                      isActive ? 'text-amber-400' : 'text-neutral-500'
                    } text-xl`}
                  >
                    {link.icon}
                  </span>
                  &nbsp;{link.label}
                </React.Fragment>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <Modal
        isOpen={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
      >
        <SearchMovie onCloseModal={() => setIsModalOpen(false)} />
      </Modal>
    </React.Fragment>
  );
}
