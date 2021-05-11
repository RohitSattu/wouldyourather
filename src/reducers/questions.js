import { ADD_QUESTION, RECEIVE_QUESTIONS, VOTE } from '../actions/questions'

export default function questions(state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      }
    case ADD_QUESTION:
      const { questionDetails } = action
      return {
        ...state,
        [questionDetails.id]: questionDetails
      }
    case VOTE:
      const { authedUser, qid, answer } = action.qa
      const otherOption = answer === "optionOne" ? "optionTwo" : "optionOne"
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.includes(authedUser) ? state[qid][answer].votes : state[qid][answer].votes.concat(authedUser)
          },
          [otherOption]: {
            ...state[qid][otherOption],
            votes: state[qid][otherOption].votes.filter((vote) => vote !== authedUser)
          }
        }
      }
    default:
      return state
  }
}