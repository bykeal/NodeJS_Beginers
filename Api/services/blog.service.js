const blogModel = require('../model/blog.model');
const BlogModel = require('../model/blog.model');
const { message } = require('../utils/custom.error');
const customError = require("../utils/custom.error");

class blogService{
   async createPost(data){
    //    console.log('this is the console data',data);
        const {title, description , author} = data;
        // if (title || description || author ) throw new customError('invalid');
       blogModel.find({title: data.title}).then(message => {
                if(message.length > 0) throw new Error('invalid');
            });
        // const blog = new BlogModel({
        //     title : data.title,
        //     description : data.description,
        //     author: data.author
        // });
        // return blog.save();
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