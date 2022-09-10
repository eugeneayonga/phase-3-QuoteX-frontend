import React, { useState } from "react";
import AddReview from "./AddReview";

const EachQuote = ({
  quote,
  handleUpdateLikes,
  handleDeleteReview,

  addReview,
}) => {
  const [displayReview, setDisplayReview] = useState(false);

  const showReview = (event) => {
    event.preventDefault();
    setDisplayReview(!displayReview);
  };

  function updateLikes() {
    const addLikes = {
      likes: quote.likes + 1,
    };

    fetch(`http://localhost:9292/quotes/${quote.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addLikes),
    })
      .then((response) => response.json())
      .then(handleUpdateLikes);
  }

  function deleteReview(id) {
    fetch(`http://localhost:9292/reviews/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => handleDeleteReview(data));
  }

  const eachReview = quote.reviews?.map((review) => (
    <li className="noBullet" key={review.id}>
      {/* <br /> */}
      <button className="deleteButton" onClick={() => deleteReview(review.id)}>
        ✖{" "}
      </button>
      {review.text}
    </li>
  ));

  return (
    <>
      <div className="quoteCard">
        <h3>{quote.content}</h3>
        <h4>{quote.author}</h4>

        <button className="button" onClick={updateLikes}>
          Likes: {quote.likes}
        </button>
        <br />
        <button className="button" onClick={showReview}>
          {displayReview ? "Hide Reviews" : "Show Reviews"}
        </button>

        {displayReview ? <ul>{eachReview}</ul> : null}
        <AddReview quote={quote} addReview={addReview} />
      </div>
      <hr />
    </>
  );
};


export default EachQuote;