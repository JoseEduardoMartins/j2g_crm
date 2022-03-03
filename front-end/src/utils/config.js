const API_KEY = 'https://integracoes.audaces.com:3010';
//const API_KEY = 'http://localhost:3010';

function getApiKey() {
	return API_KEY
}

const FRONT_KEY = 'http://localhost:3000';

function getFrontKey() {
	return FRONT_KEY
}

export { getApiKey, getFrontKey }
