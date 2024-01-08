import { classnames } from "helpers/utils";
import styles from "./container.module.scss";

export type ContainerProps = React.HTMLProps<HTMLDivElement> & {
  className?: string;
};

export const Container: React.FC<ContainerProps> = ({
  children = null,
  className = "",
  ...props
}) => (
  <div className={classnames(className, styles.baseContainer)} {...props}>
    {children}
  </div>
);
