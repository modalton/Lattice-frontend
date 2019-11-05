import React, { useEffect, useState } from 'react';
import * as t from 'io-ts';
import check from '../modules/check';
import { Search } from 'baseui/icon';
import { Input } from 'baseui/input';
import { Heading, HeadingLevel } from 'baseui/heading';
import MovieList from './movie-list';

const movieListResp = t.array(
  t.type({
    id: t.number,
    title: t.string,
    popularity: t.number,
    vote_count: t.number,
    vote_average: t.number,
    overview: t.string,
    poster_path: t.union([t.string, t.null]),
    backdrop_path: t.union([t.string, t.null])
  })
);

export type Movie = t.TypeOf<typeof movieListResp>[0];

export default () => {
  const [movieInput, setMovieInput] = useState<string>('');
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [searchedMovies, setSearchedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const req = async () => {
      try {
        const resp = await (await fetch(`/movie/popular`)).json();
        const validResp = check(resp, movieListResp);
        setPopularMovies(validResp);
      } catch (err) {
        console.error(err);
      }
    };
    req();
  }, []);

  useEffect(() => {
    let preempted = false;
    if (movieInput === '') {
      return;
    }
    const req = async () => {
      const resp = await (await fetch(`/search/movie?query=${movieInput}`)).json();
      const validResp = check(resp, movieListResp);
      if(!preempted){
        setSearchedMovies(validResp);
      }
    };
    req();
    return () => { preempted = true }
  }, [movieInput]);

  return (
    <div style={{ margin: '0px auto', maxWidth: '500px' }}>
      <HeadingLevel>
        <Heading styleLevel={2}>Lattice Take Home</Heading>
      </HeadingLevel>
      <Input
        endEnhancer={<Search size="18px" />}
        placeholder="Search Movie Titles"
        onChange={({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
          setMovieInput(value)
        }
      />
      {movieInput === '' ? (
        <MovieList listTitle="Popular" movies={popularMovies} />
      ) : (
        <MovieList listTitle={`Movie Search: '${movieInput}'`} movies={searchedMovies} />
      )}
    </div>
  );
};
