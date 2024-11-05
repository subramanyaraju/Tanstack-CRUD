import { deleteTodo } from "../api/todoApi";

const baseUrl = 'http://localhost:8000/todos';

export const apiEndPoints = {
    addTodo: {
        apiId: 1,
        url: baseUrl,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    },
    getTodo: {
        apiId: 2,
        url: baseUrl,
        method: 'GET',
    },

    deleteTodo: {
        apiId: 3,
        url: baseUrl,
        method: 'DELETE',
    }
};