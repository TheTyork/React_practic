import React, { useEffect, useMemo, useRef, useState } from "react";
import Counter from "./Components/Counter";
import "./styles/style.css";
import PostItem from "./Components/PostItem";
import Postlist from "./Components/Postlist";
import MyButton from "./Components/UI/btn/MyButton";
import MyInput from "./Components/UI/input/MyInput";
import PostForm from "./Components/PostForm";
import MySelect from "./Components/UI/select/MySelect";
import PostFilter from "./Components/PostFilter";
import MyModal from "./Components/UI/modal/MyModal";
import { usePosts } from "./hooks/usePosts";
import PostService from "./API/PosrService";
import Loader from "./Components/UI/loader/Loader";

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);
  const [isPostsLoading, setPostsLoading] = useState(false);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  useEffect(() => {
    fetchPosts();
  }, [filter]);

  async function fetchPosts() {
    setPostsLoading(true);
    const posts = await PostService.getAll();
    setPosts(posts);
    setPostsLoading(false);
  }

  return (
    <div className="App">
      <MyButton onClick={fetchPosts}>Заросить посты</MyButton>
      <MyButton onClick={() => setModal(true)}>Создать пост</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {isPostsLoading ? (
        <div style={{display: 'flex', justifyContent: 'center'} }>
          <Loader />
        </div>
      ) : (
        <Postlist
          remove={removePost}
          posts={sortedAndSearchPosts}
          title="Список постов 1"
        />
      )}
    </div>
  );
}

export default App;
