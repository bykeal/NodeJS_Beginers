const BlogModel = require('../model/blog.model');
const customError = require("../utils/custom.error");

class blogService{
   async createPost(data){
    //    console.log('this is the console data',data);
        const {title, description , author} = data;
        // if (title || description || author ) throw new customError('invalid');
        // const check = BlogModel.exists({title: data.title});
        // check.then(message => {
        //     if(message.length >= 0) {
        //         const err = new Error('email already exists');
        //         err.status = 422;
        //         return reject(err);
        //     }
        // }
        // )
        const blog = new BlogModel({
            title : data.title,
            description : data.description,
            author: data.author
        });
        return blog.save();
    }

    async getAll(){
        return BlogModel.find()
    }
    async getById(id){
        return BlogModel.findById(id);
    }

    async update(data){
        console.log("data ........................", data);
       return BlogModel.findByIdAndUpdate(data.id,{title: data.title},{new: true});
       
    }

    async delete(id){
       return BlogModel.findByIdAndDelete(id);
       
    }
}

module.exports = new blogService();