import { 
  _getUsers, 
  _getQuestions, 
  _saveQuestion, 
  _saveQuestionAnswer } from './_DATA'

export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions
    })
  )
}

export function saveQuestion(q) {
  return _saveQuestion(q)
}

export function saveQuestionAnswer(qa) {
  return _saveQuestionAnswer(qa)
}