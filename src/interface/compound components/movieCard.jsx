import React, { createContext } from 'react';
import { useFeaturedMovies } from '../../hooks/useFeaturedMovies';

// 1. Create a context.
const MovieCardContext = createContext();

// 2. Create the parent component.
function MovieCard({ children }) {
  const { data, isPending } = useFeaturedMovies();

  return (
    <MovieCardContext.Provider value={{ data, isPending }}>
      <div>{children}</div>
    </MovieCardContext.Provider>
  );
}

// 3. Create the child components that help with the tasks.

// 4. Add the child components as properties to the parent component.

export default MovieCard;
