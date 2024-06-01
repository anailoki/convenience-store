import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import ModalGuest from '.';

describe('Render Modal Guest component', () => {
  it('should render close collapse', () => {
    const onClickMock = vi.fn();

    const { getByText } = render(
      <ModalGuest
        title='Modal title'
        description='Modal description'
        open
        setOpen={onClickMock}
      />
    );
    getByText('Modal title');
    getByText('Modal description');
  });

  it('should render the children when collapse is open', async () => {
    const onClickMock = vi.fn();

    const { container } = render(
      <ModalGuest
        title='Modal title'
        description='Modal description'
        open
        setOpen={onClickMock}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render two buttons', () => {
    const onClickMock = vi.fn();

    const { getAllByRole } = render(
      <ModalGuest
        title='Modal title'
        description='Modal description'
        open
        setOpen={onClickMock}
      />
    );

    const buttons = getAllByRole('button');
    expect(buttons.length).toBe(2);
  });

  it('should not render modal', () => {
    const onClickMock = vi.fn();

    const { queryByText } = render(
      <ModalGuest
        title='Modal title'
        description='Modal description'
        open={false}
        setOpen={onClickMock}
      />
    );

    expect(queryByText('Modal title')).toBeNull();
  });
});
