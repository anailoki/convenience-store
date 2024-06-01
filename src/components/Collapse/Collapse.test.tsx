import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Collapse from '.';

describe('Render Collapse component', () => {
  it('should render close collapse', () => {
    const { getByText } = render(
      <Collapse isOpen={false} label='Categorias'>
        <h1>Todas Categorias</h1>
      </Collapse>
    );
    getByText('Categorias');
  });

  it('should render the children when collapse is open', async () => {
    const { container } = render(
      <Collapse label='Categorias' isOpen={true}>
        <h1>Todas Categorias...</h1>
      </Collapse>
    );
    expect(container).toMatchSnapshot();
  });
});
