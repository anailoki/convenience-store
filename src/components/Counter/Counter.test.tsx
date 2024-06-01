import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Counter from '.';

describe('Render Counter component', () => {
  it('Render Counter successfully', () => {
    const { getByText } = render(<Counter countInit={10} />);

    getByText('10');
    const ele = screen.getByTestId('counter');
    expect(ele).toBeInTheDocument();
  });

  it('Invoke decrement button click and count value to be 0', () => {
    const { getByText, getByRole } = render(<Counter countInit={1} />);

    const decrementBtn = getByRole('button', { name: 'disminuir' });
    expect(decrementBtn).toBeDefined();
    fireEvent.click(decrementBtn);
    getByText('0');
  });

  it('Invoke increment button click and count value to be 2', () => {
    const { getByText, getByRole } = render(<Counter countInit={1} />);

    const incrementBtn = getByRole('button', { name: 'aumentar' });
    expect(incrementBtn).toBeDefined();
    fireEvent.click(incrementBtn);
    getByText('2');
  });
});
