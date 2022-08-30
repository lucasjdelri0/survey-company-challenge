import { useMetaMaskAccount } from 'providers/MetaMaskProvider'
import Page from 'components/layout/Page'
import Disconnected from 'components/Disconnected'
import SurveyIntro from 'components/survey/SurveyIntro'
import './App.css'

const App = (): JSX.Element => {
  const { connectedAccount } = useMetaMaskAccount()

  return (
    <Page>
      {!connectedAccount ? (
        <Disconnected />
      ) : (
        <div className='App-content'>
          <SurveyIntro />
        </div>
      )}
    </Page>
  )
}

export default App
