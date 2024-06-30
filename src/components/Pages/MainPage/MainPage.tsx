import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import styles from "./MainPage.module.css";
import movieStore from "../../../store/movieStore";
import { Filters } from "../../UI/FIlter/Filter";
import { MovieCartList } from "../../UI/MovieCartList/MovieCartList";
import { Pagination } from "../../UI/Pagination/Pagination";
import { Loader } from "../../UI/Loader/Loader";

export const MainPage = observer(() => {
  const {
    getMovies,
    movies,
    loadNextPage,
    loadPreviousPage,
    currentPage,
    totalPageCount,
    setCurrentPage,
  } = movieStore;

  useEffect(() => {
    getMovies();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <Filters />
      </div>
      {movies.length ? <MovieCartList list={movies} /> : <Loader />}
      <div className={styles.buttons}>
        <Pagination
          currentPage={currentPage}
          totalPageCount={totalPageCount}
          onPageChange={handlePageChange}
          onNextPage={loadNextPage}
          onPrevPage={loadPreviousPage}
        />
      </div>
    </div>
  );
});

export default MainPage;
