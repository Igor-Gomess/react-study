import axios from 'axios';

// Base da URL: https://api.themoviedb.org/3/
// URL da API:  /movie/now_playing?api_key=2bae03f4d64cbf5eda6fee5faf331d08&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;