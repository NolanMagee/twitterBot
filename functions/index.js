const functions = require('firebase-functions')
const admin = require('firebase-admin')


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const XMLHTttpRequest = require('xhr2')


const twit = require('twit')
const config = require('./config.js')
const Twitter = new twit(config)

admin.initializeApp(functions.config().firebase)

exports.showTwitter = functions.https.onRequest((request,response)=>{
  Twitter.get('search/tweets', {q: 'geocode=-74,40,10km'}, (err,data,res)=>{
    //to be done
    if (err){
      response.send("ERROR: ", err)  
    }else{
      response.send(res)
    }
  })

  //response.send(Twitter)
})

const url = 'https://www.reddit.com/r/cryptocurrency/top.json'
const getJSON = function(url, callback){
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.responseType = 'json'
  xhr.onload = function(){
    let status = xhr.status
    if (status === 200){
      return callback(null, xhr.response)
    } else {
      return callback(status, xhr.response)
    }
  }
  xhr.send()
}

exports.tweetRedditPost = functions.https.onRequest((req,res)=>{
  getJSON(url, (err,data)=>{
    if (err !== null){
      return res.send(err)
    } else {
      return res.send(data)
    }
  })
})
