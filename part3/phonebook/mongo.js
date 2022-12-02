const mongoose = require("mongoose");

const password = process.argv[2];
const newName = process.argv[3];
const newNumber = process.argv[4];

const url = `mongodb+srv://jdbalora:${password}@cluster0.vnasm0m.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length < 3) {
  console.log(
    "Please provide the password, new name, and new number as an argument: node mongo.js <password> <new name> <new number>"
  );
  process.exit(1);
} else if (password && !newName && !newNumber) {
  mongoose.connect(url);

  Person.find({}).then((result) => {
    console.log("Phonebook:");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else {
  mongoose
    .connect(url)
    .then((result) => {
      console.log("connected");

      const person = new Person({
        name: newName,
        number: newNumber,
      });

      return person.save();
    })
    .then((result) => {
      console.log("person saved!");
      return mongoose.connection.close();
    })
    .catch((err) => console.log(err));
}
