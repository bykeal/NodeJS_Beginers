const {Schema,model} = require('mongoose');
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    date : {
        type: Date,
        default: Date.now()
    },
    author: {
        type: String,
        required: true
    },
});

module.exports = model("Blog", blogSchema);