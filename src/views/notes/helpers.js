import axios from 'axios';

const apiURL = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:5000';

export const getUsername = () => 'darshkpatel'; // Temporary till OAuth done

export const getToDo = () => axios.get(`${apiURL}/todo`, { headers: '' }); // add auth headers

export const saveToDo = (value) => axios.post(`${apiURL}/todo`, { headers: '', data: { markdown: value } }); // add auth headers
