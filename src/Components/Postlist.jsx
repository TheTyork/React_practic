import React from "react";
import PostItem from "./PostItem";
import { motion, AnimatePresence } from "framer-motion";

const PostList = ({ posts, title, remove }) => {
  if (!posts.length) {
    return <h3 style={{ textAlign: "center" }}>Нет постов</h3>;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      <AnimatePresence>
        {posts.map((post) => (
          <motion.div
            key={post.id}
            // Анимация появления (при добавлении элемента)
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            // Анимация удаления (уход влево)
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <PostItem removeP={remove} post={post} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default PostList;