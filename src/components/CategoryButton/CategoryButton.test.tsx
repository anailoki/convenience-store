import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import CategoryButton from '.';
import Image from '../../assets/img/categories/verduras_categories.png';

describe('Render CategoryButton component', () => {
  it('should render category image', () => {
    const onClickMock = vi.fn();

    const { getByTestId, getByText, getByAltText } = render(
      <CategoryButton
        name='Vegetales'
        img={'https://cdn-icons-png.flaticon.com/512/3731/3731072.png'}
      />
    );
    const button = getByTestId('category-button');
    const image = getByAltText('Vegetales');

    fireEvent.click(button);

    getByText('Vegetales');

    expect(image).toHaveAttribute(
      'src',
      'https://cdn-icons-png.flaticon.com/512/3731/3731072.png'
    );
    expect(button).toBeInTheDocument();
    expect(onClickMock).toHaveBeenCalledTimes(0);
  });

  it('should do click in button when clicked if it has a function', () => {
    const onClickMock = vi.fn();
    const { getByTestId } = render(
      <CategoryButton name='Vegetales' img={Image} onClick={onClickMock} />
    );
    const button = getByTestId('category-button');
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
