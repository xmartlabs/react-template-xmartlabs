import React, { useRef } from 'react';
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
  leftIcon?: React.FunctionComponent;
  rightIcon?: React.FunctionComponent;
  onRightIconClick?: () => void;
  helperText?: string;
  helperIcon?: React.FunctionComponent;
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
  helperIcon,
  className,
  leftIcon,
  rightIcon,
  onRightIconClick,
}: TextFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const focusOnInput = () => {
    if (inputRef && inputRef.current) inputRef.current.focus();
  };
  const LeftIcon = leftIcon;
  const RightIcon = rightIcon;
  const HelperIcon = helperIcon;
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
          {LeftIcon && (<LeftIcon data-testid="left-icon" />)}
        </button>
        <button
          type="button"
          onClick={onRightIconClick}
          className={styles.iconRight}
        >
          {RightIcon && <RightIcon data-testid="right-icon" />}
        </button>
        <input
          id={name}
          ref={inputRef}
          aria-label={name}
          data-testid="input"
          className={classnames(styles.inputStyle, styles[status], LeftIcon ? styles.withPaddingLeft : '', RightIcon ? styles.withPaddingRight : '')}
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
      {helperText && (
        <div className={classnames(styles.helperText, styles[status])}>
          {HelperIcon && (
          <div className={classnames(styles.helperIcon, styles[status])}>
            <HelperIcon data-testid="helper-icon" />
          </div>
          )}
          <span>{helperText}</span>
        </div>
      )}
    </div>
  );
};
