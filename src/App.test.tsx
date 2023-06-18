import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { ITask } from './TaskInterface';
import userEvent from '@testing-library/user-event'

/* test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
}); */
test('renders todo items list successfully', async () => {
  //const mockHandleClick = jest.fn();
  render(<App />);
  const inputElement = screen.getAllByRole("textbox")[0];
  await userEvent.type(inputElement,"Need coffee break");
  const addTaskButton = screen.getByText(/add to list/i);
  await userEvent.click(addTaskButton);
  const listItem = screen.getByText(/coffee/i)
  expect(listItem).toBeInTheDocument();
});
test('should not render list when all tasks are removed', async () => {
  render(<App />);
  const inputElement = screen.getAllByRole("textbox")[0];
  await userEvent.type(inputElement,"Need coffee break");
  const addTaskButton = screen.getByText(/add to list/i);
  await userEvent.click(addTaskButton);
  const listItem = screen.getByText(/coffee/i)
  const checkBoxElem = screen.getByRole('checkbox');
  await userEvent.click(checkBoxElem);
  const emptyListMessage=screen.getByText(/To do list is empty!/i)
  expect(emptyListMessage).toBeInTheDocument();
});
