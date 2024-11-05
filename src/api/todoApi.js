import { apiEndPoints } from '../dataTypes/enum.js';

export const addTodo = async (data) => {
    const config = apiEndPoints.addTodo;
    return await fetch(config.url, {
        method: config.method,
        headers: config.headers,
        body: JSON.stringify(data),
    }).then((response) => response.json());
};

export const getTodo = async () => {
    const config = apiEndPoints.getTodo;
    return await fetch(config.url, {
        method: config.method,
    }).then((response) => response.json());
};

export const updateTodo = async (id, data) => {
    const url = `${apiEndPoints.getTodo.url}/${id}`;
    return await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }).then((response) => response.json());
};

export const deleteTodo = async (id) => {
    const config = apiEndPoints.deleteTodo;
    const response = await fetch(`${config.url}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete the item");
    }

    return id;
};