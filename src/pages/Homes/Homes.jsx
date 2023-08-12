import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Homes.css";
import { CSSTransition } from "react-transition-group";

const Homes = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState(null);
  const [showQuote, setShowQuote] = useState(false);

  const fetchQuote = async () => {
    try {
      setError(null); // Clear any previous errors
      setShowQuote(false); // Hide the quote before fetching new data
      const response = await axios.get("https://api.quotable.io/random");
      const data = response.data;
      setQuote(data.content);
      setAuthor(data.author);
      setShowQuote(true); // Show the quote after data is fetched
    } catch (error) {
      console.error("Error fetching quote:", error);
      setError("An error occurred while fetching the quote.");
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const generateWhatsAppLink = () => {
    const whatsappLink = `https://api.whatsapp.com/send?text="${quote}" - ${author}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="quote-app">
      <div className="quote-container">
        <div className="TopHead">
          <strong>Random Quote Generator</strong>
        </div>
        <div>
          {error ? (
            <p className="error">{error}</p>
          ) : (
            <div className="quote-content">
              <CSSTransition
                in={showQuote}
                timeout={1000}
                classNames="quote-transition"
                unmountOnExit
              >
                <div>
                  <blockquote>{quote}</blockquote>
                  <p className="author">- {author}</p>
                </div>
              </CSSTransition>
              <div className="share-button-container">
                <button className="fetch-button" onClick={fetchQuote}>
                  Get New Quote
                </button>
                <button className="fetch-button" onClick={generateWhatsAppLink}>
                  Share on WhatsApp
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homes;
