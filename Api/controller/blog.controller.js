const blogSevice = require('../services/blog.service');
class BlogController {

    async create(req,res,next){
        const {title, description} = req.body;
        const user = res.locals.pin;
        try {
            console.log(req.body);
            const result = await blogSevice.createPost({title:title, author: user, description: description});
            console.log(result);
            res.status(201).send({success: "true", response : "blog post created" , 
            data : result}); 
        } catch (error) {
            next(error);
            console.log(error)
        }
       
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
        const data = {author: res.locals.pin, ...req.body};
        const result = await blogSevice.update(data);
        res.status(201).send({success: "blog post updated ", response : result})
    }
    async deleteById(req,res){
        const result = await blogSevice.delete(req.query.id);
        res.status(201).send({success: "true", response : "blog post deleted succesfully.",data: result})
    }
    async delete(req,res){
        const result = await blogSevice.deleteAll();
    }
}



module.exports = new BlogController();