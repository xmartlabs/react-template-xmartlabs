import { BaseButton } from 'common/base-button';
import type { IProps as IBaseButtonProps } from 'common/base-button/base-button';
import { Sizes } from 'common/types';
import { classnames } from 'helpers/utils';
import buttonStyles from './button.module.scss';

type IProps = IBaseButtonProps & {
  bSize?: Sizes;
  bStyle?: 'filled' | 'stroke' | 'ghost';
  bColor?: 'primary' | 'secondary';
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  className?: string;
};

export const Button: React.FC<IProps> = ({
  bSize = 'm', bStyle = 'filled', bColor = 'primary', children = 'Button', className = '', rightIcon, leftIcon, ...props
}) => (
  <BaseButton
    {...props}
    className={classnames(
      className,
      buttonStyles.btn,
      buttonStyles[`btn-${bSize}`],
      buttonStyles[`btn-${bColor}-${bStyle}`],
    )}
  >
    {leftIcon || null}
    {children}
    {rightIcon || null}
  </BaseButton>
);
