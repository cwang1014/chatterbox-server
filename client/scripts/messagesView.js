var MessagesView = {

  $chats: $('#chats'),

  initialize: function () {

    MessagesView.$chats.on('click', '.username', MessagesView.handleClick);
  },

  render: function () {

    MessagesView.$chats.html('');
    // console.log(Messages.items());
    Messages
      .items()
      .filter(message => Rooms.isSelected(message.roomname))
      .each(message => MessagesView.renderMessage(message));
  },

  renderMessage: function (message) {
    // console.log('message', message);
    var $message = MessageView.render(message);
    MessagesView.$chats.prepend($message);
  },

  handleClick: function (event) {
    // Get username from data attribute
    var username = $(event.target).data('username');
    if (username === undefined) { return; }

    Friends.toggleStatus(username, MessagesView.render);
  }

};
