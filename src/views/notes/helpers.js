export const getUsername = () => {
// Get Username

 return 'darshkpatel' // Temporary till OAuth done
}

export const getToDo = () => {

   return {
    markdown: `
    ## To Do
     - Example Task LOADED
     `,
    lastUpdated: new Date()
  } // Temporary till OAuth done
  }

export const saveToDo = (username, value) => {
    // Get Username
    console.log(`saving for ${username}`, value)
     return; // // Temporary till OAuth done
}
