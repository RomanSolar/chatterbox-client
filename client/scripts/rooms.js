// This object houses all the room _data_ for the app.
// Treat it like a data structure - add methods to interact
// with and manipulate the data.

var Rooms = {

  // TODO: Define how you want to store the list of rooms
  _data: {},
  roomname: '',

  // TODO: Define methods which allow you to add rooms, update the list,
  // mark a room as selected, etc.

  add: function(roomname) {
    Rooms._data[roomname] |= 0;
    RoomsView.renderRoom(roomname);
    Rooms.select(roomname);
  },

  select: function(roomname) {
    var select = RoomsView.$select[0];
    select.value = select.value === roomname ? '' : roomname;
    RoomsView.handleChange({target: select});
  }
};
