const STORAGE_KEY = 'AudamyRoutesPrivate';
const STORAGE_ID = 'AudamyIdPrivate';


const isLogged = () => !!sessionStorage.getItem(STORAGE_KEY);

const setToken = token => sessionStorage.setItem(STORAGE_KEY, token);
const getToken = () => sessionStorage.getItem(STORAGE_KEY);
const removeToken = () => sessionStorage.removeItem(STORAGE_KEY);


const getId = () => sessionStorage.getItem(STORAGE_ID);
const setId = token => sessionStorage.setItem(STORAGE_ID, token);


export { isLogged, setToken, removeToken, getToken, getId, setId }
