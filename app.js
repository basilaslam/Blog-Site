//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require('lodash')
// Contant
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
// Object and Variabls
let posts=[
  {
    title: 'Day 1',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id nibh tortor id aliquet lectus. Ut morbi tincidunt augue interdum velit. Fusce ut placerat orci nulla pellentesque dignissim enim sit amet. In eu mi bibendum neque egestas. Tellus in hac habitasse platea dictumst vestibulum rhoncus est. Turpis nunc eget lorem dolor sed. Euismod quis viverra nibh cras. Ac turpis egestas sed tempus urna et pharetra. Luctus accumsan tortor posuere ac ut consequat semper. Dolor purus non enim praesent elementum facilisis. Tortor aliquam nulla facilisi cras fermentum. Aliquam eleifend mi in nulla. Duis ut diam quam nulla porttitor massa id neque aliquam. Vitae tortor condimentum lacinia quis vel eros donec ac. Facilisi nullam vehicula ipsum a arcu cursus. Viverra tellus in hac habitasse platea dictumst. Id diam maecenas ultricies mi. Sit amet purus gravida quis blandit turpis cursus in hac.'
  }
]
// app.use and Get
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/',(req,res)=>{
  res.render('home',{homeStartingContent : homeStartingContent, posts : posts})
})

app.get('/about',(req,res)=>{
  res.render('about', {aboutContent: aboutContent})
})

app.get('/compose',(req,res)=>{
  res.render('compose')
})
app.post('/compose',(req,res)=>{
const post = {
  title: req.body.postTitle,
  content: req.body.postBody
};
posts.push(post)
res.redirect('/')
})

app.get("/posts/:postName",function(req,res){
  const requestTitle= lodash.lowerCase(req.params.postName)
  console.log(requestTitle);  


  posts.forEach(function(posts) {
    
    const storedTitle = posts.title
    const storedContent = posts.content
       if(lodash.lowerCase(storedTitle) === requestTitle){
         res.render('post',{storedTitle:storedTitle ,storedContent:storedContent })
         console.log('Match Found');
         console.log(posts.title);
       }else{
         console.log('No Matches');
         console.log(posts.title);
       }   
      
        
     })  




})











app.listen(3000, function() {
  console.log("Server started on port 3000");
});
