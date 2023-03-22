import { classnames } from 'helpers/utils';
import styles from './text-area.module.scss';

export enum TextAreaStatus {
  default = 'default',
  error = 'error',
  success = 'success',
}

export interface TextFieldProps {
  status?: TextAreaStatus;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  name: string;
  value?: string;
  rows?: number;
  cols?: number;
  length?: number;
  maxLength?: number;
  minLength?: number;
  helperText?: string;
  helperIcon?: React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & { title?: string | undefined }
  >;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea = ({
  status = TextAreaStatus.default,
  required = false,
  rows,
  cols,
  length,
  maxLength,
  minLength,
  disabled = false,
  label,
  placeholder,
  value,
  onChange,
  name,
  helperText,
  helperIcon,
  className,
}: TextFieldProps) => {
  const HelperIcon = helperIcon;
  return (
    <div>
      <label className={styles.label} htmlFor={name}>{label}</label>
      <div
        className={
          classnames(styles.inputContainer, className || '')
        }
      >
        <textarea
          required={required}
          id={name}
          aria-label={name}
          data-testid="textarea"
          rows={rows}
          cols={cols}
          className={classnames(styles.inputStyle, styles[status])}
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          maxLength={maxLength}
          minLength={minLength}
        />
      </div>
      <div className={styles.bottomMessage}>
        {helperText && (
          <div className={classnames(styles.helperText, styles[status])}>
            {HelperIcon && <HelperIcon data-testid="helper-icon" className={classnames(styles.helperIcon, styles[status])} />}
            {helperText && <span>{helperText}</span>}
          </div>
        )}
        {maxLength && (
          <div className={classnames(styles.countText, styles[status])}>
            {maxLength && <span>{`${length || 0}/${maxLength}`}</span>}
          </div>
        )}
      </div>
    </div>
  );
};
