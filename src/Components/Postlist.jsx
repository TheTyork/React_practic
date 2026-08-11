import React, { useState } from "react";
import PostItem from "./PostItem";

const PostList = ({ posts, title, remove }) => {
  if (!posts.length) {
    return <h3 style={{ textAlign: "center" }}>Нет постов</h3>;
  }
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      {posts.map((post) => (
        <PostItem removeP={remove} post={post} key={post.id} />
      ))}
    </div>
  );
};

export default PostList;
