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

  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<SurveyAnswers[]>(
    questions.map(({ id }) => ({
      questionId: id,
      answerId: 0,
    }))
  )
  const [timeleft, setTimeleft] = useState(
    questions[current]?.lifetimeSeconds ?? -1
  )

  const currentQuestion = questions.find(({ id }) => id === current)
  const answerValue = answers.find(
    ({ questionId }) => questionId === current
  )?.answerId

  const answerIds = answers.reduce(
    (answerIds: number[], { answerId }) => [...answerIds, answerId],
    []
  )

  useEffect(() => {
    if (current < questions.length) {
      setTimeleft(questions[current].lifetimeSeconds)
    }
  }, [current, questions])

  useEffect(() => {
    if (current < questions.length) {
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
  }, [current, questions, timeleft])

  useEffect(() => {
    const next = (): void => {
      setCurrent(current + 1)
    }

    if (current < questions.length) {
      const timer = setTimeout(() => next(), (timeleft + 0.1) * 1000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [current, questions, timeleft])

  const onChange = (e: RadioChangeEvent): void => {
    const newArray = answers.map((answer) =>
      answer.questionId !== current
        ? answer
        : { questionId: answer.questionId, answerId: e.target.value }
    )
    setAnswers(newArray)
  }

  return (
    <>
      <Steps current={current}>
        {questions.map(({ id }) => (
          <Step
            key={id}
            subTitle={
              id === current && timeleft !== 0 && `Left: ${timeleft} sec.`
            }
          />
        ))}
      </Steps>
      <div className='steps-content'>
        {current >= questions.length ? (
          <SurveyOverview
            loading={isLoading}
            surveyId={surveyId}
            questions={questions}
            answers={answers}
            onSubmit={() => onSubmit?.(surveyId, answerIds)}
          />
        ) : (
          <SurveyQuestion
            question={currentQuestion}
            onAnswer={onChange}
            value={answerValue}
          />
        )}
      </div>
    </>
  )
}
