// This App object represents the Chatterbox application.
// It should initialize the other parts of the application
// and begin making requests to the Parse API for data.

var App = {

  $spinner: $('.spinner img'),

  username: 'anonymous',

  loading: false,

  initialize: function(username) {
    $(document).on('click', '.room', (event) => Rooms.select(event.target.innerText));
    $(document).on('click', '.username', MessagesView.handleClick);
    $(document).on('click', '.submit', FormView.handleClick);
    App.username = username || window.location.search.substr(10);
    var usernameEscaped = App.username.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
    App.usernameRegExp = new RegExp(`\\b${usernameEscaped}\\b`, 'i');
    FormView.initialize();
    RoomsView.initialize();
    MessagesView.initialize();

    // Fetch initial batch of messages
    App.loadCycle();
    setInterval(App.loadCycle, 30000);

    // TODO: Make sure the app loads data from the API
    // continually, instead of just once at the start.

  },

  loadCycle: function() {
    if (!App.loading) {
      App.loading = true;
      App.startSpinner();
      App.fetch(() => {
        App.loading = false;
        App.stopSpinner();
      });
    }
  },

  fetch: function(callback = ()=>{}) {
    Parse.readAll((data) => {
      Messages._data = data;
      for (var room in Rooms._data) {
        Rooms._data[room] = 0;
      }
      for (var message of data) {
        let room = message.roomname;
        if (room !== null) {
          Rooms._data[room] = 1 + (Rooms._data[room] || 0);
        }
      }
      RoomsView.render();
      MessagesView.render();
      callback();
    });
  },

  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  }
};
