const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as an argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0-k5ddz.mongodb.net/note-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model('Note', noteSchema); // store in collection 'notes' (1st param, lowercase plural!)

// const note = new Note({
//     content: 'GET and POST bla bla bla bla',
//     date: new Date(),
//     important: true,
// });
//
// note.save()
//     .then((resp) => {
//         console.log('note saved!');
//         mongoose.connection.close();
//     });

Note.find({ important: true })
  .then(result => {
    result.forEach(note => {console.log('note: ', note);});
    mongoose.connection.close();
  });
