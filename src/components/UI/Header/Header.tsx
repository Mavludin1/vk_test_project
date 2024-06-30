import { observer } from "mobx-react-lite";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { Search } from "../Search/Search";

export const Header = observer(() => {
  return (
    <div className={styles.header}>
      <Link className={styles.link} to={"/"}>
        MyLogo{")"}
      </Link>
      <Search />
    </div>
  );
});
