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
  const handleClose = jest.fn();

  it('should render successfully', async () => {
    createPortalDiv();
    const { baseElement } = render(
      <Modal isOpen size={ModalSizes.medium} onClose={handleClose} />,
    );
    expect(baseElement.firstChild).toMatchSnapshot();
  });

  it('should render successfully with correct size', async () => {
    createPortalDiv();
    const { baseElement } = render(
      <Modal isOpen size={ModalSizes.medium} onClose={handleClose}>
        <div>
          <h3>Title</h3>
          <span>
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
            turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor
            sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies
            mi vitae est. Mauris placerat eleifend leo.
          </span>
        </div>
      </Modal>,
    );
    const modal = baseElement.querySelector('.modal');
    expect(modal).toHaveClass('modal-medium');
  });

  test('modal shows the children and a close button', () => {
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

  test('modal executes onClose when press Escape Key', () => {
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
