export const messages = (state = [], action) => {
  switch(action.type) {
    case 'ADD_NEW_MESSAGE':
      return action.messages;
    case 'CLEAR_ALL_MESSAGES':
      return [];
    default:
      return state;
  }
}