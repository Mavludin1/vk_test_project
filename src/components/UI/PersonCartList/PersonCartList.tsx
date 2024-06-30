import { observer } from "mobx-react-lite";
import styles from "./PersonCartList.module.css";
import { useState } from "react";
import { Person } from "../../../types/types";
import { PersonCart } from "../PersonCart/PersonCart";

type PersonCartListProps = {
  list: Person[];
};

export const PersonCartList = observer(({ list = [] }: PersonCartListProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextPerson = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === list?.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevPerson = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? list?.length - 1 : prevIndex - 1
    );
  };

  const listTransform = `translateX(-${currentIndex * (100 / list?.length)}%)`;

  return (
    <div className={styles.carousel}>
      <div
        className={styles.personCartList}
        style={{ transform: listTransform }}
      >
        {list?.map((person) => (
          <div key={person.id} className={styles.personCart}>
            <PersonCart
              id={person.id}
              name={person.name}
              role={person.description}
              imageUrl={person.photo}
            />
          </div>
        ))}
      </div>
      <button className={styles.prevButton} onClick={prevPerson}>
        &lt;
      </button>
      <button className={styles.nextButton} onClick={nextPerson}>
        &gt;
      </button>
    </div>
  );
});
