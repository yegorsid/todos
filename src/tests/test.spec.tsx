import { describe, expect, it} from 'vitest';
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import App from '../components/App.tsx';

describe('test if app works correctly', () => {
  it('should add, check and delete task', async () => {
    const user = userEvent.setup();
    render(<App />);
    //test if user can add text to input properly
    const input = screen.getByRole('textbox');
    await user.type(input, 'newtask');
    expect(input).toHaveProperty('value', 'newtask');
    //test if user can click button
    const submitButton = screen.getByRole('button');
    await user.click(submitButton)
    .then(() => {
      //test if task appear in dom after click, here in two places
      const task = screen.getAllByText('newtask');
      expect(task.length).toBe(2);
    })
    //test if checkbox appears to be checked after click
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox)
    .then(() => {
      expect(checkbox).toHaveProperty('checked')
    })
    // test delete button
    const deleteButton = screen.getByRole('button', {name: 'Delete'})
    await user.click(deleteButton)

    screen.debug()
  })
})