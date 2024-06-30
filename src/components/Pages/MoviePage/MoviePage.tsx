import { observer } from "mobx-react-lite";
import styles from "./MoviePage.module.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import movieStore from "../../../store/movieStore";
import { PersonCartList } from "../../UI/PersonCartList/PersonCartList";
import { FavoriteButton } from "../../UI/FavariteButton/FavariteButton";

export const MoviePage = observer(() => {
  const { getMovie, movieActors, movie } = movieStore;
  const { id } = useParams();

  useEffect(() => {
    getMovie(Number(id));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        <img
          className={styles.img}
          src={movie?.poster.previewUrl}
          alt="Постер фильма"
        />
        <span className={styles.age_limit}>{movie?.ageRating}+</span>
      </div>
      <div className={styles.content}>
        <div className={styles.links}>
          <div className={styles.names}>
            <h1 className={styles.title}>{movie?.name}</h1>
            <h5 className={styles.eng_title}>{movie?.alternativeName}</h5>
          </div>
          <div className={styles.favarite}>{movie ? <FavoriteButton movie={movie} /> : <></>}</div>
          <div className={styles.watchability}>
            {movie?.watchability.items?.map((item) => (
              <a
                className={styles.link}
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noreferrer"
              >
                <span className={styles.link_text}>{item.name}</span>
                <img className={styles.link_img} src={item.logo.url} />
              </a>
            ))}
            <span className={styles.raiting}>
              Рейтинг:{" "}
              <span className={styles.raiting_value}>{movie?.rating.imdb}</span>
            </span>
          </div>
        </div>
        <div className={styles.movie_info}>
          <h3 className={styles.about_movie_title}>О фильме</h3>
          <h5 className={styles.about_movie_value}>
            Год производства <span className={styles.value}>{movie?.year}</span>
          </h5>
          <h5 className={styles.about_movie_value}>
            Страна производства{" "}
            <span className={styles.value}>{movie?.countries[0].name}</span>
          </h5>
          <h5 className={styles.about_movie_value}>
            Жанр{" "}
            <span className={styles.value}>
              {movie?.genres.map((el, index) => (
                <span key={index}>
                  {el.name}
                  {index < movie.genres.length - 1 ? ", " : ""}
                </span>
              ))}
            </span>
          </h5>
          <h5 className={styles.about_movie_value}>
            Бюджет{" "}
            <span className={styles.value}>
              {movie?.budget.value} {movie?.budget.currency}
            </span>
          </h5>
        </div>
        <div className={styles.actures}>
          <h3 className={styles.acture}>Актеры</h3>
          <PersonCartList list={movieActors || []} />
        </div>
      </div>
    </div>
  );
});
