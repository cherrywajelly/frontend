import { render, screen, fireEvent } from '@testing-library/react';

import Dropdown from './Dropdown';

const mockItems = [
  { label: 'Option 1', onClick: jest.fn() },
  { label: 'Option 2', onClick: jest.fn() },
];

describe('Dropdown 컴포넌트', () => {
  test('dropdown 컴포넌트가 렌더링되어야 한다.', () => {
    render(<Dropdown items={mockItems} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('버튼이 클릭되면, 드롭다운이 펼쳐져야 한다.', () => {
    render(<Dropdown items={mockItems} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const dropdown = screen.getByRole('list');
    expect(dropdown).toBeInTheDocument();
  });

  test('외부 영역을 클릭하면 드롭다운이 닫혀야 한다.', () => {
    render(<Dropdown items={mockItems} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const dropdown = screen.getByRole('list');
    expect(dropdown).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(dropdown).not.toBeInTheDocument();
  });

  test('드롭다운 아이템이 클릭되면, onClick 핸들러가 호출되어야 한다.', () => {
    render(<Dropdown items={mockItems} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const item = screen.getByText('Option 1');
    fireEvent.click(item);

    expect(mockItems[0].onClick).toHaveBeenCalled();
  });

  test('한 아이템이 클릭되면, 드롭다운이 닫혀야 한다.', () => {
    render(<Dropdown items={mockItems} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const item = screen.getByText('Option 1');
    fireEvent.click(item);

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
