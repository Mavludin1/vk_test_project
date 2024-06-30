import { observer } from "mobx-react-lite";
import styles from "./MovieCart.module.css";
import { Link } from "react-router-dom";
import { Movie } from "../../../types/types";
import { FavoriteButton } from "../FavariteButton/FavariteButton";

type MovieCartProps = {
  data: Movie;
};
export const MovieCart = observer(({ data }: MovieCartProps) => {
  const { name, year, shortDescription, rating, poster, id, alternativeName } =
    data;

  return (
    <div className={styles.container}>
      <div className={styles.favarite}>
        <FavoriteButton movie={data} />
      </div>
      <Link className={styles.link_container} to={`/movie/${id}`}>
        <div className={styles.image_container}>
          {poster && poster.previewUrl !== null ? (
            <img
              className={styles.img}
              src={poster.previewUrl}
              alt="Банер фильма"
            />
          ) : (
            <div className={styles.no_poster}>Нет постера</div>
          )}

          <span className={styles.raiting}>{rating.imdb}</span>
          <p className={styles.preview_text}>{shortDescription}</p>
        </div>
        <div className={styles.movie_info}>
          <h3 className={styles.movie_info_title}>
            {name ? name : alternativeName}
          </h3>
          <p className={styles.movie_info_year}>Год выпуска {year}</p>
        </div>
      </Link>
    </div>
  );
});
