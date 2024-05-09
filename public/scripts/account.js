$(document).ready(function() {
  // Open and close modal logic
  $('#accountBtn').click(function() {
    $('#accountModal').show().attr('aria-hidden', 'false');
  });

  $('.modal .close').click(function() {
    $('#accountModal').hide().attr('aria-hidden', 'true');
  });

  $(window).click(function(event) {
    if ($(event.target).is('.modal')) {
      $('#accountModal').hide().attr('aria-hidden', 'true');
    }
  });

  // Function to set action and submit form
  const setAction = function(action) {
    $('#action').val(action); // Set the action type

    $('form').submit(); // Submit the form
  };

  $('.update-button').click(function() {
    setAction('update');
  });

  $('.logout-button').click(function() {
    setAction('logout');
  });
});
