import React from 'react';
import {
  FaPeopleGroup,
  FaBullseye,
  FaFileLines,
  FaExclamation,
  FaScrewdriverWrench,
  FaFolderOpen,
} from 'react-icons/fa6';
import { FaMobile } from 'react-icons/fa';
import { IoSettingsSharp } from 'react-icons/io5';
import { BsDoorOpenFill } from 'react-icons/bs';

const cards = [
  {
    title: 'Purpose',
    about:
      'This app is a personal project created to test and build my skills in React and its ecosystem. It`s designed as a showcase for my portfolio and to demonstrate my capabilities in web development. Please note that it`s not intended for production use and may not be 100% perfect, as it serves primarily as a learning and experimentation platform.',
    icon: <FaBullseye />,
  },
  {
    title: 'Usage',
    about:
      'The concept behind this app is to function as a digital diary for movie and series enthusiasts. It allows users to track the films and shows they`ve watched, and to record their personal ratings and reviews. This way, you can keep a detailed log of your viewing history and reflect on the ratings you believe each piece of media truly deserves.',
    icon: <FaFileLines />,
  },
  {
    title: 'How to use it',
    about:
      'For an optimal experience and precise tracking of your viewing data, it is recommended to create an account. This will allow you to add movies and series to your "viewlist," as well as rate them. Creating an account ensures that your preferences and ratings are saved and accessible each time you log in.',
    icon: <FaExclamation />,
  },
  {
    title: 'Accessible',
    about:
      'Even without creating an account, users can access public information about each movie and series. This includes detailed descriptions, trailers, and clips. This ensures that anyone can explore movie and series content, helping them decide whether to watch it on a streaming platform without needing to sign up.',
    icon: <BsDoorOpenFill />,
  },
  {
    title: 'Content',
    about:
      'The app features a curated collection of approximately 300 movie and series titles sourced from public databases. While this offers a broad overview, please note that some details may be incomplete, outdated, or inaccurate due to the nature of the sources.',
    icon: <FaFolderOpen />,
  },
  {
    title: 'Features',
    about:
      'This app includes a range of features designed to enhance your movie and series tracking experience. Users can create accounts to manage their viewing history by adding movies and series to a personal viewlist. They can rate each item and update or delete their ratings as needed. Additionally, users have the ability to sort and filter their viewlist based on various criteria. Profile management is also available, allowing users to edit their personal information for a more customized experience.',
    icon: <FaScrewdriverWrench />,
  },
  {
    title: 'Account managing',
    about:
      'On this page, authenticated users can manage their account details with ease. They have the option to add or update their profile picture, ensuring their account reflects their personal style. Users can also modify their username if they wish to change it from the initial choice made during account creation. Additionally, this page allows users to update their password, ensuring their account remains secure and personalized to their preferences.',
    icon: <IoSettingsSharp />,
  },
  {
    title: 'Mobile support',
    about:
      'I’ve made every effort to ensure that this app is both functional and visually appealing on smaller screens, such as mobile devices. Whether you`re on the go or using a compact screen, the design and usability of the app are optimized to provide a pleasant user experience.',
    icon: <FaMobile />,
  },
];

function AboutApp() {
  return (
    <div className='flex flex-col gap-12'>
      <h1 className='text-red-400 text-3xl font-bold tracking-wider'>
        About App
      </h1>

      <div className='grid grid-cols-3 gap-y-6 gap-x-6'>
        {cards.map(({ title, about, icon }, index) => (
          <div
            key={title}
            className='cursor-pointer group w-auto h-[360px] overflow-hidden relative flex flex-col gap-6 p-6 outline outline-1 bg-gradient-to-br from-transparent to-neutral-400/15 outline-neutral-400/50 rounded-md hover:scale-105 transition-all duration-300'
          >
            <h1 className='text-stone-200 text-lg font-medium tracking-wide group-hover:text-xl transition-all duration-300'>
              {title}
            </h1>

            <p className='text-stone-400 text-base tracking-wide group-hover:text-lg transition-all duration-300'>
              {about}
            </p>

            <span className='text-red-500 text-[180px] absolute rotate-[20deg] -z-[1] -right-12 -bottom-4 group-hover:-bottom-2 group-hover:-right-6 group-hover:text-[196px] group-hover:text-red-700 group-hover:opacity-50 transition-all duration-300'>
              {icon}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutApp;
