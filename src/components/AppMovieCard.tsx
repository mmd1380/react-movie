import { useEffect, useState } from 'react'
import { IGenre } from '../model/movie'
import IMovieList from '../model/movieList'
import AppLoading from "./common/AppLoading"
import classes from "../assets/styles/movieCard.module.css"
import { convertFromByteArrayToSrring } from '../utils/index';
import { fetchImages } from '../apis/images';
import { NavLink } from "react-router-dom";

interface IProps {
  movie: IMovieList,
  genres: Array<IGenre>
}

const AppMovieCard = (props: IProps) => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);

  const getGenres = () => {
    return props.genres.filter(gen => props.movie.genre_ids.includes(gen.id)).map(gen => gen.name).join(", ")
  }

  useEffect(() => {
    fetchImagesHandler(props.movie);
  }, [])

  const fetchImagesHandler = async(item: IMovieList) => {
    try {
      setLoading(true);
      const img = await fetchImages(item.backdrop_path);
      setImg(convertFromByteArrayToSrring(img.data));
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
    <NavLink to={`/${props.movie.id }`} >
      <div className={classes['movie-card']} >
        <div className={classes['movie-card-image']}>
          { !loading && <img className={classes.image} src={img} /> }
          { loading && <AppLoading /> }
        </div>
        <div className={classes['movie-card-info']}>
          <h1 className={classes.title}>{ props.movie.title }</h1>
          <div className={classes.date}>{ props.movie.release_date }</div>
          <div className={classes.genres}>{ getGenres() }</div>
        </div>
      </div>
    </NavLink>
      
    </>
  )
}

export default AppMovieCard