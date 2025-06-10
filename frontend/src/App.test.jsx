import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('Todo List App', () => {
  test('可以新增待辦事項', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('請輸入待辦事項');
    fireEvent.change(input, { target: { value: '買牛奶' } });
    fireEvent.click(screen.getByText('新增'));
    expect(screen.getByText('買牛奶')).toBeInTheDocument();
  });

  test('可以刪除待辦事項', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('請輸入待辦事項');
    fireEvent.change(input, { target: { value: '買牛奶' } });
    fireEvent.click(screen.getByText('新增'));
    fireEvent.click(screen.getByText('刪除'));
    expect(screen.queryByText('買牛奶')).not.toBeInTheDocument();
  });

  test('可以編輯待辦事項', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('請輸入待辦事項');
    fireEvent.change(input, { target: { value: '買牛奶' } });
    fireEvent.click(screen.getByText('新增'));
    fireEvent.click(screen.getByText('編輯'));
    const editInput = screen.getByDisplayValue('買牛奶');
    fireEvent.change(editInput, { target: { value: '買豆漿' } });
    fireEvent.click(screen.getByText('儲存'));
    expect(screen.getByText('買豆漿')).toBeInTheDocument();
    expect(screen.queryByText('買牛奶')).not.toBeInTheDocument();
  });

  test('可以標記完成/未完成', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('請輸入待辦事項');
    fireEvent.change(input, { target: { value: '買牛奶' } });
    fireEvent.click(screen.getByText('新增'));
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(screen.getByText('買牛奶')).toHaveClass('completed');
    fireEvent.click(checkbox);
    expect(screen.getByText('買牛奶')).not.toHaveClass('completed');
  });

  test('可以切換狀態篩選', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('請輸入待辦事項');
    fireEvent.change(input, { target: { value: 'A' } });
    fireEvent.click(screen.getByText('新增'));
    fireEvent.change(input, { target: { value: 'B' } });
    fireEvent.click(screen.getByText('新增'));
    // 標記第一個為完成
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    // 切換到已完成
    fireEvent.click(screen.getByText('已完成'));
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.queryByText('B')).not.toBeInTheDocument();
    // 切換到未完成
    fireEvent.click(screen.getByText('未完成'));
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.queryByText('A')).not.toBeInTheDocument();
    // 切回全部
    fireEvent.click(screen.getByText('全部'));
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });
});
