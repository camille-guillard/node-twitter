const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://camille:DS6QDGANnpKJOFwH@cluster0.gvcwc.mongodb.net/twitter?retryWrites=true&w=majority')
.then(() => console.log('connexion db ok!'))
.catch( err => console.log(err))