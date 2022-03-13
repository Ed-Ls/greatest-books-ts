import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import BookForm from "../components/books/BookForm";
import useHttp from "../hooks/use-http";
import { addBook } from "../lib/api";

function NewBook() {
  const { sendRequest, status } = useHttp(addBook);
  const history = useHistory();

  const addBookHandler = (bookData: {}) => {
    sendRequest(bookData);
  };

  //navigate to the new url only when post is completed
  useEffect(() => {
    if (status === "completed") {
      history.push("/books");
    }
  }, [status, history]);

  return (
    <BookForm isLoading={status === "pending"} onAddBook={addBookHandler} />
  );
}

export default NewBook;
