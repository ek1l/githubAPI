const button = document.querySelector('.index__button');
const linkAPI = 'https://api.github.com/users';

export const fetchUserData = async () => {
  const inputText = document.querySelector('.index__input');
  if (inputText.value.length <= 0) return 'Insira um nome válido';
  try {
    const requisicao = await fetch(`${linkAPI}/${inputText.value}`);
    const requisicaoJSON = await requisicao.json();

    if (requisicaoJSON.message === 'Not Found') {
      window.location.href = '../src/pages/error.html';
    } else {
      const userData = {
        name: requisicaoJSON.name,
        avatar_url: requisicaoJSON.avatar_url,
        login: requisicaoJSON.login,
      };
      localStorage.setItem('userData', JSON.stringify(userData));
      window.location.href = '../src/pages/profile.html';
    }
  } catch (error) {
    console.error(error);
  }
};

button.addEventListener('click', fetchUserData);
