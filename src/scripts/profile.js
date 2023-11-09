const redirectButton = document.querySelector('.profile__change-user--button');
const imageProfile = document.querySelector('.profile__image');
const nameProfile = document.querySelector('.profile__username');
const containerRepository = document.querySelector('.profile__ul');

const searchRepository = async (login) => {
  try {
    const fetchRepository = await fetch(
      `https://api.github.com/users/${login}/repos`,
    );
    const fetchRepositoryJSON = await fetchRepository.json();
    return fetchRepositoryJSON;
  } catch (error) {
    console.error(error);
  }
};

const renderRepository = (repositories) => {
  containerRepository.innerHTML = '';
  repositories.forEach(({ clone_url, name, description }) => {
    const li = document.createElement('li');
    const h4 = document.createElement('h4');
    const p = document.createElement('p');
    const a = document.createElement('a');

    h4.innerText = name;
    description === null
      ? (p.innerText = 'sem descrição')
      : (p.innerText = description);
    a.innerText = 'Repositório';
    a.setAttribute('href', clone_url);

    li.appendChild(h4);
    li.appendChild(p);
    li.appendChild(a);
    containerRepository.appendChild(li);
  });
};

const renderProfile = async ({ avatar_url, name, login }) => {
  imageProfile.setAttribute('src', avatar_url);
  nameProfile.innerText = name;
  const repository = await searchRepository(login);
  const lengthTotalArrayFromRepositories = repository.length / 2;
  const halfFromArraysFromRepositories = repository.slice(
    0,
    lengthTotalArrayFromRepositories,
  );
  repository.length >= 20
    ? renderRepository(halfFromArraysFromRepositories)
    : renderRepository(repository);
};

const redirect = () => (window.location.href = '../../index.html');
renderProfile(JSON.parse(localStorage.getItem('userData')));
redirectButton.addEventListener('click', redirect);
