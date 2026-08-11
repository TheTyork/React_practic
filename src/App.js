import React, { useMemo, useRef, useState } from "react";
import Counter from "./Components/Counter";
import "./styles/style.css";
import PostItem from "./Components/PostItem";
import Postlist from "./Components/Postlist";
import MyButton from "./Components/UI/btn/MyButton";
import MyInput from "./Components/UI/input/MyInput";
import PostForm from "./Components/PostForm";
import MySelect from "./Components/UI/select/MySelect";
import PostFilter from "./Components/PostFilter";

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
  const [filter, setFilter] = useState({sort: '', query: ''})


  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const sortedPosts = useMemo(() => {
    console.log("Отработало");
    if (filter.sort) {
      return [...posts].sort((a, b) =>
        a[filter.sort].localeCompare(b[filter.sort]),
      );
    }
    return posts;
  }, [filter.sort, posts]);

  const sortedAndSearchPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLocaleLowerCase().includes(filter.query),
    );
  }, [filter.query, sortedPosts]);

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {sortedAndSearchPosts.length !== 0 ? (
        <Postlist
          remove={removePost}
          posts={sortedAndSearchPosts}
          title="Список постов 1"
        />
      ) : (
        <h3 style={{ textAlign: "center" }}>Нет постов</h3>
      )}
    </div>
  );
}

export default App;
