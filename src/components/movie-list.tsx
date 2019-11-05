import React from 'react';
import { Card, StyledAction, StyledBody } from 'baseui/card';
import { Heading, HeadingLevel } from 'baseui/heading';
import { Button } from 'baseui/button';
import { Link } from '@reach/router';
import { Movie } from './search-page';

const imageCdnEndpoint = 'https://image.tmdb.org/t/p/w500';

export default ({ listTitle, movies }: { listTitle: string; movies: Movie[] }) => (
  <div style={{ marginTop: '50px' }}>
    <HeadingLevel>
      <Heading styleLevel={4}>{listTitle}</Heading>
    </HeadingLevel>

    {movies.map(({ id, title, popularity, vote_average, vote_count, overview, backdrop_path }) => (
      <Card
        key={id}
        headerImage={backdrop_path ? `${imageCdnEndpoint}/${backdrop_path}` : ''}
        overrides={{ Root: { style: { maxWidth: '500px', marginBottom: '40px' } } }}
        title={title}
      >
        <StyledBody>
          {overview.length > 240 ? `${overview.slice(0, 235)}.....` : overview}
        </StyledBody>
        <StyledAction>
          <Link to={`movie/${id}`}>
            <Button $as="a">Explore</Button>
          </Link>
        </StyledAction>
      </Card>
    ))}
  </div>
);
