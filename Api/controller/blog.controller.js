const blogSevice = require('../services/blog.service');
class BlogController {

    async create(req,res){
       const result = await blogSevice.createPost(req.body);
       console.log(result);
       res.status(201).send({success: "true", response : "blog post created" , 
       data : result});
    }
    async getAll(req,res){
        const result = await blogSevice.getAll();
        res.status(200).send({success: "true", response : "blog posts gotten succesfully.",
            data: result});
    }
    async getOne(req,res){
        console.log('this is the output', req.query);
        const result = await blogSevice.getById(req.query.id);
        res.status(201).send({success: "true", response : "blog post gotten succesfully.",
        data: result});
    }
    async update(req,res){
       
        const result = await blogSevice.update(req.body);
        res.status(201).send({success: "true", response : result})
    }
    async delete(req,res){
        res.status(201).send({success: "true", response : "blog post deleted succesfully."})
    }
}



module.exports = new BlogController();