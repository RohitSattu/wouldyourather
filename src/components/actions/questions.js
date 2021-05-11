import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { addQuestionToUser, voteQA } from './users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const VOTE = "VOTE"
export const ADD_QUESTION = "ADD_QUESTION"

export function vote(qa) {
  return {
    type: VOTE,
    qa,
  }
}

export function addQuestion(questionDetails) {
  return {
    type: ADD_QUESTION,
    questionDetails
  }
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function handleQAs(qa) {
  return(dispatch) => {
    return saveQuestionAnswer(qa)
            .then(() => {
              dispatch(vote(qa))
              dispatch(voteQA(qa))
            })
  }
}

export function handleAddQuestion(optionOneText, optionTwoText, author) {
  return (dispatch) => {
    return saveQuestion({optionOneText, optionTwoText, author})
            .then((question) => {
              dispatch(addQuestion(question))
              dispatch(addQuestionToUser(question))
            })
  }
}
