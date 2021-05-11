import { ADD_QUESTION_TO_USER, RECEIVE_USERS, ADD_VOTE_TO_USER } from '../actions/users'

export default function user(state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }
    case ADD_VOTE_TO_USER:
      const { authedUser, qid, answer } = action.vote
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer
          }
        }
      }
    case ADD_QUESTION_TO_USER:
      const {id, author} = action.questionDetails
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat(id)
        }
      }
    default:
      return state
  }
}

