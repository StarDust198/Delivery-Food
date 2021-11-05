const login = (user, loginSelector = '.button-auth', 
    logoutSelector = '.button-out', usernameSelector = '.user-name') => {
    
    const loginElem = document.querySelector(loginSelector),
          logoutElem = document.querySelector(logoutSelector),
          usernameElem = document.querySelector(usernameSelector);

    loginElem.style.display = 'none';
    logoutElem.style.display = 'flex';
    usernameElem.style.display = 'flex';
    usernameElem.textContent = user.login;

    localStorage.setItem('user', JSON.stringify(user));
};

const logout = (user, loginSelector = '.button-auth', 
    logoutSelector = '.button-out', usernameSelector = '.user-name') => {
    
    const loginElem = document.querySelector(loginSelector),
          logoutElem = document.querySelector(logoutSelector),
          usernameElem = document.querySelector(usernameSelector);

    loginElem.style.display = 'flex';
    logoutElem.style.display = 'none';
    usernameElem.style.display = 'none';
    usernameElem.textContent = '';

    localStorage.removeItem('user');
};

export { login, logout };