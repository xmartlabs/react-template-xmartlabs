import { classnames } from 'helpers/utils';
import styles from './text-field.module.scss';
import { ReactComponent as CloseSVG } from '../../assets/icons/close.svg';

export enum TextFieldStatus {
  default = 'default',
  disabled = 'disabled',
  error = 'error',
  success = 'success',
}

interface TextFieldProps {
  status?: TextFieldStatus;
  label?: string;
  placeholder?: string;
  name: string;
  value: string;
  LeftIcon?: React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & { title?: string | undefined }
  >;
  leftIconAction?: () => void;
  RightIcon?: React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & { title?: string | undefined }
  >;
  rightIconAction?: () => void;
  helperText?: string;
  closeHelper?: () => void;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextField = ({
  status = TextFieldStatus.default,
  label,
  placeholder,
  value,
  onChange,
  name,
  helperText,
  closeHelper,
  className,
  LeftIcon,
  leftIconAction,
  RightIcon,
  rightIconAction,
}: TextFieldProps) => (
  <div>
    <div className={styles.label}>
      <span>{label}</span>
    </div>
    <div className={styles.wrapper}>
      <div
        className={
          className
            ? classnames(styles.inputContainer, className)
            : classnames(styles.inputContainer)
        }
      >
        {LeftIcon && (
          <button className={styles.iconLeft} type="button" onClick={leftIconAction}>
            <LeftIcon />
          </button>
        )}
        <input
          aria-label={name}
          data-testid={name}
          className={classnames(styles.inputStyle, styles[`inputStyle-${status}`])}
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          disabled={status === TextFieldStatus.disabled}
        />
        {RightIcon && (
          <button
            className={styles.iconRight}
            type="button"
            onClick={rightIconAction}
          >
            <RightIcon />
          </button>
        )}
      </div>
    </div>
    {helperText && value && (
      <div className={classnames(styles.helperText, styles[`helperText-${status}`])}>
        <button
          className={classnames(styles.helperCloseButton, styles[`helperCloseButton-${status}`])}
          type="button"
          onClick={closeHelper}
          aria-label="Close"
        >
          <CloseSVG />
        </button>
        <span>{helperText}</span>
      </div>
    )}
  </div>
);
