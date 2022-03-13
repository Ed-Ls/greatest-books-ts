import classes from "./NoBooksFound.module.css";
import { Link } from "react-router-dom";

const NoBooksFound = () => {
  return (
    <div className={classes.noBooks}>
      <p>No Books found!</p>
      <Link className="btn" to="/new-book">
        Add a Book
      </Link>
    </div>
  );
};

export default NoBooksFound;
