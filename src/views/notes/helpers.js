// import axios from 'axios';
// function getToken(){
//   const bundlyToken = localStorage.getItem('bundly-token');
//   let githubToken
//   if(bundlyToken) githubToken = JSON.parse(atob(bundlyToken)).tokens[0].token.accessToken
//   // console.log(githubToken)
//   return { Authorization: `Token ${githubToken}`}
// }

export function getUsername(){
  const bundlyToken = localStorage.getItem('bundly-token');
  let username
  if(bundlyToken) username = JSON.parse(atob(bundlyToken)).username
  return username
}


// const apiURL = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:5000';

// export const getToDo = () => axios.get(`${apiURL}/todo`, { headers: getToken() }); // add auth headers

// export const saveToDo = (value) => axios.post(`${apiURL}/todo`, { headers: getToken() , data: { markdown: value } }); // add auth headers
export const saveToDo = (value) => localStorage.setItem('todo', value) // add auth headers
