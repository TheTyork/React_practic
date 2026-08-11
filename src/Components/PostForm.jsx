import React, { useState } from "react";
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/btn/MyButton";

const PostForm = ({create}) => {
  const [post, setPost] = useState({title: '', body: ''})

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = {
        ...post, id: Date.now()
    }
    create(newPost)
    console.log(newPost)
    setPost({ title: "", body: "" });
  };
  return (
    <form>
      <MyInput
        value={post.title}
        onChange={(e) => setPost({...post, title: e.target.value})}
        type="text"
        placeholder="Название поста"
      ></MyInput>
      <br/>
      <MyInput
        value={post.body}
        onChange={(e) => setPost({...post, body: e.target.value})}
        type="text"
        placeholder="Описание"
      ></MyInput>
      <br/>
      {/* <MyInput ref = {bodyInputRef} type='text' placeholder = 'Описание'></MyInput> */}
      <MyButton onClick={addNewPost}>Create Post</MyButton>
    </form>
  );
};

export default PostForm;
