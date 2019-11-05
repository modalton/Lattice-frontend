import React, { useEffect, useState } from 'react';
import { Link } from '@reach/router';
import { Card, StyledAction, StyledBody } from 'baseui/card';
import ChevronLeft from 'baseui/icon/chevron-left';
import { Button } from 'baseui/button';
import { Tag } from 'baseui/tag';
import * as t from 'io-ts';
import check from '../modules/check';

const imageCdnEndpoint = 'https://image.tmdb.org/t/p/w200';

const movieDetailsResp = t.type({
  revenue: t.number,
  runtime: t.union([t.number, t.null]),
  title: t.string,
  budget: t.number,
  poster_path: t.union([t.string, t.null]),
  genres: t.array(t.type({ name: t.string })),
  imdb_id: t.string,
  overview: t.string,
  vote_average: t.number,
  vote_count: t.number,
  status: t.string
});

type MovieDetails = t.TypeOf<typeof movieDetailsResp>;

// any cast due to known reach router limitation https://github.com/reach/router/issues/141
export default ({ movieId }: any) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

  useEffect(() => {
    const req = async () => {
      try {
        const resp = await (await fetch(`/movie/${movieId}`)).json();
        const validResp = check(resp, movieDetailsResp);
        setMovieDetails(validResp);
      } catch (err) {
        console.error(err);
      }
    };
    req();
  }, []);

  const displayFact = (key: string, value: React.ReactNode) => (
    <div>
      <b>{`${key}: `}</b>
      {value}
    </div>
  );

  return (
    movieDetails && (
      <div>
        <StyledAction>
          <Link to="/">
            <Button $as="a">
              <ChevronLeft />
              Back
            </Button>
          </Link>
        </StyledAction>
        <Card
          title={movieDetails.title}
          overrides={{ Root: { style: { maxWidth: '800px', margin: '0px auto' } } }}
        >
          <StyledBody>
            <div>
              <div
                style={{
                  width: '55%',
                  verticalAlign: 'top',
                  marginRight: '11%',
                  display: 'inline-block'
                }}
              >
                {displayFact(
                  'Rating',
                  `${movieDetails.vote_average}/10 (${movieDetails.vote_count} votes)`
                )}
                {movieDetails.runtime && displayFact('Runtime', `${movieDetails.runtime} min.`)}
                {displayFact('Budget', `$${movieDetails.budget}`)}
                {movieDetails.status === 'Released' &&
                  displayFact('Revenue', `$${movieDetails.revenue}`)}
                {displayFact('Overview', movieDetails.overview)}
                {displayFact(
                  'Genre',
                  movieDetails.genres.map(({ name }) => (
                    <Tag closeable={false} kind="neutral">
                      {name}
                    </Tag>
                  ))
                )}
              </div>
              <div style={{ width: '33%', display: 'inline-block' }}>
                <img src={`${imageCdnEndpoint}/${movieDetails.poster_path}`} />
              </div>
            </div>
          </StyledBody>
          <StyledAction>
            <Button
              $as="a"
              href={`https://www.imdb.com/title/${movieDetails.imdb_id}`}
              target="_blank"
            >
              IMBD Page
            </Button>
          </StyledAction>
        </Card>
      </div>
    )
  );
};
