import { observer } from "mobx-react-lite";
import classNames from "classnames";
import styles from "./PaginationButton.module.css";

type PaginationButtonType = {
  type: string;
  onClick?: () => void;
  disabled: boolean;
};

export const PaginationButton = observer(
  ({ type, disabled, onClick }: PaginationButtonType) => {
    const handleClick = () => {
      if (onClick) {
        onClick();
      }
    };
    return (
      <button
        className={classNames(styles.arrow, {
          [styles.disabled]: disabled,
          [styles.next]: type === "next",
        })}
        type="button"
        onClick={handleClick}
        disabled={disabled}
      ></button>
    );
  }
);
