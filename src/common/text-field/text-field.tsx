import React, { HTMLInputTypeAttribute, useRef } from 'react';
import { classnames } from 'helpers/utils';
import styles from './text-field.module.scss';

export enum TextFieldStatus {
  default = 'default',
  error = 'error',
  success = 'success',
}

export interface TextFieldProps {
  className?: string;
  disabled?: boolean;
  helperIcon?: React.FunctionComponent;
  helperText?: string;
  label?: string;
  leftIcon?: React.FunctionComponent;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRightIconClick?: () => void;
  placeholder?: string;
  rightIcon?: React.FunctionComponent;
  status?: TextFieldStatus;
  type?: HTMLInputTypeAttribute;
  value?: string;
}

export const TextField = ({
  className,
  disabled = false,
  helperIcon,
  helperText,
  label,
  leftIcon,
  name,
  onChange,
  onRightIconClick,
  placeholder,
  rightIcon,
  status = TextFieldStatus.default,
  type = 'text',
  value,
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
      <label className={styles.label} htmlFor={name}>{label}</label>
      <div
        className={
          classnames(styles.inputContainer, className || '')
        }
      >
        {!!LeftIcon && (
          <button
            type="button"
            onClick={focusOnInput}
            className={styles.iconLeft}
          >
            <LeftIcon data-testid="left-icon" />
          </button>
        )}
        {!!RightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className={styles.iconRight}
          >
            <RightIcon data-testid="right-icon" />
          </button>
        )}
        <input
          aria-label={name}
          className={classnames(styles.inputStyle, styles[status], LeftIcon ? styles.withPaddingLeft : '', RightIcon ? styles.withPaddingRight : '')}
          data-testid="input"
          disabled={disabled}
          id={name}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          ref={inputRef}
          type={type}
          value={value}
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
