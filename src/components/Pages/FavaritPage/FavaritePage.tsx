import { observer } from "mobx-react-lite";
import styles from './FavaritePage.module.css'
import { MovieCartList } from "../../UI/MovieCartList/MovieCartList";
import movieStore from "../../../store/movieStore";

export const FavaritePage = observer(() => {
  const { favorites } = movieStore;
  return (
    <div className={styles.container}>
      <MovieCartList list={favorites} />
    </div>
  );
});
