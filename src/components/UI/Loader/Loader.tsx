import { observer } from "mobx-react-lite";
import styles from "./Loader.module.css";

export const Loader = observer(() => {
  return <div className={styles.loader}></div>;
});
