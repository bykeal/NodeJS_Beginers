const BlogModel = require('../model/blog.model');
const CustomError = require("../utils/custom.error");

class blogService{
   async createPost(data){
        const {title, description , author} = data;
        const existingpost = await BlogModel.findOne({ title });
        if (existingpost) {
            throw new CustomError("Post title already exist")
        }
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
    async deleteAll(){
        return BlogModel.deleteMany({});
        
     }
}

module.exports = new blogService();