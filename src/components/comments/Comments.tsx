import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import CommentsList from "./CommentsList";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);

  type bookParams = {
    bookId: string;
  };
  const { bookId } = useParams<bookParams>();

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(bookId);
  }, [sendRequest, bookId]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  //useCallback to recreate wheneaver the request function or quote ID changes
  const addedCommentHander = useCallback(() => {
    sendRequest(bookId);
  }, [sendRequest, bookId]);

  let comments;

  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "completed" && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments} />;
  }

  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p className="centered">No comments yet... </p>;
  }
  return (
    <section className={classes.comments}>
      <h2>Additional Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          New Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm bookId={bookId} onAddedComment={addedCommentHander} />
      )}
      {comments}
    </section>
  );
};

export default Comments;
