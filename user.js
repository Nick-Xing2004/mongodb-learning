//user schema

const mongoose = require('mongoose');    


//schema----架构 模式 

const addressSchema = mongoose.Schema({
     street: String,
     city: String
})      //schema is indeed a combination of the document and the collection; in some senses, can operate both 

//the definition of the schema for a collection           //defines the fields for the collection input and data addition
const userShcema = new mongoose.Schema({     //the schema validation
     name: String,       //the value of the pair is the data type of the data     like ts stuff      //js 是可以返回类的
     age: {
          type: Number,
          min: 1,
          max: 100,
          //custom validation
          validate: {     
               validator: v => v % 2 === 0,
               message: props => `${props.value} is not an even number`
          }
     },
     email: {      //in the case that we want make email a required field
         minLength: 10,
         type: String,
         required: true,   //user validation failed
         lowercase: true
     },
     createdAt: {
          type: String,
          immutable: true,
          default: () => Date.now(),
     },
     updatedAt: {
          type: String,
          default: () => Date.now(),
     },
     bestFriend: {
          type: mongoose.SchemaTypes.ObjectId, 
          // ref: "User"       //referencing the user model  
          

          
     },
     hobbies: [String],
     address: addressSchema      //assigns another schema to the address 
});

//add stuffs onto the schema after the definition     
userShcema.methods.sayHi = function() {
     console.log(`Hi, my name is ${this.name}`);
}    //define 在每个 document对象实例上的        //available on the instance of documents


userShcema.static.findByName = function(name) { //that will be available on the actually models
     return this.where({name: new RegExp(name, 'i')});
     
}

userShcema.virtual("namedEmail").get(function () {
     return `${this.name} <${this.email}>`;      //just return a string
});

//middleware inside of mongoose
userShcema.pre('save', function(next) {
     this.updatedAt = Date.now();  
     next();     //go to the next thing in line

});


userShcema.post('save', function(document, next) {
     document.sayHi();
     next();
});

//defining the model    the name of the collection will be infered from the module name
module.exports = mongoose.model("User", userShcema);   //加第三个参数可以使得specify collection的名字       
//实际上导出的是一个模型类     a  model class












