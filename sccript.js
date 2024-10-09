const mongoose = require('mongoose');
const User = require('./user');

//connect to the mongodb db here 
mongoose.connect("mongodb://localhost/testdb");      

//create new user documents

async function run() {
    try {
        const user = await User.findOne({name: 'Nick Xing'});
        console.log(user);
        //before the save, once encountered identify the user 
        await user.save();
        console.log(user);
        // console.log(user.namedEmail);   //virtual property usage

        
        
    } catch(e) {     //once the schema checking process found something not aligned with the validation req, it throw an error 
        console.log(e.message);
    }
}

run();
    



