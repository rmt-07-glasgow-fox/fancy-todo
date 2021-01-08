"use strict"

const readTodo = () => {
    Ajax.readTodo()
        .done(response => {
            console.log(response);
            $("#list-todo-container").empty()
            response.forEach(el => {
                let due_date = new Date(el.due_date).getFullYear()
                $('#list-todo-container').append(`
                <div class="d-flex text-muted pt-3">
                <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#6f42c1"/><text x="50%" y="50%" fill="#6f42c1" dy=".3em">32x32</text></svg>
                    <div class="pb-3 mb-0 small lh-sm border-bottom">
                        <p class="mb-0">
                            <strong class="d-block text-gray-dark">${el.title}</strong>
                            ${el.description}
                        </p>
                        <a href="">${due_date}</a>
                    </div>
                </div>
                `)
            });
        })
        .fail(err => {
            
            console.log(err);
        })
        .always(() => {
            console.log('always');
        })
}

const readOneTodo = (id) => {
    Ajax.readOneTodo(id)
        .done(response => {
            console.log(response);
        })
        .fail(err => {
            console.log(err);
        })
        .always(() => {
            console.log('always');
        })
}

const createTodo = (title, description, due_date) => {
    Ajax.createTodo(title, description, '', due_date)
        .done(response => {
            console.log(response);
        })
        .fail(err => {
            console.log(err);
        })
        .always(() => {
            console.log('always');
        })
}

const updateTodo = (id, title, description, status, due_date) => {
    Ajax.updateTodo(id, title, description, status, due_date)
        .done(response => {
            console.log(response);
        })
        .fail(err => {
            console.log(err);
        })
        .always(() => {
            console.log('always');
        })
}

const updateStatusTodo = (id, status) => {
    Ajax.updateStatusTodo(id, status)
        .done(response => {
            console.log(response);
        })
        .fail(err => {
            console.log(err);
        })
        .always(() => {
            console.log('always');
        })
}

const deleteTodo = (id) => {
    Ajax.deleteTodo(id)
        .done(response => {
            console.log(response);
        })
        .fail(err => {
            console.log(err);
        })
        .always(() => {
            console.log('always');
        })
}