import { useEffect, useState, useCallback } from 'react';
import classes from "../assets/styles/homePage.module.css"
import AppHeader from '../components/common/AppHeader';
import AppSearchBox from '../components/AppSearchBox';
import AppLoading from '../components/common/AppLoading';
import AppMovieCard from '../components/AppMovieCard';
import { fetchMovies, fetchMovieGenres } from '../apis/movie';
import { dateFormat } from '../utils';
import IMovieList from '../model/movieList';
import { IGenre } from '../model/movie';

const Home = () => {
  const [movies, setMovies] = useState<Array<IMovieList>>([]);
  const [pageNum, setPageNum] = useState(1); 
  const [genres, setGenres] = useState<Array<IGenre>>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    fetchMoviesHandler();
    fetchMovieGenresHandler();
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [pageNum])

  const fetchMovieGenresHandler = async () => {
    const { data } = await fetchMovieGenres();
    setGenres(data.genres);
  }

  const fetchMoviesHandler = async (query: Object = {}) => {
    try {
      setLoading(true);
      const { data } = await fetchMovies({ page: pageNum, ...query });
      setMovies(data.results);
    } finally {
      setLoading(false);
    }
  }

  const previousPage = async () => {
    if(pageNum === 1) return;
    setPageNum(pageNum - 1)
  }
  
  const nextPage = async () => {
    setPageNum(pageNum + 1)
  }

  const searchHandler = useCallback(async (newDate: Array<Date>) => {
    if (!newDate) {
      newDate = [new Date('1990-11-02'), new Date()]
    }
    const [GTE, LTE] = newDate;
    await fetchMoviesHandler({
      "release_date.gte": dateFormat(GTE),
      "release_date.lte": dateFormat(LTE)
    })
  }, []);

  return (
    <>
      <AppHeader>
        <div className={classes['home-header-container']}>
          <div className={classes.flex}>
            Search by release date:
            <AppSearchBox 
              searchHandler={searchHandler}
            />
          </div>
        </div>
      </AppHeader>
      {
        movies.length === 0 && <div className="no-data" v-else-if="movies.length === 0">
        No Data Matching
      </div>
      }
      {
        loading && <AppLoading /> || <div className={classes['movie-container']}>
        {
          movies.map(movie => (
            <AppMovieCard
              key={movie.id}
              movie={movie}
              genres={genres}
            />
          ))
        }
      </div>
      }
      {
        movies.length !== 0 && 
        <div className={classes.pagination}>
          <div className={classes.link} onClick={previousPage}>Previous Page</div>
          <div className={classes.link} onClick={nextPage}>Next Page</div>
        </div>
      }
      {
        movies.length !== 0 && <div className={classes['items-conter']}>Showing {pageNum === 1 ? 1 : pageNum * 10 + 1}-{(movies.length) + (10 * (pageNum - 1))} Result</div>
      }
      
    </>
  )
}

export default Home