$(document).ready(function() {
  // Gets the todos and displays them
  function fetchTodos() {
    $.ajax({
      url: '/todos',
      type: 'GET',
      success: function(data) {
        console.log('data')
        const { categorizedTodos } = data;
        console.log('cat1', categorizedTodos)
        updateTodoDisplay(categorizedTodos);
      },
      error: function(error) {
        console.error('Error fetching todos:', error);
      }
    });
  }

  function updateCompleted(id, isCompleted) {
    $.ajax({
        url: `/todos-completed/${id}`,  // Updated to match server-side setup
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ completed: isCompleted }),
        success: function(data) {
            console.log('Update completed status:', data);
        },
        error: function(error) {
            console.error('Error updating todo:', error);
        }
    });
}




  function updateTodoDisplay(categorizedTodos) {
    const container = $('.todo-container');
    container.empty(); // Clear the container before updating

    Object.keys(categorizedTodos).forEach(function(category) {
      console.log('catego2', categorizedTodos)
      const listId = category.toLowerCase().replace(/\s+/g, '-').replace('/', '-') + '-list';
      // const listId = category.toLowerCase().replace(/\s+/g, '-') + '-list';
      let sectionHtml = `<section class="card ${category}">
      <h2>${category}</h2>
      <ul id="${listId}">`;

      categorizedTodos[category].forEach(todo => {
        sectionHtml += `<li id=${todo.id} class=${todo.completed ? 'completed' : ''}>${todo.title}</li>`;  // Directly using title received from backend
      });


      sectionHtml += `</ul></section>`;
      container.append(sectionHtml);

    });
  }

  // Event listener for toggling task completion
  $('.todo-container').on('click', 'li', function() {
    const isCompleted = $(this).toggleClass('completed').hasClass('completed');
    const taskId = $(this).attr('id');
    updateCompleted(taskId, isCompleted);
  });


  fetchTodos(); // Initial fetch



  function escapeCategoryId(id) {
    return id.replace(/[^A-Z0-9]+/ig, "\\$&"); // This escapes special characters with a backslash
  }

  // POST todo
  $('#new-todo-form').submit(function(event) {
    event.preventDefault();
    const taskDescription = $('#new-todo').val();
    $.ajax({
        type: 'POST',
        url: '/todos/',
        data: { 'new-todo': taskDescription },
        success: function(response) {
          console.log(response);
            const { category } = response;
            const categoryName = (typeof category === 'object' && category.name) ? category.name : category;
            const normalizedCategoryName = categoryName.toLowerCase().replace(/\s+/g, '-').replace('/', '-'); // Normalize the category name
            const listId = normalizedCategoryName + '-list';
            console.log(taskDescription);
            const listItem = $('<li>').text(taskDescription);
            $('#' + listId).prepend(listItem);
            console.log(listId);
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
