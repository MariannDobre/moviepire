import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const StyledMovieResults = styled.li`
  width: 100%;
  padding-bottom: var(--padding-sm);
  border-bottom: 0.1rem solid var(--color-gray-dark);
  list-style: none;
`;

const Results = styled(Link)`
  display: flex;
  gap: 1.2rem;
  text-decoration: none;
`;

const ResultsDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const ResultsPoster = styled.img`
  width: 6.4rem;
  height: 9.6rem;
`;

const MovieTitle = styled.p`
  font-size: var(--font-size-md);
  color: var(--color-white);
  letter-spacing: var(--letter-spacing-xs);
  font-weight: var(--font-weight-semibold);
`;

const MovieYear = styled.span`
  font-size: var(--font-size-sm);
  color: var(--color-gray);
  font-weight: var(--font-weight-light);
`;

function MovieResults({ movie }) {
  const { id, movieName, movieYear, moviePoster } = movie;

  return (
    <StyledMovieResults>
      <Results to={`/title-id/${id}`}>
        <ResultsPoster
          src={moviePoster}
          alt='Movie poster.'
        />

        <ResultsDetails>
          <MovieTitle>{movieName}</MovieTitle>
          <MovieYear>{movieYear}</MovieYear>
        </ResultsDetails>
      </Results>
    </StyledMovieResults>
  );
}

export default MovieResults;
