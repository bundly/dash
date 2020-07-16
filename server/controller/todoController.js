
import User from '../models/usersModel';

const todoController = {

  update: async (req, res, next) => {
    try {
      const {username} = req.user
      if(!req.body.markdown) throw Error('Check request body, markdown not found');
       await User.updateOne({username}, {todo: {markdown: req.body.markdown, lastUpdated: new Date()}}, (err)=>{
          if(err) throw Error(err);
          res.json({status: 'updated'})
      })
    } catch (error) {
      next(error);
  }
},
  read: async (req, res, next) => {
    try {
      const { username } = req.user
      const user = await User.findOne({username})
      console.log(user)
      if(!user) throw Error('Not Found');
      res.json(user.todo)

    } catch (error) {
      next(error);
  }
}

}
export default todoController
