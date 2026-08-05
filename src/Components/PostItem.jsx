import React from "react";

const PostItem = (props) => {

return (
    <div className="post">
        <div className="post-content">
          <strong>{props.post.id} {props.post.title}</strong>
          <p>{props.post.body}</p>
        </div>
        <div className="delete_btn">
          <button>Удалить</button>
        </div>
      </div>
)

}

export default PostItem;