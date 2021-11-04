var spoofMessage = (text) => ({ username: 'Mel Brooks', roomname: 'lobby', text: text });

describe('chatterbox', function() {

  describe('ajax behavior', function() {
    var ajaxSpy;

    before(function() {
      ajaxSpy = sinon.stub($, 'ajax');
      App.initialize('Florence Baum');
    });

    beforeEach(function() {
      ajaxSpy.reset();
    });

    describe('creating', function() {
      it('should submit a POST request via $.ajax', function(done) {
        Parse.create({});
        expect($.ajax.calledOnce).to.be.true;
        // sinon.spy method `args` comes in the form [function calls][arguments from that call]
        ajaxOptions = typeof $.ajax.args[0][0] === 'object' ? $.ajax.args[0][0] : $.ajax.args[0][1];
        expect(ajaxOptions.type).to.equal('POST');
        done();
      });

      it('should send the message along with the request as a stringified object', function(done) {
        Parse.create(spoofMessage('It\'s good to be the king'));
        ajaxOptions = typeof $.ajax.args[0][0] === 'object' ? $.ajax.args[0][0] : $.ajax.args[0][1];
        expect(ajaxOptions.data).to.be.a('string');
        expect(ajaxOptions.contentType).to.equal('application/json');
        done();
      });

      it('should send the correct message along with the request', function(done) {
        var message = spoofMessage('It\'s good to be the king');

        Parse.create(message);
        ajaxOptions = typeof $.ajax.args[0][0] === 'object' ? $.ajax.args[0][0] : $.ajax.args[0][1];
        var sentMessage = JSON.parse(ajaxOptions.data);
        expect(sentMessage).to.deep.equal(message);
        done();
      });

    });

    describe('fetching', function() {
      it('should submit a GET request via $.ajax', function(done) {
        Parse.readAll();
        expect($.ajax.calledOnce).to.be.true;
        ajaxUrl = typeof $.ajax.args[0][0] === 'string' ? $.ajax.args[0][0] : $.ajax.args[0][0].url;
        expect(ajaxUrl).to.equal(Parse.server);
        done();
      });

    });
  });

  describe('chatroom behavior', function() {
    it('should be able to add messages to the DOM', function() {
      MessagesView.renderMessage(spoofMessage('Never underestimate the power of the Schwartz!'));
      expect($('#chats').children().length).to.equal(1);
    });

    it('should be able to add rooms to the DOM', function() {
      RoomsView.renderRoom('superLobby');
      expect($('#rooms select').children().length).to.equal(1);
    });

  });

  describe('events', function() {
    it('should add a friend upon clicking their username', function() {
      sinon.spy(Friends, 'toggleStatus');

      App.initialize();
      MessagesView.renderMessage(spoofMessage('I didn\'t get a harumph outa that guy.!'));
      $('#chats').find('.username').trigger('click');
      expect(Friends.toggleStatus.called).to.be.true;

      Friends.toggleStatus.restore();
    });

    it('should add a room when clicking add', function() {
      sinon.spy(Rooms, 'add');
      var prompt = window.prompt;
      window.prompt = sinon.stub().returns('testroom');

      App.initialize();
      $('#rooms').find('button').trigger('click');
      expect(Rooms.add.called).to.be.true;

      window.prompt = prompt;
      Rooms.add.restore();
    });

    it('should try to send a message upon clicking submit', function() {
      sinon.spy(Parse, 'create');

      App.initialize();
      $('#message').val('Why so many Mel Brooks quotes?');
      $('form .submit').trigger('submit');
      expect(Parse.create.called).to.be.true;

      Parse.create.restore();
    });

    it('should highlight a message that mentions the user', function() {
      MessagesView.renderMessage(spoofMessage(`hey ${App.username.toUpperCase()}!`));
      expect($('.chat')[0].classList.contains('.mention'));
    });

    it('should not highlight a message if the username appears within another word', function () {
      MessagesView.renderMessage(spoofMessage(`hey${App.username.toUpperCase()}!`));
      expect(!$('.chat')[0].classList.contains('.mention'));
    });
  });
});
