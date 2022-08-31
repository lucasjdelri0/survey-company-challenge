import { Question, SurveyAnswers } from 'components/survey/types'

export interface SurveyOverviewProps {
  surveyId: number
  questions: Question[]
  answers: SurveyAnswers[]
  loading: boolean
  onSubmit: () => void
}
