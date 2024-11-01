import React, { useState } from "react";

const Tasks = ({ postsQuery, updateMutation, deleteMutation }) => {
  const [activeId, setActiveId] = useState(false);
  const [task, setTask] = useState({
    id: "",
    title: "",
  });

  const handleChange = (e, id) => {
    const { value } = e.target;
    setTask({
      id,
      title: value,
    });
  };

  const handleEditClick = (id, title) => {
    if (activeId === id) {
      updateMutation.mutate(task);
      setActiveId(null);
    } else {
      setActiveId(id);
      setTask({ id, title });
    }
  };

  const handleDeleteClick = (id) => {
    deleteMutation.mutate(id);
  };

  return (
    <section className="flex flex-col gap-4 items-center">
      <h2>Tasks List</h2>
      {task.title}
      {postsQuery.data.map((post) => (
        <div className="flex items-center gap-4" key={post.id}>
          <input
            className="p-2 border border-gray-300 rounded-md focus:outline-none "
            type="text"
            value={activeId === post.id ? task.title : post.title}
            disabled={activeId !== post.id}
            onChange={(e) => handleChange(e, post.id)}
          />
          <button
            className="p-1 text-sm bg-blue-500 rounded-md text-white hover:bg-blue-600"
            onClick={() => handleEditClick(post.id, post.title)}
          >
            {activeId === post.id ? "Save" : "Edit"}
          </button>
          <button
            className="p-1 text-sm bg-red-500 rounded-md text-white hover:bg-red-600"
            onClick={() => handleDeleteClick(post.id)}
          >
            Completed
          </button>
        </div>
      ))}
    </section>
  );
};

export default Tasks;
