import { useRef } from 'react';
import { classnames } from 'helpers/utils';
import styles from './text-field.module.scss';

export enum TextFieldStatus {
  default = 'default',
  error = 'error',
  success = 'success',
}

interface TextFieldProps {
  status?: TextFieldStatus;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  name: string;
  value?: string;
  LeftIcon?: React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & { title?: string | undefined }
  > | undefined;
  RightIcon?: React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & { title?: string | undefined }
  >;
  rightIconAction?: () => void;
  helperText?: string;
  HelperIcon?: React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & { title?: string | undefined }
  >;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextField = ({
  status = TextFieldStatus.default,
  disabled = false,
  label,
  placeholder,
  value,
  onChange,
  name,
  helperText,
  HelperIcon,
  className,
  LeftIcon = undefined,
  RightIcon,
  rightIconAction,
}: TextFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const focusOnInput = () => {
    if (inputRef && inputRef.current) inputRef.current.focus();
  };
  return (
    <div>
      <div className={styles.label}>
        <label htmlFor={name}>{label}</label>
      </div>
      <div
        className={
          className
            ? classnames(styles.inputContainer, className)
            : classnames(styles.inputContainer)
        }
      >
        <button
          type="button"
          onClick={focusOnInput}
          className={styles.iconLeft}
        >
          {LeftIcon && (<LeftIcon />)}
        </button>
        <button
          type="button"
          onClick={rightIconAction}
          className={styles.iconRight}
        >
          {RightIcon && <RightIcon />}
        </button>
        <input
          id={name}
          ref={inputRef}
          aria-label={name}
          data-testid={name}
          className={classnames(styles.inputStyle, styles[`inputStyle-${status}`])}
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
      {helperText && (
        <div className={classnames(styles.helperText, styles[`helperText-${status}`])}>
          {HelperIcon && <HelperIcon className={classnames(styles.helperIcon, styles[`helperIcon-${status}`])} />}
          <span>{helperText}</span>
        </div>
      )}
    </div>
  );
};
