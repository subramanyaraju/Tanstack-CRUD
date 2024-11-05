import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo, getTodo, updateTodo, deleteTodo } from "../src/api/todoApi.js";
import Tasks from "../src/components/Tasks";
import Create from "../src/components/Create";


const HomePage = () => {
  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: ["todos"],
    queryFn: getTodo,
  });

  const postsMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (updatedTask) => updateTodo(updatedTask.id, updatedTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: (deletedId) => {
      queryClient.setQueryData(["todos"], (oldData) =>
        oldData ? oldData.filter((post) => post.id !== deletedId) : []
      );
    },
  });

  if (postsQuery.isLoading) return <h2>Loading...</h2>;
  if (postsQuery.isError) return <h2>Error</h2>;

  console.log("posts", postsQuery.data);
  console.log("error", postsQuery.error);
  return (
    <section className="flex flex-col gap-4 items-center">
      <Create postsMutation={postsMutation} />
      <Tasks
        postsQuery={postsQuery}
        postsMutation={postsMutation}
        updateMutation={updateMutation}
        deleteMutation={deleteMutation}
      />
    </section>
  );
};

export default HomePage;
