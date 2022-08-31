import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Disconnected from '.'

test('render content', () => {
  const component = render(<Disconnected />)
  component.getByText('Oops, it seems that you are disconnected!')
  component.getByText('Connect your wallet to start earning QUIZ')
})
