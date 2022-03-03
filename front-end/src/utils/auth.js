const STORAGE_KEY = 'AudamyRoutesPrivate';
const STORAGE_ID = 'AudamyIdPrivate';

const isLogged = () => !!sessionStorage.getItem(STORAGE_KEY);
const login = token => sessionStorage.setItem(STORAGE_KEY, token);
const logout = () => sessionStorage.removeItem(STORAGE_KEY);
const getToken = () => sessionStorage.getItem(STORAGE_KEY);

const getId = () => sessionStorage.getItem(STORAGE_ID);
const setId = token => sessionStorage.setItem(STORAGE_ID, token);


export { isLogged, login, logout, getToken, getId, setId }
