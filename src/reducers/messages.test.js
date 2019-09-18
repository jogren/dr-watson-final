import { messages } from './messages';

describe('messagesReducer', () => {
  it('should return the messages given to the action when ADD_NEW_MESSAGE is the type', () => {
    let mockState = []
    let mockAction = {
      type: 'ADD_NEW_MESSAGE',
      messages: [{
        message: 'Hi there, my name is Dr. Watson. I understand that you have been feeling happy. That is super exciting to hear!',
        isUser: false,
      }]
    }
    let expected = [{
      message: 'Hi there, my name is Dr. Watson. I understand that you have been feeling happy. That is super exciting to hear!',
      isUser: false,
    }]

    expect(messages(mockState, mockAction)).toEqual(expected)
  })

  it('should return an empty array when CLEAR_ALL_MESSAGES is the type', () => {
    let mockState = [{
      message: 'Hi there, my name is Dr. Watson. I understand that you have been feeling happy. That is super exciting to hear!',
      isUser: false,
    }]
    let mockAction = {
      type: 'CLEAR_ALL_MESSAGES',
    }
    let expected = []

    expect(messages(mockState, mockAction)).toEqual(expected)
  })

  it('should default to returning state', () => {
    let mockState = [{
      message: 'Hi there, my name is Dr. Watson. I understand that you have been feeling happy. That is super exciting to hear!',
      isUser: false,
    }]
    let mockAction = {
      type: 'TEST_DEFAULT',
    }
    
    expect(messages(mockState, mockAction)).toEqual(mockState)
  })
})