import { startConversation, postMessage, endConversation } from './apiCalls';

describe('startConversation', () => {
  const mockFeeling = 'stressed';
  const mockResponse = {
    message: "Hi there, my name is Dr. Watson.  I understand tha…tressed.  What has been most stressful this week?"
  };

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });
    });
  });

  it('should call fetch with the correct url', () => {
    const url = 'https://drwatson-api.herokuapp.com/api/v1/start_session';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ feeling: mockFeeling })
    };
    startConversation(mockFeeling);

    expect(window.fetch).toHaveBeenCalledWith(url, options);
  });

  it('should return a new response message (HAPPY)', () => {
    expect(startConversation(mockFeeling)).resolves.toEqual(mockResponse);
  });

  it('should return an error (SAD)', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      });
    });

    expect(startConversation(mockFeeling)).rejects.toEqual(Error('Dr Watson is currently down.  Please try again later.'))
  });

  it('should return an error if promise rejects (SAD)', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('fetch failed.'))
    });

    expect(startConversation(mockFeeling)).rejects.toEqual(Error('fetch failed.'))
  });
});

describe('endConversation', () => {

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true
      });
    });
  });

  it('should call fetch with the correct url', () => {
    const url = 'https://drwatson-api.herokuapp.com/api/v1/end_session';
    endConversation();

    expect(window.fetch).toHaveBeenCalledWith(url);
  });

  it('should resolve with no errors', () => {
    expect(endConversation()).resolves.toEqual(undefined)
  });

  it('should return an error (SAD)', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      });
    });

    expect(endConversation()).rejects.toEqual(Error('There was a problem ending the session.  Please close the application.'));
  });

  it('should return an error if promise rejects (SAD)', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('fetch failed.'));
    });

    expect(endConversation()).rejects.toEqual(Error('fetch failed.'));
  });
});

describe('postMessage', () => {
  const mockNewMessage = 'This is a new message.'
  beforeEach(() => {
  })
  
  it('should call fetch with the proper URL', () => {
    const url = 'https://drwatson-api.herokuapp.com/api/message'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ newMessage: mockNewMessage })
    };

    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
      });
    });

    postMessage(mockNewMessage);

    expect(window.fetch).toHaveBeenCalledWith(url, options)
  })

  it('should return a new message', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({message: mockNewMessage})
      });
    });
    expect(postMessage(mockNewMessage)).resolves.toEqual({message: mockNewMessage})
  });

  it('should return an error if the promise resolves but the property ok is false', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      });
    });

    expect(postMessage(mockNewMessage)).rejects.toEqual(Error('Dr Watson is currently down.  Please try again later.'));
  });

  it('should return an error if the promise rejects', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject({
        message: 'Server is down.'
      });
    });

    expect(postMessage(mockNewMessage)).rejects.toEqual({ message: 'Server is down.'})
  })
})