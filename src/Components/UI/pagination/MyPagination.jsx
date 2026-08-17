import { degrees } from "framer-motion";
import React from "react";
import { getPagesArray } from "../../../utils/page";

const MyPagination = ({totalPages, page, changePage}) => {
  let pagesArray = getPagesArray(totalPages);
    
    return(
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
    )
}

export default MyPagination