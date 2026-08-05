import React, { useRef, useState } from "react";
import Counter from "./Components/Counter";
import "./styles/style.css";
import PostItem from "./Components/PostItem";
import Postlist from "./Components/Postlist";
import MyButton from "./Components/UI/btn/MyButton";
import MyInput from "./Components/UI/input/MyInput";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "Java", body: "Java - использовалась для разработки" },
    { id: 2, title: "Java 2", body: "Java - использовалась для разработки" },
    { id: 3, title: "Java 3", body: "Java - использовалась для разработки" },
    { id: 4, title: "Java 4", body: "Java - использовалась для разработки" },
    { id: 5, title: "Java 5", body: "Java - использовалась для разработки" },
    { id: 6, title: "Java 6", body: "Java - использовалась для разработки" },
  ]);

  // const bodyInputRef = useRef()
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const addNewPost = (e) => {
    e.preventDefault();
    console.log(title);
    console.log(body);
    const newPost = {
      id: Date.now(),
      title,
      body,
    };
    setPosts([...posts, newPost])
    setTitle('')
    setBody('')
  };

  return (
    <div className="App">
      <form>
        <MyInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Название поста"
        ></MyInput>
        <MyInput
          value={body}
          onChange={(e) => setBody(e.target.value)}
          type="text"
          placeholder="Описание"
        ></MyInput>
        {/* <MyInput ref = {bodyInputRef} type='text' placeholder = 'Описание'></MyInput> */}
        <MyButton onClick={addNewPost}>Create Post</MyButton>
      </form>
      <Postlist posts={posts} title="Список постов 1" />
    </div>
  );
}

export default App;
