import { render } from '@testing-library/react';
import { Modal, ModalSizes } from './modal';

describe('Modal', () => {
  it('should render successfully', async () => {
    let portalRoot = document.getElementById('modal');
    if (!portalRoot) {
      portalRoot = document.createElement('div');
      portalRoot.setAttribute('id', 'modal');
      document.body.appendChild(portalRoot);
    }
    const { baseElement } = render(<Modal isOpen size={ModalSizes.medium} onClose={() => true} />);
    expect(baseElement.firstChild).toMatchSnapshot();
  });

  it('should render successfully with correct size', async () => {
    let portalRoot = document.getElementById('modal');
    if (!portalRoot) {
      portalRoot = document.createElement('div');
      portalRoot.setAttribute('id', 'modal');
      document.body.appendChild(portalRoot);
    }
    const { baseElement } = render(
      <Modal isOpen size={ModalSizes.medium} onClose={() => true}>
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
});
