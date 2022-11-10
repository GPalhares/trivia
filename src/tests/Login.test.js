import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';


describe('Testa o componente "Login.js":', () => {
  test('1) O componente, definido como página inicial, deve possuir a rota "/".', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toBe('/');
  });
  test('2) Deve ser exibido um input para "Nome do jogador", um input para "E-mail", um botão "Play" e um botão "Configurações".', () => {
    renderWithRouterAndRedux(<App />);
    const playerName = screen.getByTestId('input-player-name');
    const playerEmail = screen.getByTestId('input-gravatar-email');
    const playButton = screen.getByTestId('btn-play');
    const configButton = screen.getByTestId('btn-settings')
    expect(playerName).toBeInTheDocument();
    expect(playerEmail).toBeInTheDocument();
    expect(playButton).toBeInTheDocument();
    expect(configButton).toBeInTheDocument();
  });
  test('3) O botão "Play" deve estar indisponível caso os insputs não estejam preenchidos corretamente.', () => {
    renderWithRouterAndRedux(<App />);
    const playerName = screen.getByTestId('input-player-name');
    const playerEmail = screen.getByTestId('input-gravatar-email');
    const playButton = screen.getByTestId('btn-play');
    expect(playButton).toBeDisabled();
    userEvent.type(playerName, 'Tibúrcio');
    expect(playButton).toBeDisabled();
    userEvent.type(playerEmail, 'tibúrcio@professor.com');
    expect(playButton).toBeEnabled();
  });
  test('4) O botão "Play" deve fazer requisição para a API para obter o token e redirecionar a pessoa para tela de jogo.', async () => {
    const {history} = renderWithRouterAndRedux(<App />);
    const playerName = screen.getByTestId('input-player-name');
    const playerEmail = screen.getByTestId('input-gravatar-email');
    const playButton = screen.getByTestId('btn-play');
    userEvent.type(playerName, 'Tibúrcio');
    userEvent.type(playerEmail, 'tibúrcio@professor.com');
    act(() => userEvent.click(playButton));

    const headerPlayerName = await screen.findByTestId('header-player-name');
    expect(history.location.pathname).toBe('/game');
    const local = localStorage.getItem('token');
    expect(local).not.toBeNull();
  });
  test('5) A tela inicial deve conter um botão que leve para a configuração do jogo.', async () => {
    const {history} = renderWithRouterAndRedux(<App />);
    const configButton = screen.getByTestId('btn-settings')
    act(() => userEvent.click(configButton));
    expect(history.location.pathname).toBe('/config');
    const settingsTitle = screen.getByTestId('settings-title')
    expect(settingsTitle).toBeInTheDocument();
  });
});