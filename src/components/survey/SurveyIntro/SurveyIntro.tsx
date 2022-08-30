import { Space, Typography, Image, Button } from 'antd'
import logo from '../../../logo.svg'

const { Text, Title } = Typography

export const SurveyIntro = (): JSX.Element => (
  <Space direction='vertical' size='middle'>
    <Title level={2} style={{ marginBottom: 4, textAlign: 'center' }}>
      Daily Trivia
    </Title>
    <Text>My Survey Sample #1</Text>
    <Image width='40vmin' src={logo} preview={false} />
    <Button
      type='primary'
      onClick={() => console.log('pressed')}
      style={{ flex: 1 }}
    >
      Start Survey
    </Button>
  </Space>
)
