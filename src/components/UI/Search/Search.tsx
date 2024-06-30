import { ChangeEvent, useState } from "react";
import { observer } from "mobx-react-lite";
import styles from "./Search.module.css";
import movieStore from "../../../store/movieStore";
import { useLocation } from "react-router-dom";
import classNames from "classnames";

export const Search = observer(() => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (debounceTimeout) clearTimeout(debounceTimeout);

    const timeout = setTimeout(() => {
      movieStore.getMovieSearch(encodeURIComponent(value));
    }, 500);

    setDebounceTimeout(timeout);
  };

  const lacation = useLocation();

  return (
    <div
      className={classNames(styles.search_container, {
        [styles.none]: lacation.pathname !== "/",
      })}
    >
      <input
        className={styles.search_input}
        type="text"
        placeholder="Введите название фильма"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
});
