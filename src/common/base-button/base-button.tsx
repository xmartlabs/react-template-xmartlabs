export type IProps = React.HTMLProps<HTMLButtonElement> & {
  type?: 'button' | 'submit' | 'reset';
};

export const BaseButton: React.FC<IProps> = ({ type = 'button', children = 'Button', ...props }) => (
  <button type={type} {...props}>
    {children}
  </button>
);
