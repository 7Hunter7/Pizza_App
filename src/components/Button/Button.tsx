import styles from "./Button.module.scss";
import type { ButtonProps } from "./Button.props";
import cn from "classnames";

function Button({ children, ...props }: ButtonProps) {
  return (
    <button {...props} className={cn(styles["button"], styles["accent"])}>
      {children}
    </button>
  );
}

export default Button;
