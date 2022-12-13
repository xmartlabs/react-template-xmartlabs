type IProps = {
  type?: 'button' | 'submit' | 'reset';
} | React.HTMLProps<HTMLButtonElement>;

export const BaseButton: React.FC<IProps> = ({ type, ...props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading, react/button-has-type
  <button type={type || 'button'} {...props}>
    Hola
  </button>
);
