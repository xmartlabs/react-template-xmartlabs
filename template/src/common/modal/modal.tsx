import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { classnames } from 'helpers/utils';
import xSvg from '../../assets/icons/x.svg';
import modalStyles from './modal.module.scss';

export enum ModalSizes {
  small = 'small',
  medium = 'medium',
  big = 'big',
  unresticted = 'unresticted',
}

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  size: ModalSizes
  isOpen: boolean;
  onClose: () => void;
  hideCloseButton?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const Modal = ({
  size, hideCloseButton = false, children, isOpen, onClose, className, ...props
}: ModalProps) => {
  useEffect(() => {
    const escFunction = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', escFunction);

    return () => {
      document.removeEventListener('keydown', escFunction);
    };
  }, []);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={modalStyles.overlay}>
      <div
        role="dialog"
        aria-modal="true"
        className={classnames(modalStyles.modal, modalStyles[`modal-${size}`], className || '')}
        {...props}
      >
        {!hideCloseButton && <button className={modalStyles.closeButton} type="button" onClick={onClose}><img alt="x icon" src={xSvg} /></button>}
        {children}
      </div>
    </div>,
    document.getElementById('modal')!,
  );
};
