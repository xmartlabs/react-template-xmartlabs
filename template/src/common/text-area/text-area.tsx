import { classnames } from 'helpers/utils';
import styles from './text-area.module.scss';

export enum TextFieldStatus {
  default = 'default',
  error = 'error',
  success = 'success',
}

interface TextFieldProps {
  status?: TextFieldStatus;
  rows: number;
  cols: number;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  name: string;
  value?: string;
  helperText?: string;
  HelperIcon?: React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & { title?: string | undefined }
  >;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea = ({
  status = TextFieldStatus.default,
  rows,
  cols,
  disabled = false,
  label,
  placeholder,
  value,
  onChange,
  name,
  helperText,
  HelperIcon,
  className,
}: TextFieldProps) => (
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
      <textarea
        id={name}
        aria-label={name}
        data-testid={name}
        rows={rows}
        cols={cols}
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
