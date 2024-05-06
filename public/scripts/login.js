$(document).ready(function() {
  // Open modal
  $('#loginBtn').click(function() {
    $('#loginModal').show().attr('aria-hidden', 'false');
  });

  // Close modal when the close button is clicked
  $('.modal .close').click(function() {
    $('#loginModal').hide().attr('aria-hidden', 'true');
  });

  // Close modal when clicking outside of the modal content
  $(window).click(function(event) {
    if ($(event.target).is('.modal')) {
      $('#loginModal').hide().attr('aria-hidden', 'true');
    }
  });
});
