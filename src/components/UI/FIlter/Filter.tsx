import { ChangeEvent, useState } from "react";
import { observer } from "mobx-react-lite";
import styles from "./Filter.module.css";
import movieStore from "../../../store/movieStore";

const genres = [
  {
    id: 0,
    name: "ужасы",
  },
  {
    id: 1,
    name: "драма",
  },
  {
    id: 2,
    name: "комедия",
  },
  {
    id: 3,
    name: "аниме",
  },
  {
    id: 4,
    name: "мультфильм",
  },
  {
    id: 5,
    name: "фэнтези",
  },
];

export const Filters = observer(() => {
  const {
    getFilter,
    filters,
    deleteFilter,
    setRatingRange,
    setYearRange,
    ratingRange,
    yearRange,
  } = movieStore;

  const [minRating, setMinRating] = useState(ratingRange[0]);
  const [maxRating, setMaxRating] = useState(ratingRange[1]);
  const [minYear, setMinYear] = useState(yearRange[0]);
  const [maxYear, setMaxYear] = useState(yearRange[1]);

  const [ratingTimeout, setRatingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [yearTimeout, setYearTimeout] = useState<NodeJS.Timeout | null>(null);

  const isCheckedFilters = filters.map(
    (filter: string) => filter.split("=")[1]
  );

  const getControllCheckbox = (data: string, type: string) => {
    if (isCheckedFilters.includes(data)) {
      deleteFilter(data, type);
    } else getFilter(data, type);
  };

  const handleRatingChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: "min" | "max"
  ) => {
    const value = Number(e.target.value);
    if (type === "min") {
      setMinRating(value);
    } else {
      setMaxRating(value);
    }

    if (ratingTimeout) clearTimeout(ratingTimeout);

    const timeout = setTimeout(() => {
      setRatingRange(minRating, maxRating);
    }, 500);

    setRatingTimeout(timeout);
  };

  const handleYearChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: "min" | "max"
  ) => {
    const value = Number(e.target.value);
    if (type === "min") {
      setMinYear(value);
    } else {
      setMaxYear(value);
    }

    if (yearTimeout) clearTimeout(yearTimeout);

    const timeout = setTimeout(() => {
      setYearRange(minYear, maxYear);
    }, 500);

    setYearTimeout(timeout);
  };

  return (
    <div className={styles.container}>
      <span className={styles.title}>Фильтры</span>
      <div className={styles.container_filters}>
        <div className={styles.filters}>
          <span className={styles.name}>По жанрам</span>
          <div className={styles.filter}>
            {genres.map((genre) => (
              <div className={styles.input} key={genre.id}>
                <input
                  onChange={() =>
                    getControllCheckbox(genre.name, "genres.name")
                  }
                  checked={isCheckedFilters.includes(genre.name)}
                  id={genre.name}
                  type="checkbox"
                />
                <label htmlFor={genre.name}>{genre.name}</label>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.filters}>
          <span className={styles.name}>По рейтингу</span>
          <div className={styles.filter}>
            <div className={styles.input}>
              <label htmlFor="minRating">Минимальный рейтинг</label>
              <input
                type="range"
                id="minRating"
                min="0"
                max="10"
                step={0.1}
                value={minRating}
                onChange={(e) => handleRatingChange(e, "min")}
              />
              <span>{minRating}</span>
            </div>
            <div className={styles.input}>
              <label htmlFor="maxRating">Максимальный рейтинг</label>
              <input
                type="range"
                id="maxRating"
                min="0"
                max="10"
                step={0.1}
                value={maxRating}
                onChange={(e) => handleRatingChange(e, "max")}
              />
              <span>{maxRating}</span>
            </div>
          </div>
        </div>
        <div className={styles.filters}>
          <span className={styles.name}>По годам</span>
          <div className={styles.filter}>
            <div className={styles.input}>
              <label htmlFor="minYear">Минимальный год</label>
              <input
                type="range"
                id="minYear"
                min="1990"
                max={new Date().getFullYear()}
                value={minYear}
                onChange={(e) => handleYearChange(e, "min")}
              />
              <span>{minYear}</span>
            </div>
            <div className={styles.input}>
              <label htmlFor="maxYear">Максимальный год</label>
              <input
                type="range"
                id="maxYear"
                min="1990"
                max={new Date().getFullYear()}
                value={maxYear}
                onChange={(e) => handleYearChange(e, "max")}
              />
              <span>{maxYear}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
