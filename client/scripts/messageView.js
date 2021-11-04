// Whereas MessagesView controls the entire list of messages,
// MessageView is responsible for rendering a single message.

var createNode = (name, classList, innerText = '') => {
  var node = document.createElement(name);
  node.classList = classList;
  node.innerText = innerText;
  return node;
};

var MessageView = {
  render: (message) => {
    var chat = createNode('div', ['chat']);
    if (Friends._data.has(message.username)) {
      chat.classList.add('friend');
    }
    if (App.usernameRegExp.test(message.text)) {
      chat.classList.add('mention');
    }
    chat.appendChild(createNode('div', ['room'], message.roomname || 'lobby'));
    chat.appendChild(createNode('div', ['username'], message.username));
    chat.appendChild(createNode('div', [], message.text));
    return chat;
  }
};
