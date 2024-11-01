import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Tasks from "../src/components/Tasks";
import Create from "../src/components/Create";

let POSTS = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
];
const wait = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));

const HomePage = () => {
  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...POSTS]),
  });

  const postsMutation = useMutation({
    mutationFn: (newPost) => {
      POSTS = [...POSTS, newPost];
      console.log("POSTS", POSTS);
      return wait(1000).then(() => console.log("POSTS", POSTS));
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (updatedPost) => {
      POSTS = POSTS.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      );
      return wait(1000).then(() => [...POSTS]);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["posts"], data);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => {
      POSTS = POSTS.filter((post) => post.id !== id);
      return wait(1000).then(() => [...POSTS]);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["posts"], data);
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
