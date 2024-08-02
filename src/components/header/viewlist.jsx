import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { useViewedMovies } from '../../hooks/useViewedMovies';

import styled from 'styled-components';
import { BsFillBookmarkPlusFill } from 'react-icons/bs';

import MiniLoader from '../loaders/miniLoader';

const ViewlistLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  color: var(--color-white);
  text-decoration: none;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--letter-spacing-xs);
  padding: calc(var(--padding-md) / 2) var(--padding-md);
  border-radius: calc(var(--border-rounded-xs) / 2);
  transition: all 0.35s ease;

  svg {
    font-size: var(--font-size-md);
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--border-rounded-full);
    color: var(--color-main-400);
    background-color: var(--color-main-950);
    font-weight: var(--font-weight-semibold);
    padding: calc(var(--padding-xs) / 2) var(--padding-sm);
    font-size: var(--font-size-xs);
  }

  &:hover,
  &:active {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

function Viewlist() {
  const { user, isAuthenticated } = useUser();
  const userId = user?.id;
  const { viewedMovies } = useViewedMovies(userId);

  return (
    <>
      {isAuthenticated ? (
        <ViewlistLink to='/viewlist'>
          <>
            <BsFillBookmarkPlusFill />
            Viewlist&nbsp;
            <span>{viewedMovies?.length}</span>
            {/* <span>0</span> */}
          </>
        </ViewlistLink>
      ) : null}
    </>
  );
}

export default Viewlist;
