import { observer } from "mobx-react-lite";
import movieStore from "../../../store/movieStore";
import styles from './FavariteBotton.module.css'
import { Movie } from "../../../types/types";

type FavoriteButtonProps = {
  movie: Movie;
};

export const FavoriteButton = observer(({ movie }: FavoriteButtonProps) => {
  const isFavorite = movieStore.favorites.some((fav) => fav.id === movie.id);

  const handleClick = () => {
    if (isFavorite) {
      movieStore.removeFromFavorites(movie.id);
    } else {
      movieStore.addToFavorites(movie);
    }
  };

  return (
    <button className={styles.favorite_button} type="button" onClick={handleClick}>
      {isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
    </button>
  );
});
