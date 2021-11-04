// MessagesView is an object which controls the DOM elements
// responsible for displaying messages.

var MessagesView = {

  $chats: $('#chats'),
  initialize: function() {
    // TODO: Perform any work which needs to be done
    // when this view loads.


  },

  clear: function() {
    MessagesView.$chats.empty();
  },

  render: function() {
    MessagesView.clear();
    for (var message of Messages._data) {
      if (Rooms.roomname === '' || Rooms.roomname === message.roomname) {
        MessagesView.renderMessage(message, true);
      }
    }
  },

  renderMessage: function(message, atEnd = false) {
    if (message.username && message.text) {
      var rendered = MessageView.render(message);
      if (atEnd) {
        MessagesView.$chats.append(rendered);
      } else {
        MessagesView.$chats.prepend(rendered);
      }
    }
  },

  handleClick: function(event) {
    // TODO: handle a user clicking on a message
    // (this should add the sender to the user's friend list).
    Friends.toggleStatus(event.target.innerText);
    MessagesView.render();
  }

};
