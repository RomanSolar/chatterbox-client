// RoomsView is an object which controls the DOM elements
// responsible for displaying and selecting rooms.

var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function () {
    RoomsView.$button.on('click', RoomsView.handleClick);
    RoomsView.$select.on('change', RoomsView.handleChange);
    // TODO: Perform any work which needs to be done
    // when this view loads.
  },

  clear: function () {
    RoomsView.$select.empty();
    var noRoom = document.createElement('option');
    noRoom.value = '';
    noRoom.innerText = '--Select a Room--';
    RoomsView.$select.append(noRoom);
  },

  render: function () {
    RoomsView.clear();
    for (var room in Rooms._data) {
      RoomsView.renderRoom(room, Rooms._data[room]);
    }
    var select = RoomsView.$select[0];
    var options = Array.prototype.map.call(select.children, option => option.value);
    if (options.indexOf(Rooms.roomname) !== 0) {
      select.value = Rooms.roomname;
    }
  },

  renderRoom: function (roomname, count = 0) {
    var roomOption = document.createElement('option');
    roomOption.value = roomname;
    roomOption.innerText = `(${count}) ${roomname}`;
    RoomsView.$select.append(roomOption);
  },

  selectRoom: function(roomName) {
    var select = RoomsView.$select[0];
    select.value = roomname;
    RoomsView.handleChange({target: select});
  },

  handleChange: function (event) {
    Rooms.roomname = event.target.value;
    MessagesView.render();
  },

  handleClick: function(event) {
    var roomname = prompt('Enter room name');
    if (roomname) {
      Rooms.add(roomname);
    }
  }

};
