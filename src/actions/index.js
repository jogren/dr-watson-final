export const createUser = user => ({
  type: 'CREATE_USER',
  user
});

export const removeUser = () => ({
  type: 'REMOVE_USER'
});

export const hasErrored = errorMsg => ({
  type: 'HAS_ERRORED',
  errorMsg
})

export const addNewMessage = messages => ({
  type: 'ADD_NEW_MESSAGE',
  messages
})

export const clearAllMessages = () => ({
  type: 'CLEAR_ALL_MESSAGES',
})