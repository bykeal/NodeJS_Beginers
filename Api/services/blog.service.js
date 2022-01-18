const BlogModel = require('../model/blog.model');
class blogService{
   async createPost(data){
    //    console.log('this is the console data',data);
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
       return BlogModel.findOneAndUpdate({_id: data.id },{title: data.title});
    }
}

module.exports = new blogService();