import { classnames } from 'helpers/utils';
import { ReactComponent as CloseSVG } from 'assets/icons/close.svg';
import badgeStyles from './badge.module.scss';
import globalStyles from '../../assets/stylesheets/global-styles.module.scss';

type IProps = React.HTMLProps<HTMLDivElement> & {
  closeable?: boolean;
  bgColor?: string;
  closeIcon?: React.ReactNode;
  closeIconBgColor?: string;
  closeIconColor?: string;
  leftElement?: React.ReactNode;
  onClose?: () => void;
};

export const Badge: React.FC<IProps> = ({
  children,
  leftElement,
  closeable,
  onClose,
  bgColor = '#FAFCFD',
  color = '#1D1616',
  closeIcon = <CloseSVG style={{ transform: 'scale(2)' }} />,
  closeIconBgColor = '#CCCCCC',
  closeIconColor = '#FFFFFF',
  ...props
}) => (
  <div
    className={classnames(
      badgeStyles.badge,
      globalStyles['text-small'],
    )}
    style={{
      backgroundColor: bgColor,
      color,
    }}
    {...props}
  >
    {leftElement || null}
    {children}
    {closeable ? (
      <button
        type="button"
        style={{
          backgroundColor: closeIconBgColor,
          color: closeIconColor,
        }}
        className={classnames(
          badgeStyles.closeIcon,
        )}
        onClick={onClose}
      >
        {closeIcon}
      </button>
    ) : null}
  </div>
);
