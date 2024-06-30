import { observer } from "mobx-react-lite";
import styles from "./PersonCart.module.css";
import { Link } from "react-router-dom";

type PersonCartProps = {
  id: number;
  name: string;
  role?: string;
  imageUrl: string;
};

export const PersonCart = observer(
  ({ id, name, role, imageUrl }: PersonCartProps) => {
    if (!role) {
      role = "";
    }
    return (
      <Link className={styles.container} to={`/preson/${id}`}>
        <img className={styles.img} src={imageUrl} alt="Фото актера" />
        <div className={styles.container_info}>
          <h3 className={styles.name}>Имя: {name}</h3>
          <h3 className={styles.role}>Роль: {role}</h3>
        </div>
      </Link>
    );
  }
);
