const mongoose = require("mongoose");
const mongoUrl =
  "mongodb+srv://jdbalora:daniel123daniel@cluster0.vnasm0m.mongodb.net/blogListApp?retryWrites=true&w=majority";
mongoose.connect(mongoUrl);

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
