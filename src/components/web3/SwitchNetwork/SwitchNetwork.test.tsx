import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SwitchNetwork from '.'

test('render content', () => {
  const component = render(<SwitchNetwork />)
  const button = component.container.querySelector('button')
  expect(button).toBeInTheDocument()
})

test('clicking the button calls event handler once', () => {
  const mockHandler = jest.fn()
  const component = render(<SwitchNetwork onClick={mockHandler} />)
  const button = component.getByRole('button')
  fireEvent.click(button)
  expect(mockHandler.mock.calls).toHaveLength(1)
})
