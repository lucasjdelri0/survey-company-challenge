import { Typography, Space } from 'antd'
import ConnectWallet from 'components/web3/ConnectWallet'
import { useMetaMaskAccount } from 'providers/MetaMaskProvider'

const { Title, Text } = Typography

export const Disconnected = (): JSX.Element => {
  const { connectAccount } = useMetaMaskAccount()

  return (
    <Space direction='vertical' size='large' className='App-content'>
      <Title level={2} type='danger' style={{ marginBottom: 0 }}>
        Oops, it seems that you are disconnected!
      </Title>
      <Text>Connect your wallet to start earning QUIZ</Text>
      <ConnectWallet onClick={connectAccount} />
    </Space>
  )
}
