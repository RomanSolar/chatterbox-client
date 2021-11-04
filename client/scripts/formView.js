// FormView is an object which houses all the message form functionality.
// Consider the provided code and complete the functionality.
// Apply what you learn here to other interactive views if necessary.

var FormView = {

  $form: $('form'),
  $message: $('#message'),
  $success: $('#success'),
  $error: $('#error'),

  initialize: function() {
    FormView.$form.on('submit', FormView.handleClick);
    FormView.$message.on('keyup', FormView.handleKeyup);
  },

  handleClick: function(event) {
    // Stop the browser from submitting the form
    event.preventDefault();
    Parse.create(null, FormView.handleSuccess, FormView.handleError);
  },

  handleKeyup: function(event) {
    if (event) {
      FormView.setStatus(event.target.value.length !== 0);
    }
  },

  setStatus: function(active) {
    var status = active ? null : 'true';
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  },

  handleSuccess: function(data, status, xmlRequest) {
    App.fetch();
    FormView.$message.text();
    FormView.setStatus(false);
    FormView.$error.hide();
    FormView.$success.text(`${xmlRequest.status}: ${status}`);
  },

  handleError: function(xmlRequest, status, error) {
    FormView.$error.text(`${xmlRequest.status}: ${error}`);
    FormView.$error.show();
  }
};
