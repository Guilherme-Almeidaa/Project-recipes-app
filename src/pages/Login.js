import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../style/login.css';

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    loginEmail: '',
    password: '',
  });
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const verifyInput = () => {
    const { loginEmail, password } = loginInfo;
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail);
    const SIX = 6;
    const validPassword = password.length > SIX;

    return validEmail && validPassword;
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  const handleClick = () => {
    const item = { email: loginInfo.loginEmail };
    localStorage.setItem('user', JSON.stringify(item));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    setShouldRedirect(true);
  };

  if (shouldRedirect) {
    return <Redirect to="/comidas" />;
  }

  return (
    <div className="main">
      <p className="sign" align="center">Login</p>
      <form className="form1">
        <input
          type="email"
          className="un"
          name="loginEmail"
          data-testid="email-input"
          placeholder="Email"
          onChange={ handleChange }
        />
        <input
          type="password"
          className="pass"
          name="password"
          placeholder="Password"
          data-testid="password-input"
          required
          onChange={ handleChange }
        />
        <button
          type="button"
          className="submit"
          data-testid="login-submit-btn"
          disabled={ !verifyInput() }
          onClick={ handleClick }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
