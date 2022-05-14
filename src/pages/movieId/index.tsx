import React, { useEffect, useState } from 'react'
import AppHeader from '../../components/common/AppHeader';
import AppButton from '../../components/common/AppButton';
import AppMovieItem from '../../components/AppMovieItem';
import classes from "../../assets/styles/moviePage.module.css"
import IMovie from '../../model/movie';
import { useParams, NavLink } from 'react-router-dom';
import { fetchMovieById } from "../../apis/movie";

const MoviePage = () => {
  const [movie, setMovie]: any = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetchMovieHandler();
  }, []);

  const fetchMovieHandler = async () => {
    const { data } = await fetchMovieById(Number(id));
    setMovie(data);
  }

  if(!movie) return <div></div>

  return (
    <>
      <AppHeader>
        <div className={classes['header-container']}>
          <NavLink to="/">
            <AppButton>
              Back
            </AppButton>
          </NavLink>
          <div className={classes['movie-info']}>
            <h1 className={classes.title}>{ movie.title }</h1>
            <h3 className={classes['sub-title']}>{ movie.tagline }</h3>
          </div>
        </div>
      </AppHeader>
      { movie.id && <AppMovieItem movie={movie}/> }
    </>
  )
}

export default MoviePage