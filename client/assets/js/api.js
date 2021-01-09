"use strict"

const baseUrl = 'http://localhost:3000'

class User {
    static login(email, password) {
        return $.ajax({
            method: 'POST',
            url: `${baseUrl}/login`,
            data: { email, password }
        })
    }

    static loginGoogle(id_token) {
        return $.ajax({
            method: 'POST',
            url: `${baseUrl}/loginGoogle`,
            data: { id_token }
        })
    }

    static register(email, password, name) {
        return $.ajax({
            method: 'POST',
            url: `${baseUrl}/register`,
            data: { email, password, name }
        })
    }
}

class Todo {
    static createTodo(title, description, status, due_date) {
        return $.ajax({
            method: "POST",
            url: `${baseUrl}/todos`,
            headers:{
                access_token: localStorage.access_token
            },
            data: { title, description, status, due_date }
        })
    }

    static readTodo() {
        return $.ajax({
            method: "GET",
            url: `${baseUrl}/todos`,
            headers:{
                access_token: localStorage.access_token
            }
        })
    }

    static readOneTodo(id) {
        return $.ajax({
            method: "GET",
            url: `${baseUrl}/todos/${id}`,
            headers:{
                access_token: localStorage.access_token
            }
        })
    }

    static updateTodo(id, title, description, status, due_date) {
        return $.ajax({
            method: "PUT",
            url: `${baseUrl}/todos/${id}`,
            headers:{
                access_token: localStorage.access_token
            },
            data: { title, description, status, due_date }
        })
    }

    static updateStatusTodo(id, status) {
        return $.ajax({
            method: "PATCH",
            url: `${baseUrl}/todos/${id}`,
            headers:{
                access_token: localStorage.access_token
            },
            data: { status }
        })
    }

    static deleteTodo(id) {
        return $.ajax({
            method: "DELETE",
            url: `${baseUrl}/todos/${id}`,
            headers:{
                access_token: localStorage.access_token
            }
        })
    }
}

class API {
    static getHolidayDate() {
        return $.ajax({
            method: "GET",
            url: `${baseUrl}/holidays`,
            headers:{
                access_token: localStorage.access_token
            }
        })
    }
}
