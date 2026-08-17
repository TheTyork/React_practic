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
import { useFetching } from "./hooks/useFetching";
import { getPageCount, getPagesArray } from "./utils/page";

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);
  let pagesArray = getPagesArray(totalPages);

  const [fetchPosts, isPostsLoading, PostError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      setPosts(response.data);
      const totalCount = response.headers["x-total-count"];
      setTotalPages(getPageCount(totalCount, limit));
    },
  );

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  useEffect(() => {
    fetchPosts(limit, page);
  }, [filter]);

  const changePage = (page) => {
    setPage(page);
    fetchPosts(limit, page);
  };

  return (
    <div className="App">
      <MyButton onClick={fetchPosts}>Заросить посты</MyButton>
      <MyButton onClick={() => setModal(true)}>Создать пост</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />

      {PostError && <h1>Произошла ошибка</h1>}

      {isPostsLoading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Loader />
        </div>
      ) : (
        <Postlist
          remove={removePost}
          posts={sortedAndSearchPosts}
          title="Список постов 1"
        />
      )}
      <div className="page_wrapper">
        {pagesArray.map((p) => (
          <span
            onClick={() => {changePage(p)}}
            key={p}
            className={page === p ? "page page_curent" : "page"}
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

export default App;
