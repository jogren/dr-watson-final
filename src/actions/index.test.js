import { addNewMessage, clearAllMessages } from './index';

describe('addNewMessage', () => {
  it('should return an action object with the given messages', () => {
    const mockMessages = [{
      message: 'Hi there, my name is Dr. Watson. I understand that you have been feeling happy. That is super exciting to hear!',
      isUser: false,
    }]

    expect(addNewMessage(mockMessages)).toEqual({
      type: 'ADD_NEW_MESSAGE',
      messages: [{
        message: 'Hi there, my name is Dr. Watson. I understand that you have been feeling happy. That is super exciting to hear!',
        isUser: false,
      }]
    })
  })
})

describe('clearAllMessages', () => {
  it('should return an action object with the given messages', () => {
    expect(clearAllMessages()).toEqual({
      type: 'CLEAR_ALL_MESSAGES'    
    })
  })
})