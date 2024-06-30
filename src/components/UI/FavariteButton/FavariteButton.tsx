import { observer } from "mobx-react-lite";
import movieStore from "../../../store/movieStore";
import styles from "./FavariteBotton.module.css";
import { Movie } from "../../../types/types";
import { useLocation } from "react-router-dom";

type FavoriteButtonProps = {
  movie: Movie;
};

export const FavoriteButton = observer(({ movie }: FavoriteButtonProps) => {
  const isFavorite = movieStore.favorites.some((fav) => fav.id === movie?.id);
  const location = useLocation();

  const handleClick = () => {
    if (isFavorite) {
      movieStore.removeFromFavorites(movie.id);
    } else {
      movieStore.addToFavorites(movie);
    }
  };

  return (
    <svg
      onClick={handleClick}
      xmlns="http://www.w3.org/2000/svg"
      width={location.pathname !== "/" ? "30" : "22"}
      height={location.pathname !== "/" ? "28" : "20"}
      viewBox="0 0 22 20"
      fill={isFavorite ? "#00bfff" : "none"}
      stroke={"#00bfff"}
      strokeWidth="2"
    >
      <path d="M11 1.25955L13.3973 6.11702C13.6886 6.70731 14.2518 7.11645 14.9032 7.2111L20.2637 7.99004L16.3848 11.771C15.9134 12.2305 15.6983 12.8925 15.8096 13.5413L16.7253 18.8802L11.9307 16.3595C11.348 16.0532 10.652 16.0532 10.0693 16.3595L5.27471 18.8802L6.1904 13.5413C6.30167 12.8925 6.08658 12.2305 5.6152 11.7711L1.73628 7.99004L7.09682 7.2111C7.74824 7.11645 8.31137 6.70731 8.6027 6.11702L11 1.25955Z" />
    </svg>
  );
});
