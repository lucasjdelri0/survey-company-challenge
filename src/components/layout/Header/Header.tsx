import { Layout, Space, Menu, Avatar, Typography, Dropdown } from 'antd'
import {
  GithubOutlined,
  WalletOutlined,
  WarningOutlined,
  SketchOutlined,
} from '@ant-design/icons'
import { useMetaMaskAccount } from 'providers/MetaMaskProvider'
import { roundToTwo, shortenAddress } from 'utils'
import ConnectWallet from 'components/ConnectWallet'
import SwitchNetwork from 'components/SwitchNetwork'
import { HeaderProps } from './Header.props'
import './Header.css'

const { Header: AntHeader } = Layout
const { Link: AntLink } = Typography

export const Header = (props: HeaderProps): JSX.Element => {
  const { backgroundColor, repoHref, avatarImageSrc } = props
  const {
    connectedAccount,
    connectAccount,
    isWrongNetwork,
    switchToRopsten,
    ethBalance,
  } = useMetaMaskAccount()

  const menu = (
    <Menu
      items={[
        {
          label: `Balance: ${roundToTwo(ethBalance) ?? ''} rETH`,
          key: '0',
          icon: <SketchOutlined />,
        },
      ]}
    />
  )

  return (
    <AntHeader
      className='headerContainer'
      style={{
        backgroundColor,
      }}
    >
      {repoHref && (
        <AntLink href={repoHref} target='_blank' className='ghLink'>
          <GithubOutlined className='headerLogo' />
        </AntLink>
      )}
      <Space align='center' size='large'>
        {!connectedAccount ? (
          <ConnectWallet onClick={connectAccount} />
        ) : (
          <>
            {avatarImageSrc && <Avatar src={avatarImageSrc} />}
            <Dropdown.Button
              overlay={menu}
              placement='bottomRight'
              arrow={{ pointAtCenter: true }}
              icon={<WalletOutlined />}
            >
              {shortenAddress(connectedAccount)}
            </Dropdown.Button>
            {isWrongNetwork && (
              <SwitchNetwork
                tooltip='You’re connected to the wrong network'
                icon={<WarningOutlined />}
                onClick={switchToRopsten}
              />
            )}
          </>
        )}
      </Space>
    </AntHeader>
  )
}
