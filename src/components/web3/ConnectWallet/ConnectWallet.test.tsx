import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import ConnectWallet from '.'

test('render content', () => {
  const component = render(<ConnectWallet />)
  component.getByText('Connect Wallet')
  const button = component.container.querySelector('button')
  expect(button).toBeInTheDocument()
})

test('clicking the button calls event handler once', () => {
  const mockHandler = jest.fn()
  const component = render(<ConnectWallet onClick={mockHandler} />)
  const button = component.getByText('Connect Wallet')
  fireEvent.click(button)
  expect(mockHandler.mock.calls).toHaveLength(1)
})
