import { render, screen, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input 컴포넌트', () => {
  test('input 컴포넌트가 렌더링되어야 한다.', () => {
    render(<Input placeholder="placeholder" />);

    const input = screen.getByPlaceholderText('placeholder');
    expect(input).toBeInTheDocument();
  });

  test('기본값이 보여져야 한다.', () => {
    render(<Input defaultValue="Default text value" />);

    const input = screen.getByDisplayValue('Default text value');
    expect(input).toBeInTheDocument();
  });

  test('input value가 타이핑되면 업데이트 되어야 한다.', () => {
    render(<Input placeholder="placeholder" />);

    const input = screen.getByPlaceholderText('placeholder');
    fireEvent.change(input, { target: { value: 'New value' } });

    expect(input).toHaveValue('New value');
  });

  test('타이핑하게 되면, onChnage 핸들러가 호출되어야 한다.', () => {
    const mockOnChange = jest.fn();
    render(<Input onChange={mockOnChange} placeholder="placeholder" />);

    const input = screen.getByPlaceholderText('placeholder');
    fireEvent.change(input, { target: { value: 'New value' } });

    expect(mockOnChange).toHaveBeenCalled();
  });

  test('keyr가 눌러지면 onKeyDown 핸들러가 호출되어야 한다.', () => {
    const mockOnKeyDown = jest.fn();
    render(<Input onKeyDown={mockOnKeyDown} placeholder="placeholder" />);

    const input = screen.getByPlaceholderText('placeholder');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(mockOnKeyDown).toHaveBeenCalled();
  });

  test('추가적인 커스텀 스타일(className)이 추가되면 알맞게 적용되어야 한다.', () => {
    render(<Input className="custom-class" placeholder="hello world" />);

    const input = screen.getByPlaceholderText('hello world');
    expect(input).toHaveClass('custom-class');
  });
});
