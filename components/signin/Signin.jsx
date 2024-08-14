import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signin.css";

function Signin() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [quote, setQuote] = useState('');

  const navigate = useNavigate();

  const quotes = [
    "The best way to get started is to quit talking and begin doing. – Walt Disney",
    "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty. – Winston Churchill",
    "Don’t let yesterday take up too much of today. – Will Rogers",
    "You learn more from failure than from success. Don’t let it stop you. Failure builds character. – Unknown",
    "It’s not whether you get knocked down, it’s whether you get up. – Vince Lombardi",
    "If you are working on something that you really care about, you don’t have to be pushed. The vision pulls you. – Steve Jobs",
    "People who are crazy enough to think they can change the world, are the ones who do. – Rob Siltanen",
    "Failure will never overtake me if my determination to succeed is strong enough. – Og Mandino",
    "Entrepreneurs are great at dealing with uncertainty and also very good at minimizing risk. That’s the classic entrepreneur. – Mohnish Pabrai",
    "We may encounter many defeats but we must not be defeated. – Maya Angelou",
    "Knowing is not enough; we must apply. Wishing is not enough; we must do. – Johann Wolfgang Von Goethe",
    "Imagine your life is perfect in every respect; what would it look like? – Brian Tracy",
    "We generate fears while we sit. We overcome them by action. – Dr. Henry Link",
    "Whether you think you can or think you can’t, you’re right. – Henry Ford",
    "Security is mostly a superstition. Life is either a daring adventure or nothing. – Helen Keller",
    "The man who has confidence in himself gains the confidence of others. – Hasidic Proverb",
    "The only limit to our realization of tomorrow is our doubts of today. – Franklin D. Roosevelt",
    "Creativity is intelligence having fun. – Albert Einstein",
    "What you lack in talent can be made up with desire, hustle and giving 110% all the time. – Don Zimmer",
    "Do what you can with all you have, wherever you are. – Theodore Roosevelt",
    "Develop an ‘Attitude of Gratitude’. Say thank you to everyone you meet for everything they do for you. – Brian Tracy",
    "You are never too old to set another goal or to dream a new dream. – C.S. Lewis",
    "To see what is right and not do it is a lack of courage. – Confucius",
    "Reading is to the mind, as exercise is to the body. – Brian Tracy",
    "Fake it until you make it! Act as if you had all the confidence you require until it becomes your reality. – Brian Tracy",
    "The future belongs to the competent. Get good, get better, be the best! – Brian Tracy",
    "For every reason it’s not possible, there are hundreds of people who have faced the same circumstances and succeeded. – Jack Canfield",
    "Things work out best for those who make the best of how things work out. – John Wooden",
    "A room without books is like a body without a soul. – Marcus Tullius Cicero",
    "I think goals should never be easy, they should force you to work, even if they are uncomfortable at the time. – Michael Phelps",
    "One of the lessons that I grew up with was to always stay true to yourself and never let what somebody else says distract you from your goals. – Michelle Obama",
    "Today’s accomplishments were yesterday’s impossibilities. – Robert H. Schuller",
    "The only way to do great work is to love what you do. – Steve Jobs",
    "You don’t have to be great to start, but you have to start to be great. – Zig Ziglar"
  ];  

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/login', loginData);
      console.log('User logged in:', response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      alert('Login successful');
      navigate('/');
      window.location.reload(); // Reload to update the navbar
    } catch (error) {
      console.error('There was an error logging in!', error);
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="Signin">
      <form onSubmit={handleSubmit}>
        <center><h2>Login Form</h2></center>
        <div className="quote">{quote}</div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="password-container">
          <label>Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
          <button type="button" className="show-password-toggle" onClick={toggleShowPassword}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signin;
