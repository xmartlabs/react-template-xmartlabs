import {
  describe, expect, it, vi,
} from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import { Modal, ModalSizes } from './modal';

const createPortalDiv = () => {
  let portalRoot = document.getElementById('modal');
  if (!portalRoot) {
    portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'modal');
    document.body.appendChild(portalRoot);
  }
};

describe('Modal', () => {
  const handleClose = vi.fn();

  it('should render successfully', async () => {
    createPortalDiv();
    const { baseElement } = render(
      <Modal isOpen size={ModalSizes.medium} onClose={handleClose} />,
    );
    expect(baseElement.firstChild).toMatchSnapshot();
  });

  it('modal shows the children and a close button', () => {
    const { getByText } = render(
      <Modal isOpen size={ModalSizes.medium} onClose={handleClose}>
        <div>
          <div>test</div>
          <button onClick={handleClose}>cancel</button>
        </div>
      </Modal>,
    );
    expect(getByText('test')).toBeTruthy();
    fireEvent.click(getByText(/cancel/i));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('modal executes onClose when press Escape Key', () => {
    const { baseElement } = render(
      <Modal isOpen size={ModalSizes.medium} onClose={handleClose}>
        <div>
          <div>test</div>
          <button onClick={handleClose}>cancel</button>
        </div>
      </Modal>,
    );
    const modal = baseElement.getRootNode();
    fireEvent.keyDown(modal, { key: 'Escape', code: 27, charCode: 27 });
    expect(handleClose).toHaveBeenCalled();
  });
});
