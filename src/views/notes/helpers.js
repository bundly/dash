import axios from 'axios';

const apiURL = process.env.REACT_APP_API_ENDPOINT || "http://localhost:5000"

export const getUsername = () => {
// Get Username

 return 'darshkpatel' // Temporary till OAuth done
}

export const getToDo = () => {
   return axios.get(`${apiURL}/todo`, {headers: ''}) // add auth headers
  }

export const saveToDo = (value) => {
   return axios.post(`${apiURL}/todo`, {headers: '', data: {markdown: value}}) // add auth headers
}
