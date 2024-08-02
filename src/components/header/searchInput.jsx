import React, { startTransition, useRef, useState } from 'react';
import { useMoviesByTitle } from '../../hooks/useMoviesByTitle';
import { useOutsideClick } from '../../hooks/useOutsideClick';

import styled from 'styled-components';
import MovieResults from '../movies/movieResults';

const SearchQuery = styled.input`
  border: none;
  outline: none;
  border-radius: calc(var(--border-rounded-xs) / 2);
  padding: calc(var(--padding-lg) / 2) var(--padding-sm);
  width: 56rem;
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--letter-spacing-xs);
  color: var(--color-black-light);
  background-color: var(--color-white);
  font-size: var(--font-size-sm);
  transition: all 0.35s ease;

  &::placeholder {
    color: var(--color-black-light);
    font-weight: var(--font-weight-medium);
  }

  &:focus {
    width: 64rem;
    border: 0.25rem solid var(--color-main-600);
    outline: none;
    background-color: rgba(255, 255, 255, 0.925);
  }
`;

const ResultsContainer = styled.ul`
  position: absolute;
  top: 5.6rem;
  left: 56.9rem;
  width: 64rem;
  z-index: 50;
  background-color: var(--color-black-light);
  padding: var(--padding-sm);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.8rem;
  border-radius: 0 0 calc(var(--border-rounded-xs) / 2)
    calc(var(--border-rounded-xs) / 2);
  box-shadow: 0 0 1.6rem 0.4rem rgba(0, 0, 0, 0.5);
`;

const ResultsHeading = styled.p`
  color: var(--color-gray);
  font-size: var(--font-size-lg);
  letter-spacing: var(--letter-spacing-xs);
  word-spacing: var(--word-spacing-xs);
`;

const ResultsBody = styled.span`
  color: var(--color-gray);
  font-size: var(--font-size-lg);
  letter-spacing: var(--letter-spacing-xs);
  word-spacing: var(--word-spacing-xs);

  strong {
    color: var(--color-main-600);
  }
`;

const ResultsCount = styled.span`
  color: var(--color-gray);
  font-size: var(--font-size-sm);
  letter-spacing: var(--letter-spacing-xs);
  word-spacing: var(--word-spacing-xs);

  strong {
    color: var(--color-main-600);
  }
`;

function SearchInput() {
  const searchBarRef = useRef();
  const resultsRef = useRef();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { movies } = useMoviesByTitle(searchQuery);

  function handleFocus() {
    setIsSearching((isSearching) => !isSearching);
  }

  function closeSearchBar() {
    setIsSearching(false);
  }

  function clearSearchBar() {
    setSearchQuery('');
  }

  useOutsideClick(searchBarRef, closeSearchBar);

  return (
    <>
      <SearchQuery
        ref={searchBarRef}
        type='text'
        placeholder='Search for a title'
        value={searchQuery}
        onChange={(e) => startTransition(() => setSearchQuery(e.target.value))}
        onFocus={handleFocus}
      />
      {isSearching && (
        <ResultsContainer>
          <ResultsHeading>
            {searchQuery?.length < 1 ? (
              <ResultsBody>Start searching by movie title.</ResultsBody>
            ) : (
              <ResultsBody>
                No results found for <strong>{searchQuery}</strong>.
              </ResultsBody>
            )}
          </ResultsHeading>
        </ResultsContainer>
      )}

      {movies?.length > 0 && (
        <ResultsContainer
          ref={resultsRef}
          onClick={() => {
            clearSearchBar();
            closeSearchBar();
          }}
        >
          {movies?.map((movie) => (
            <MovieResults
              key={movie.id}
              movie={movie}
            />
          ))}
          {movies?.length && (
            <ResultsCount>
              <strong>{movies?.length}</strong>&nbsp;
              {movies?.length === 1 ? 'result was' : 'results were'}
              &nbsp;found&nbsp;for&nbsp;
              <strong>{searchQuery}</strong>
            </ResultsCount>
          )}
        </ResultsContainer>
      )}
    </>
  );
}

export default SearchInput;
