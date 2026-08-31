import React, { use, useEffect, useState } from "react";
import { useFetcher, useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PosrService";
import Loader from "../Components/UI/loader/Loader";
import MyButton from "../Components/UI/btn/MyButton";
import { useNavigate } from "react-router-dom";

const PostIdPage = (props) => {
  const router = useNavigate()
  const param = useParams();
  const [post, setPost] = useState({});
  const [coments, setCommets] = useState([]);
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(param.id);
    setPost(response.data);
  });
  const [fetchComment, isCommentsLoading, CommentError] = useFetching(
    async (id) => {
      const response = await PostService.getCommentsByID(param.id);
      setCommets(response.data);
    },
  );
  useEffect(() => {
    fetchPostById(param.id);
    fetchComment(param.id);
  }, [param.id]);

  return (
    <div>
      <h1>Это страница поста ID = {param.id}</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <h3>
            {post.id} {post.title}
          </h3>
          <div>{post.body}</div>
        </div>
      )}
      <h2> Комментарии</h2>
      {isCommentsLoading ? (
        <Loader />
      ) : (
        <div>
          {coments.map((comm) => (
            <div style={{ margin: 15 }}>
              <h5>{comm.email}</h5>
              <div>{comm.body}</div>
            </div>
          ))}
        </div>
      )}
      <MyButton onClick = {() => {router(`/posts`)}}>Назад</MyButton>
    </div>
  );
};

export default PostIdPage;
