import 'regenerator-runtime/runtime';

import React from 'react';
import { render } from 'react-dom';
import ThemeProvider from './components/theme-provider';
import { RouteComponentProps, Router } from '@reach/router';
import SearchPage from './components/search-page';
import MoviePage from './components/movie-page';

// Work around due to known reach router limitation https://github.com/reach/router/issues/141
const RouterPage = (props: { component: JSX.Element } & RouteComponentProps) => props.component;

render(
  <ThemeProvider>
    <Router>
      <RouterPage path="/" component={<SearchPage />} />
      <MoviePage path="movie/:movieId" />
    </Router>
  </ThemeProvider>,
  document.getElementById('root')
);
