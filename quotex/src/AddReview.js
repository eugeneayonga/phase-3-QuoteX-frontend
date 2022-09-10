import React, { useState } from "react";

const AddReview = ({ addReview, quote }) => {

    const [newReview, setNewReview] = useState({
      text: "",
      quote_id: quote.id,
    });


    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
  
      setNewReview({ ...newReview, [name]: value });
    };


    function handleSubmit(event) {
      event.preventDefault();
  
      const addNewReview = {
        text: newReview.text,
        quote_id: newReview.quote_id,
      };
  

      fetch(`http://localhost:9292/quotes/${quote.id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addNewReview),
      })
        .then((response) => response.json())
        .then((data) => addReview(data));
      setNewReview({
        text: "",
        quote_id: newReview.quote_id,
      });
    }

    
    return (
      <div>
        <form className="form" onSubmit={handleSubmit}>
          <h5>Add new review : </h5>
  
          <textarea
            type="text"
            placeholder="Review"
            name="text"
            value={newReview.text}
            onChange={handleChange}
          ></textarea>
  
          <br />
          <input className="button" type="submit" />
        </form>
      </div>
    );
};


export default AddReview;