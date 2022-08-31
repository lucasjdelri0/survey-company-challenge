import { useEffect, useState } from 'react'
import { Steps, RadioChangeEvent } from 'antd'
import { SurveyAnswers } from '../types'
import { DailySurveyProps } from './DailySurvey.props'
import SurveyQuestion from './_components/SurveyQuestion'
import SurveyOverview from './_components/SurveyOverview'
import './DailySurvey.css'

const { Step } = Steps

export const DailySurvey = ({
  dataSource,
  isLoading = false,
  onSubmit,
}: DailySurveyProps): JSX.Element => {
  const { id: surveyId, questions } = dataSource

  const [currentQuestionId, setCurrentQuestionId] = useState(0)
  const [surveyAnswers, setSurveyAnswers] = useState<SurveyAnswers[]>(
    questions.map(({ id }) => ({
      questionId: id,
      answerId: 0,
    }))
  )
  const [timeleft, setTimeleft] = useState(
    questions[currentQuestionId]?.lifetimeSeconds ?? -1
  )

  const currentQuestion = questions.find(({ id }) => id === currentQuestionId)

  const currentQuestionAnswer = surveyAnswers.find(
    ({ questionId }) => questionId === currentQuestionId
  )?.answerId

  const answerIds = surveyAnswers.reduce(
    (answerIds: number[], { answerId }) => [...answerIds, answerId],
    []
  )

  useEffect(() => {
    if (currentQuestionId < questions.length) {
      setTimeleft(questions[currentQuestionId].lifetimeSeconds)
    }
  }, [currentQuestionId, questions])

  useEffect(() => {
    if (currentQuestionId < questions.length) {
      const downloadTimer = setInterval(() => {
        if (timeleft < 1) {
          clearInterval(downloadTimer)
        } else {
          setTimeleft(timeleft - 1)
        }
      }, 1000)
      return () => {
        clearInterval(downloadTimer)
      }
    }
  }, [currentQuestionId, questions, timeleft])

  useEffect(() => {
    const next = (): void => {
      setCurrentQuestionId(currentQuestionId + 1)
    }

    if (currentQuestionId < questions.length) {
      const timer = setTimeout(() => next(), (timeleft + 0.1) * 1000)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [currentQuestionId, questions, timeleft])

  const onChange = (e: RadioChangeEvent): void => {
    const newArray = surveyAnswers.map((answer) =>
      answer.questionId !== currentQuestionId
        ? answer
        : { questionId: answer.questionId, answerId: e.target.value }
    )
    setSurveyAnswers(newArray)
  }

  return (
    <>
      <Steps current={currentQuestionId}>
        {questions.map(({ id }) => (
          <Step
            key={id}
            subTitle={
              id === currentQuestionId &&
              timeleft !== 0 &&
              `Left: ${timeleft} sec.`
            }
          />
        ))}
      </Steps>
      <div className='steps-content'>
        {currentQuestionId >= questions.length ? (
          <SurveyOverview
            loading={isLoading}
            surveyId={surveyId}
            questions={questions}
            answers={surveyAnswers}
            onSubmit={() => onSubmit?.(surveyId, answerIds)}
          />
        ) : (
          <SurveyQuestion
            question={currentQuestion}
            onAnswer={onChange}
            value={currentQuestionAnswer}
          />
        )}
      </div>
    </>
  )
}
