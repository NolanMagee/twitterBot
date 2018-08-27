const functions = require('firebase-functions')
const admin = require('firebase-admin')
const cors = require('cors')({origin: true})
const express = require('express')


const XMLHTttpRequest = require('xhr2')


const twit = require('twit')
const config = require('./config.js')
const Twitter = new twit(config)

admin.initializeApp(functions.config().firebase)




  exports.showTwitter = functions.https.onRequest((request,response)=>{
    cors(request, response, ()=>{})

    let lat = request.query.lat || "-22.912"  //Rio de Janeiro
    let lng = request.query.lng || "-43.231" //43.231
    let query = `geocode:${lat},${lng},5km`
    Twitter.get('search/tweets', {q: query}, (err,data,res)=>{
      //to be done
      if (err){
        response.send("ERROR: ", err)
      }else{
        response.send({"lat": lat, "lng": lng, "query": query, "data": data})
      }
    })

  })











/*



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

*/
