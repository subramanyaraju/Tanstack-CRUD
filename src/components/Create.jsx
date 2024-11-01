import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Create = ({ postsMutation }) => {
  const [task, setTask] = useState({
    id: uuidv4(),
    title: "",
  });

  const handleChange = (e) => {
    setTask({
      ...task,
      title: e.target.value,
    });
  };

  const handleClick = () => {
    postsMutation.mutate({
      id: task.id,
      title: task.title,
    });
    setTask({ id: uuidv4(), title: "" });
  };
  return (
    <section className="container mx-auto my-12 flex flex-col justify-center items-center gap-4">
      <h1>Tanstack Query</h1>

      <input
        className="p-2 border border-gray-300 rounded-md focus:outline-none"
        type="text"
        placeholder="Add Task"
        value={task.title}
        onChange={handleChange}
      />
      <button
        className="p-2 bg-green-500 rounded-md text-white hover:bg-green-600"
        disabled={postsMutation.isLoading}
        onClick={handleClick}
      >
        Add Post
      </button>
    </section>
  );
};

export default Create;
