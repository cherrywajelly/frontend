import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Dialog } from '.';

describe('Dialog가 열리면 올바르게 렌더링된다.', () => {
  it('Title, Description, Footer와 같은 하위 컴포넌트가 보여야 한다.', () => {
    render(
      <Dialog open={true} onClose={() => {}} ariaLabel="Test Dialog">
        <Dialog.Title>Test Title</Dialog.Title>
        <Dialog.Description>Test Description</Dialog.Description>
        <Dialog.Footer>
          <button>Cancel</button>
          <button>Confirm</button>
        </Dialog.Footer>
      </Dialog>,
    );

    expect(screen.getByText('Test Title')).toBeVisible();
    expect(screen.getByText('Test Description')).toBeVisible();
    expect(screen.getByText('Confirm')).toBeVisible();
    expect(screen.getByText('Cancel')).toBeVisible();
  });

  it('Dialog가 닫혔을 때 화면에 나타나지 않아야 한다.', () => {
    render(
      <Dialog open={false} onClose={() => {}} ariaLabel="Test Dialog">
        <Dialog.Title>Test Title</Dialog.Title>
        <Dialog.Description>Test Description</Dialog.Description>
      </Dialog>,
    );

    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Description')).not.toBeInTheDocument();
  });
});
