import { useState, useEffect, useMemo } from 'react';
import classes from "../assets/styles/movieItem.module.css"
import AppLoading from './common/AppLoading';
import IMovie, { IGenre } from '../model/movie';
import ICredit from '../model/credit';
import { fetchMovieCredits } from "../apis/movie";
import { fetchImages } from "../apis/images"
import { convertFromByteArrayToSrring } from "../utils/index";

interface IProps {
  movie: IMovie
}

const AppMovieItem = (props: IProps) => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState<Array<IGenre>>([]);
  const [credit, setCredits] = useState<Partial<ICredit>>({});

  useEffect(() => {
    getCredits();
    fetchPosterImages();
  }, []);

  const fetchPosterImages = async () => {
    try {
      setLoading(true);
      const img = await fetchImages(props.movie.poster_path, "w500");
      setImg(convertFromByteArrayToSrring(img.data))
    } finally {
      setLoading(false);
    }
  }

  const getCredits = async() => {
    const { data } = await fetchMovieCredits(props.movie.id);
    setCredits(data);
  }

  const displayTopCasts = useMemo(() => {
    return credit.cast?.sort((a, b) => a.popularity - b.popularity).reverse().filter((c, index) => index < 10).map(c => c.name).join(" , ")
  }, [credit])

  return (
    <>
      <div className={classes['movie-item-card']}>
        <div className={classes['movie-item-image']}>
          { !loading && <img src={img} alt="" height="550" /> }
          { loading && <AppLoading /> }
        </div>
        <div className={classes['movie-item-info']}>
          <div className={classes['movie-item-info-list']}>
            <div className={classes['key']}>
              Budget
            </div>
            <div className={classes.value}>
              ${ props.movie.budget }
            </div>
          </div>
          <div className={classes['movie-item-info-list']}>
            <div className={classes.key}>
              Revenue
            </div>
            <div className={classes.value}>
              ${ props.movie.revenue }
            </div>
          </div>
          <div className={classes['movie-item-info-list']}>
            <div className={classes.key}>
            Release Date
            </div>
            <div className={classes.value}>
              { props.movie.release_date }
            </div>
          </div>
          <div className={classes['movie-item-info-list']}>
            <div className={classes.key}>
              Runtime
            </div>
            <div className={classes.value}>
              { (props.movie.runtime / 60).toFixed(0) }h { (props.movie.runtime % 60)}m
            </div>
          </div>
          <div className={classes['movie-item-info-list']}>
            <div className={classes.key}>
              Score
            </div>
            <div className={classes.value}>
              { props.movie.vote_average } ({props.movie.vote_count} votes)
            </div>
          </div>
          <div className={classes['movie-item-info-list']}>
            <div className={classes.key}>
              Genres
            </div>
            <div className={classes.value}>
              { props.movie.genres.map(gen => gen.name).join(", ") }
            </div>
          </div>
          <div className={classes['movie-item-info-list']}>
            <div className={classes.key}>
              IMDB Link
            </div>
            <div className={classes.value}>
              <a href={`https://www.imdb.com/title/${props.movie.imdb_id}`} target="_blank">Link</a>
            </div>
          </div>
          <div className={classes['movie-item-info-list']}>
            <div className={classes.key}>
              Homepage Link
            </div>
            <div className={classes.value}>
              <a href={props.movie.homepage} target="_blank">Link</a>
            </div>
          </div>
        </div>
      </div>
      <div className={classes['movie-item-desc']}>
        { props.movie.overview }
      </div>
      <div className={classes['movie-item-credit']}>
        <h1 className={classes['movie-item-credit-title']}>
          Credit:
        </h1>
        { displayTopCasts }
      </div>
    </>
  )
}

export default AppMovieItem