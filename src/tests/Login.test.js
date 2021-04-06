import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Login from '../pages/Login';

const inputEmail = 'email-input';
const inputPassword = 'password-input';
const buttonEnter = 'login-submit-btn';
describe('Teste da Tela de Login', () => {
  test('Se existe os elementos esperados na tela', () => {
    renderWithRouter(<Login />);

    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('login-submit-btn')).toBeInTheDocument();
  });

  test('Se quando dijita email e senha fora do padrão continua desabilitado', () => {
    renderWithRouter(<Login />);

    userEvent.type(screen.getByTestId(inputEmail), 'xablau');
    userEvent.type(screen.getByTestId(inputPassword), '123456');

    expect(screen.getByTestId(buttonEnter)).toBeDisabled();

    userEvent.type(screen.getByTestId(inputEmail), 'alguem@alguem.com');
    userEvent.type(screen.getByTestId(inputPassword), '12345');

    expect(screen.getByTestId(buttonEnter)).toBeDisabled();
  });

  test('Se dijitar email e senha corretos o botão é habilitado', () => {
    renderWithRouter(<Login />);

    userEvent.type(screen.getByTestId(inputEmail), 'alguem@email.com');
    userEvent.type(screen.getByTestId(inputPassword), '1234562');

    expect(screen.getByTestId(buttonEnter)).toBeEnabled();
  });

  test('Se ao clicar no botão redireciona para tela Principal de receitas de comidas',
    () => {
      const { history } = renderWithRouter(<Login />);

      userEvent.type(screen.getByTestId(inputEmail), 'alguem@email.com');
      userEvent.type(screen.getByTestId(inputPassword), '1234562');
      expect(screen.getByTestId(buttonEnter)).toBeEnabled();

      fireEvent.click(screen.getByTestId(buttonEnter));

      const { pathname } = history.location;

      expect(pathname).toBe('/comidas');
    });
});
