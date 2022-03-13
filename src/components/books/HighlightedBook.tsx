import classes from "./HighlightedBook.module.css";
import { addStar } from "./BookItem";

const HighlightedBook: React.FC<{
  loadedBook: {
    name: string;
    author: string;
    rate: number;
    notes: string;
  };
}> = ({ loadedBook }) => {
  console.log(loadedBook);
  return (
    <figure className={classes.book}>
      <h1>{loadedBook.name}</h1>
      <figcaption>By {loadedBook.author}</figcaption>
      <div className={classes.stars}>{addStar(loadedBook.rate)}</div>
      <h2>My Notes: </h2>
      <p>{loadedBook.notes}</p>
    </figure>
  );
};

export default HighlightedBook;
