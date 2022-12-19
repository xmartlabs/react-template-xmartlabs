type IProps = React.HTMLProps<HTMLButtonElement> & {
  type?: 'button' | 'submit' | 'reset';
};

export const BaseButton: React.FC<IProps> = ({ type = 'button', children = 'Button', ...props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading, react/button-has-type
  <button type={type} {...props}>
    {children}
  </button>
);
