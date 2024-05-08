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

  $('#new-todo-form').submit(function(event) {
    event.preventDefault();

    const taskDescription = $('#new-todo').val();

    $.ajax({
      type: 'POST',
      url: '/todos/',
      data: { 'new-todo': taskDescription },
      success: function(response) {
        const { category, listId } = response;
        const listItem = $('<li>').text(taskDescription);
        $('#' + listId).append(listItem);
        fetchTodos();
      },
      error: function(xhr, status, error) {
        console.error('Error adding task:', error);
      }
    });
  });
});
