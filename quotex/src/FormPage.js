import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const FormPage = ({ addQuotes }) => {
  let history = useHistory();
  const [newQuote, setNewQuote] = useState({
    content: "",
    author: "",
    likes: 0,
  });
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewQuote({ ...newQuote, [name]: value });
  };
  function handleSubmit(event) {
    event.preventDefault();
    const addNewQuote = {
      content: newQuote.content,
      author: newQuote.author,
      likes: 0,
    };

    fetch(`http://localhost:9292/quotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addNewQuote),
    })
      .then((response) => response.json())
      .then(addQuotes);
    setNewQuote({
      content: "",
      author: "",
      likes: 0,
    });
    history.push("/quotes");
  }
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h4>Add new quotes: </h4>

        <input
          type="text"
          placeholder="Quote Content"
          name="content"
          value={newQuote.content}
          onChange={handleChange}
        ></input>
        <br />
        <input
          type="text"
          placeholder="Author"
          name="author"
          value={newQuote.author}
          onChange={handleChange}
        ></input>
        <br />

        <input className="button" type="submit" />
      </form>
      <img
        alt="quote"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAclBMVEUAAAD////MzMwsLCyZmZmJiYnZ2dkvLy9wcHBra2vFxcWDg4MhISH39/fo6OjJycnT09Px8fFXV1c2NjaQkJC7u7sMDAx1dXU8PDwbGxvd3d1HR0e1tbWkpKQWFhZQUFBiYmJ9fX2tra1VVVVJSUmdnZ3NsL97AAAD6ElEQVR4nO3dgVaiQBhA4RlSinAIStFAijZ9/1fcgRls7Wy7/Upa4/3OHkWxiHsQcWRLKQAAAAAAAAAAAAAAAAAAABxAn9D83Ct7rFPGmp57ZY9FLAG7DvXVCZRVGLGuTrKgOIxY1ydZELEEiCVALAFiCRBLgFgCxBIglgCxBIglQCwBYgkQS4BYAsQSIJYAsQSIJUAsAWIJEEuAWALEEiCWALEEiCVALAFiCRBLgFgCxBIglgCxBIglQCwBYgmEE6vs/32pYGK19tL0N/NETW+HKavU9iJ76CbTWzXTy4MXFEwsm6Z1N+MbNXexqsTNXyhVDLF0eviCAoplI/XexyqNqYdYd+aYtQ0wVm5vL/qpIdZ94WO9+BkHCjBW3A77rGrYZ1Wp32fl+vWIBYUY6/3TUNu9+rDPWunHwxd0GbHU1h2JpXcq1YcvKKBYd+61r7tO126q7S7LzF4Ufaylvf/X4butgGJ9PWIJEEuAWALEEiCWQECx6kqbxt8VPdljhLabWmqjq/6+0s5/7qcS97BMr/3Dl/ZbfGJ8J5xYz3pa1lXs77Kx4n4s5ukpa2f9fdHCvjfsp9KovzKrtT9CTaOnz2yb4cQq+jbu8o9YdgPybweze6XcJmUP5DvmUTVuKr391IKCifXoNhL/Rmcv1r27TvWi9VM+lt3i3Fe9XNjT8Nqt9tQ9w/4WS60avb9l7WJd2pal9Kqbzt2vIeoa5O9iJY+7NrtYSebuiD61oHBiTbvfsdL4PXYxVaV2L327WNVUrfZjqVf/mIvbstTcHiRkfrRqVWg98bMLH6u2893GNs37K2P0bnd2Wfuszmb27weu9m/e18IFBRXrqxFLgFgCxBIglkAwsTZVHrtDy/lGtW6dorgadeWCiXWVZI37eKe6UXN31KlvlpsxFxRMLLsq/qOwt0+kj/iI8K9CijWc65DFhftsUBdmO+aCAowVb5O137LqetTfyRlirGQ3qjXygkKMdUOsj/lYlR+/stcTPwRYmMnHXyYXUKyVH3Ow11dufGHz/Pww5oICivX1iCVALAFiCQQS6z/jySMJJFYzOYF5FkaskyHWJcXKo5PJk3OvLPCNlYv129jVZLH7M1Vz+zax/vF/tGpkMz0ZDk1rHW3z4UZq7CvA4f8fM0yzQjV+DFl3A1up8TPiSZOf64f6rmZm6c7QUkt3vm3R+jl67DHAn2+mY3+y1dZ9WnE3HBJl2Zl+pO/LPg39qWrvtqwmykf9iCcENtYw5r63z+oK6lHHSwMw09vhvYh7NfSBjH0lfDEff91l2jZvJ/a9HWe5Q6y59Bw/AAAAAAAAAAAAAAAAAAAu2G9VbyzMMfYk9QAAAABJRU5ErkJggg=="
      ></img>
    </div>
  );
};


export default FormPage;