import { useRef, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./NewCommentForm.module.css";

const NewCommentForm: React.FC<{
  bookId: string;
  onAddedComment: () => void;
}> = ({ bookId, onAddedComment }) => {
  const commentTextRef = useRef<HTMLTextAreaElement | null>(null);

  const { sendRequest, status, error } = useHttp(addComment);

  useEffect(() => {
    if (status === "completed" && !error) {
      onAddedComment();
    }
  }, [status, error, onAddedComment]);

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredText = commentTextRef.current?.value;

    if (commentTextRef.current?.value === "") {
      return;
    } else {
      sendRequest({
        commentData: { text: enteredText },
        bookId: bookId,
      });
    }
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && (
        <div className="centerd">
          <LoadingSpinner />
        </div>
      )}

      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows={3} ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
