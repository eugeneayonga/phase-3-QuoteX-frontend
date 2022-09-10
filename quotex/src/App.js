// import logo from './logo.svg';
import './App.css';
import Home from "./Home";
import NavBar from "./NavBar";
import Quotes from "./Quotes";
import FormPage from './FormPage';
import { Route } from "react-router-dom";
import { useState, useEffect } from "react";


function App() {
  const [quotes, setQuotes] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    fetch(`http://localhost:9292/quotes`)
      .then((response) => response.json())
      .then((data) => {
        setQuotes(data);
      });
  }, []);

  function addQuotes(newQuote) {
    const updatedQuotes = [newQuote, ...quotes];
    setQuotes(updatedQuotes);
  }

  function addReview(newReview) {
    const quoteToUpdate = quotes.find((quote) => {
      return quote.id === newReview.quote_id;
    });

    const updatedReviews = [newReview, ...quoteToUpdate.reviews];
    quoteToUpdate.reviews = updatedReviews;
    setQuotes(
      quotes.map((quote) => (quote.id === quoteToUpdate.id ? quoteToUpdate : quote))
    );

    setReviews(updatedReviews);
  }

  function handleUpdateLikes(updateLikes) {
    const updatedLikes = quotes.map((quote) => {
      return quote.id === updateLikes.id ? updateLikes : quote;
    });
    setQuotes(updatedLikes);
  }
  function handleDeleteReview(deletedReview) {
    const quoteToUpdate = quotes.find((quote) => {
      return quote.id === deletedReview.quote_id;
    });

    const updatedReview = quoteToUpdate.reviews.filter((review) => {
      return review.id !== deletedReview.id;
    });

    quoteToUpdate.reviews = updatedReview;
    setQuotes(
      quotes.map((quote) => (quote.id === quoteToUpdate.id ? quoteToUpdate : quote))
    );
    setReviews(updatedReview);
  }

  const quotesToDisplay = quotes.filter((quote) => {
    return quote.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="App">
      <NavBar />
      <br />
      <Route path="/quotes">
        <Quotes
          handleUpdateLikes={handleUpdateLikes}
          addReview={addReview}
          quotes={quotes}
          quotesToDisplay={quotesToDisplay}
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          handleDeleteReview={handleDeleteReview}
          reviews={reviews}
        />
      </Route>
      <Route path="/formpage">
        <FormPage addQuotes={addQuotes} />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
    </div>
  );
}


export default App;









































// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
