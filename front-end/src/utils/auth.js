const STORAGE_KEY = 'AudamyRoutesPrivate';

const isLogged = () => !!sessionStorage.getItem(STORAGE_KEY);

const setToken = token => sessionStorage.setItem(STORAGE_KEY, token);
const getToken = () => sessionStorage.getItem(STORAGE_KEY);
const removeToken = () => sessionStorage.removeItem(STORAGE_KEY);


export { isLogged, setToken, removeToken, getToken }
