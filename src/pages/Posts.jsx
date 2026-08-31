import React, { useEffect, useState, useRef } from "react";
import Counter from "../Components/Counter";
import "../styles/style.css";
import PostItem from "../Components/PostItem";
import Postlist from "../Components/Postlist";
import MyButton from "../Components/UI/btn/MyButton";
import MyInput from "../Components/UI/input/MyInput";
import PostForm from "../Components/PostForm";
import MySelect from "../Components/UI/select/MySelect";
import PostFilter from "../Components/PostFilter";
import MyModal from "../Components/UI/modal/MyModal";
import { usePosts } from "../hooks/usePosts";
import PostService from "../API/PosrService";
import Loader from "../Components/UI/loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { getPageCount, getPagesArray } from "../utils/page";
import MyPagination from "../Components/UI/pagination/MyPagination";
import { option } from "framer-motion/client";
import { useObserver } from "../hooks/useObserver";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();

  const [fetchPosts, isPostsLoading, PostError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      setPosts([...posts, ...response.data]);
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

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {setPage(page + 1)})

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  const changePage = (page) => {
    setPage(page);
  };

  return (
    <div className="App">
      <MyButton onClick={() => setModal(true)}>Создать пост</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <MySelect
      value={limit}
      onChange={value => setLimit(value)}
      defoultvalue='Количество элементов на странице'
      option={[
        {value: 5, name: "5"},
        {value: 10, name: "10"},
        {value: 25, name: "25"},
        {value: -1, name: 'Показать все'},
      ]}/>
      {PostError && <h1>Произошла ошибка</h1>}
      <Postlist
        remove={removePost}
        posts={sortedAndSearchPosts}
        title="Список постов 1"
      />
      <div ref={lastElement} style={{ height: 20, background: "red" }}></div>
      {isPostsLoading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Loader />
        </div>
      )}
      <MyPagination
        changePage={changePage}
        page={page}
        totalPages={totalPages}
      />
    </div>
  );
}

export default Posts;
