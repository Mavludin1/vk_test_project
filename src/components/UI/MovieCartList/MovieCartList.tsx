// import { observer } from "mobx-react-lite";
// import styles from "./MovieCartList.module.css";
// import { Movie } from "../../types/types";
// import { MovieCart } from "../MovieCart/MovieCart";

// type MovieCartListProps = {
//   list: Movie[];
// };

// export const MovieCartList = observer(({ list }: MovieCartListProps) => {
//   return (
//     <div className={styles.container}>
//       {list?.map((movie) => {
//         return <MovieCart key={movie.id} data={movie} />;
//       })}
//     </div>
//   );
// });

import { observer } from "mobx-react-lite";
import styles from "./MovieCartList.module.css";
import { Movie } from "../../../types/types";
import { MovieCart } from "../MovieCart/MovieCart";

type MovieCartListProps = {
  list: Movie[];
};

export const MovieCartList = observer(({ list }: MovieCartListProps) => {
  return (
    <div className={styles.container}>
      {list?.map((movie) => {
        return <MovieCart key={movie.id} data={movie} />;
      })}
    </div>
  );
});
