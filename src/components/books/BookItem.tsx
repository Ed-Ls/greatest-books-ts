import classes from "./BookItem.module.css";
import { Link } from "react-router-dom";

//function to create stars
export const addStar = (numOfStars: number) => {
  var elements = [];

  for (let i = 0; i < numOfStars; i++) {
    elements.push(<span key={i} />);
  }

  while (elements.length <= 4) {
    let a = elements.length;
    elements.push(<span key={a} style={{ color: "#af98d3a8" }} />);
    a++;
  }
  return elements;
};

const BookItem: React.FC<{
  name: string;
  author: string;
  rate: number;
  id: string;
}> = ({ name, author, rate, id }) => {
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{name}</p>
        </blockquote>
        <figcaption>{author}</figcaption>
        <div className={classes.stars}>{addStar(rate)}</div>
      </figure>
      <Link to={`/books/${id}`} className="btn">
        View More
      </Link>
    </li>
  );
};

export default BookItem;
