import { Button, Radio, Space, Typography } from 'antd'
import { SurveyOverviewProps } from './SurveyOverview.props'

const { Title } = Typography

export const SurveyOverview = ({
  surveyId,
  questions,
  answers,
  loading,
  onSubmit,
}: SurveyOverviewProps): JSX.Element => (
  <Space direction='vertical' size='large'>
    <Title level={2} style={{ marginBottom: 0 }}>
      Survey Overview
    </Title>
    {questions.map(({ id, text, options }) => {
      const optSelected = options.find(
        ({ id: optionId }) =>
          optionId ===
          answers.find(({ questionId }) => questionId === id)?.answerId
      )
      return (
        <div key={id}>
          <Title level={4} style={{ marginBottom: 4 }}>
            {text}
          </Title>
          <Radio checked>{optSelected?.text}</Radio>
        </div>
      )
    })}
    <Button
      type='primary'
      loading={loading}
      onClick={onSubmit}
      style={{ width: '100%' }}
    >
      Submit
    </Button>
  </Space>
)
