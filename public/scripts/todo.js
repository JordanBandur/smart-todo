$(document).ready(function() {
  // Gets the todos and displays them
  function fetchTodos() {
    $.ajax({
      url: '/todos',
      type: 'GET',
      success: function(data) {
        const { categorizedTodos } = data;
        updateTodoDisplay(categorizedTodos);
      },
      error: function(error) {
        console.error('Error fetching todos:', error);
      }
    });
  }

  function escapeCategoryId(id) {
    return id.replace(/[^A-Z0-9]+/ig, "\\$&"); // This escapes special characters with a backslash
  }

  function updateTodoDisplay(categorizedTodos) {
    const container = $('.todo-container');
    container.empty(); // Clear the container before updating

    Object.keys(categorizedTodos).forEach(function(category) {
      const listId = category.toLowerCase().replace(/\s+/g, '-') + '-list';  // Create a unique list ID by category
      let sectionHtml = `<section class="card ${category}">
      <h2>${category}</h2>
      <ul id="${listId}">`;

      categorizedTodos[category].forEach(title => {
        sectionHtml += `<li>${title}</li>`;  // Directly using title received from backend
      });

      sectionHtml += `</ul></section>`;
      container.append(sectionHtml);
    });
  }

  // Event listener for toggling task completion
  $('.todo-container').on('click', 'li', function() {
    $(this).toggleClass('completed');
  });

  fetchTodos(); // Initial fetch

  // POST todo
  $('#new-todo-form').submit(function(event) {
    event.preventDefault();

    const taskDescription = $('#new-todo').val();

    $.ajax({
      type: 'POST',
      url: '/todos/',
      data: { 'new-todo': taskDescription },
      success: function(response) {

        const { category } = response;
        const categoryName = (typeof category === 'object' && category.name) ? category.name : category;
        if (typeof categoryName === 'string') {
          const listId = escapeCategoryId(categoryName.toLowerCase().replace(/\s+/g, '-')) + '-list';
          const listItem = $('<li>').text(taskDescription);
          $('#' + listId).prepend(listItem);
        }

        $('#new-todo').val('');
      },
      error: function(xhr, status, error) {
        console.error('Error adding task:', error);
      }
    });
  });

  $('#random-todo').click(function() {
    $(this).prop('disabled', true).text('Loading...');

    $.ajax({
      url: '/suggest-todo',
      type: 'POST',
      success: function(data) {
        if (data.success) {
          $('#new-todo').val(data.suggestion);
        } else {
          alert('Failed to get suggestion: ' + data.message);
        }
        $('#random-todo').prop('disabled', false).text('Suggest');
      },
      error: function() {
        alert('Error contacting server.');
      }
    });
  });
});
