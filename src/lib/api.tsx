const FIREBASE_DOMAIN =
  "https://react-books-7c388-default-rtdb.europe-west1.firebasedatabase.app/";

export async function getAllBooks() {
  const response = await fetch(`${FIREBASE_DOMAIN}/books.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch books.");
  }

  const transformedBooks = [];

  for (const key in data) {
    const bookObj = {
      id: key,
      ...data[key],
    };

    transformedBooks.push(bookObj);
  }

  return transformedBooks;
}

export async function getSingleBook(bookId: string) {
  const response = await fetch(`${FIREBASE_DOMAIN}/books/${bookId}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch book.");
  }

  const loadedBook = {
    id: bookId,
    ...data,
  };

  console.log(loadedBook);

  return loadedBook;
}

export async function addBook(bookData: {}) {
  const response = await fetch(`${FIREBASE_DOMAIN}/books.json`, {
    method: "POST",
    body: JSON.stringify(bookData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create book.");
  }

  return null;
}

export async function addComment(requestData: {
  bookId: string;
  commentData: {};
}) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/comments/${requestData.bookId}.json`,
    {
      method: "POST",
      body: JSON.stringify(requestData.commentData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not add comment.");
  }

  return { commentId: data.name };
}

export async function getAllComments(BookId: string) {
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${BookId}.json`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not get comments.");
  }

  const transformedComments = [];

  for (const key in data) {
    const commentObj = {
      id: key,
      ...data[key],
    };

    transformedComments.push(commentObj);
  }

  return transformedComments;
}
