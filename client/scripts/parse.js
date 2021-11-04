// The Parse object represents your connection to outside world!
// Or... just the Parse API. Populate this object with methods
// which send requests to the RESTful Parse API.

var Parse = {

  server: window.ENDPOINT,

  create: function(message, successCB, errorCB = null) {
    // TODO: send a request to the Parse API to save the message
    var data = message || {
      username: App.username,
      text: document.getElementById('message').value,
      roomname: Rooms.roomname || 'lobby'
    };
    $.ajax({
      url: Parse.server,
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: FormView.handleSuccess,
      error: FormView.handleError
    });
  },

  readAll: function(successCB, errorCB = null) {
    $.ajax({
      url: Parse.server,
      type: 'GET',
      data: { order: '-createdAt' },
      contentType: 'application/json',
      success: successCB,
      error: errorCB || function(error) {
        console.error('chatterbox: Failed to fetch messages', error);
      }
    });
  }

};
