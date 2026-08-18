import React, { use, useEffect, useState } from "react";
import { useFetcher, useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PosrService";
import Loader from "../Components/UI/loader/Loader";

const PostIdPage = (props) => {
  const param = useParams();
  const [post, setPost] = useState({});
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(param.id);
    setPost(response.data);
  });
  useEffect(() => {
    fetchPostById(param.id);
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
    </div>
  );
};

export default PostIdPage;
