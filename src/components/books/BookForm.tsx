import { Fragment, useRef, useState } from "react";
import { Prompt } from "react-router-dom";

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./BookForm.module.css";

const BookForm: React.FC<{
  onAddBook: ({}) => void;
  isLoading: any;
}> = ({ onAddBook, isLoading }) => {
  const [isEntering, setIsEntering] = useState(false);
  const [rate, setRate] = useState(0);

  const authorInputRef = useRef<HTMLInputElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const notesInputRef = useRef<HTMLTextAreaElement | null>(null);

  function submitFormHandler(event: React.FormEvent) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current?.value;
    const enteredRate = rate;
    const enteredName = nameInputRef.current?.value;
    const enteredNotes = notesInputRef.current?.value;

    // optional: Could validate here

    onAddBook({
      author: enteredAuthor,
      notes: enteredNotes,
      rate: enteredRate,
      name: enteredName,
    });
  }

  const formFocusedHandler = () => {
    setIsEntering(true);
  };

  const finishEnteringHandler = () => {
    setIsEntering(false);
  };

  return (
    <Fragment>
      <Prompt
        when={isEntering}
        message={(location) =>
          "Are you sure you want to leave ? All your entered data will be lost"
        }
      />
      <Card>
        <form
          onFocus={formFocusedHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} required />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" ref={nameInputRef} required />
          </div>

          <div className={classes.control}>
            <label htmlFor="rating">Rating</label>
            <section id={classes.rate} className={classes.rating}>
              <input
                type="radio"
                id="star_5"
                name="rate"
                value="5"
                onClick={() => setRate(5)}
              />
              <label htmlFor="star_5" title="Five">
                &#9733;
              </label>

              <input
                type="radio"
                id="star_4"
                name="rate"
                value="4"
                onClick={() => setRate(4)}
              />
              <label htmlFor="star_4" title="Four">
                &#9733;
              </label>

              <input
                type="radio"
                id="star_3"
                name="rate"
                value="3"
                onClick={() => setRate(3)}
              />
              <label htmlFor="star_3" title="Three">
                &#9733;
              </label>

              <input
                type="radio"
                id="star_2"
                name="rate"
                value="2"
                onClick={() => setRate(2)}
              />
              <label htmlFor="star_2" title="Two">
                &#9733;
              </label>

              <input
                type="radio"
                id="star_1"
                name="rate"
                value="1"
                onClick={() => setRate(1)}
              />
              <label htmlFor="star_1" title="One">
                &#9733;
              </label>
            </section>
          </div>

          <div className={classes.control}>
            <label htmlFor="notes">My Notes</label>
            <textarea id="notes" rows={4} ref={notesInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button onClick={finishEnteringHandler} className="btn">
              Add Book
            </button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default BookForm;
