// const {TwitterApi} = require("twitter-api-v2")
// require("dotenv").config()
// const crypto = require("crypto")
// const Oauth = require("oauth-1.0a")
// const qs = require("querystring")
// const {URLSearchParams} = require("url")
// const { Client } =require( "twitter-api-sdk" )
// const readline = require('readline').createInterface({
//   input:process.stdin,
//   output:process.stdout
// })


// // const client = new TwitterApi({
// //   appKey: process.env.CLIENT_ID2,
// //   appSecret: process.env.CLIENT_SECRET2,
// //   accessToken: process.env.ACCESS_TOKEN,
// //   accessSecret: process.env.ACCESS_TOKEN_SECRET,
// //   bearerToken: process.env.BEARER_TOKEN,
// // })

// //Oauth signing function


// async function input(prompt){
//   return new Promise(async(resolve,reject)=>{
//     readline.question(prompt,(out)=>{
//       readline.close()
//       resolve(out)
//     })
//   })
// }

// const oauth = Oauth({
//   consumer:{
//     key:process.env.API_KEY,
//     secret:process.env.API_KEY_SECRET,

//   },
//   signature_method:"HMAC-SHA1",
//   hash_function:(baseString,key)=>crypto.createHmac('sha1',key).update(baseString).digest('base64')
// })


// // const rwClient = client.readWrite


// // const tweetText = async()=>{
// //   console.log(typeof process.env.BEARER_TOKEN)
// //   try{
// //     await rwClient.v2.tweet(
// //       "abcdefghijklmnopqrstuvwxyz"
// //     )

// //     console.log("success")
// //   }catch(err){
// //     console.log(err)
// //   }
// // }

// //GET the OAUTH
// async function requestToken(){
//   const requestTokenURL = "https://api.twitter.com/oauth/request_token?oauth_callback=oob&x_auth_access_type=write"
//   const authHeader = oauth.toHeader(oauth.authorize({
//     url:requestTokenURL,
//     method:"POST"
//   }));
//   const request = await fetch(requestTokenURL,{
//     'method':"POST",
//     headers:{
//       Authorization:authHeader['Authorization']
//     }
//   })
//   const body = await request.text()

//   return Object.fromEntries(new URLSearchParams(body))
// }

// //Validate the PIN => User requested action

// async function accessToken({ oauth_token, oauth_token_secret }, verifier) {
//   try {
//     const url = `https://api.twitter.com/oauth/access_token?oauth_verifier=${verifier}&oauth_token=${oauth_token}`;
//     const authHeader = oauth.toHeader(
//       oauth.authorize({
//         url,
//         method: "POST",
//       })
//     );

//     const request = await fetch(url, {
//       method: "POST",
//       headers: {
//         Authorization: authHeader["Authorization"],
//       },
//     });
//     const body = await request.text();
//     return Object.fromEntries(new URLSearchParams(body));
//   } catch (error) {
//     console.log(error);
//   }
// }



// //Send the tweet

// async function writeTweet({oauth_token,oauth_token_secret}){
//   const token = {
//     key:oauth_token,
//     secret:oauth_token_secret
//   }
//   const url = 'https://api.twitter.com/2/tweets'
//   const headers = oauth.toHeader(oauth.authorize({
//     url,
//     method:"POST"
//   },token))

//   try{
//     const request = await fetch(url,{
//       method:"POST",
//       body:JSON.stringify(tweet),
//       responseType:'json',
//       headers:{
//         Authorization:headers['Authorization'],
//         "user-agent":"V2CreateTweetJS",
//         "content-type":"application/json",
//         "accept":"application/json"
//       }
//     })
//     const body = request.json()
//     return body
//   }catch(err){
//     console.log("error",err)
//   }
// }


// (async ()=>{
//   try{
//     //Get the token
//     const oAuthRequestToken = await requestToken();

//     //request the user for a pin
//     const authorizeURL  = `https://api.twitter.com/oauth/authorize?oauth_token=${oAuthRequestToken.oauth_token}`
//     console.log('Please go here and authorize',authorizeURL);

//     const pin = await input(`Paste the PIN here`)

//     //Validate the pin
//     const oAuthAccessToken = await accessToken(oAuthRequestToken,pin.trim());

//     //Send msg 
//     const messageResponse = await writeTweet(oAuthAccessToken,{
//       'text':"HELLO!"
//     })
//     console.log(messageResponse);
//   }catch(error){
//     console.log("Error",error)
//   }
// })()



// // async function main() {
// //   const client = new Client("AAAAAAAAAAAAAAAAAAAAAPWeuwEAAAAAZHQOf7%2BhIyPLRo1%2Fbao4Zrts09k%3DHo4sa8Ks4x4ntw9L4SUG7rQO1B39OE6HJmhyvfMLN9PP5khNda"
// //   );

// //   const response = await client.tweets.tweetsFullarchiveSearch();
  
// //   console.log("response", JSON.stringify(response, null, 2));
// // }
  
// // main();


// Import required modules
require('dotenv').config(); // Load environment variables
const crypto = require('crypto'); // Cryptographic library
const Oauth = require('oauth-1.0a'); // OAuth 1.0a library
const qs = require('querystring'); // Query string library
const { URLSearchParams } = require('url'); // URL handling library

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

//asdfsdf

// Create an OAuth 1.0a instance with consumer key and secret
const oauth = Oauth({
    consumer: {
        key: process.env.API_KEY,
        secret: process.env.API_KEY_SECRET
    },
    signature_method: 'HMAC-SHA1',
    hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64')
});

// Function to get user input from the command line
async function input(prompt) {
    return new Promise(async (resolve, reject) => {
        readline.question(prompt, (out) => {
            readline.close();
            resolve(out);
        })
    })
}

/**
 * Request Access token from Twitter
 * @returns {Object} Access token and secret
 */
async function requestToken() {
    try {
        const requestTokenURL = 'https://api.twitter.com/oauth/request_token?oauth_callback=oob&x_auth_access_type=write';
        const authHeader = oauth.toHeader(oauth.authorize({
            url: requestTokenURL,
            method: 'POST'
        }));

        const request = await fetch(requestTokenURL, {
            'method': 'POST',
            headers: {
                Authorization: authHeader['Authorization']
            }
        })
        const body = await request.text();

        return Object.fromEntries(new URLSearchParams(body));
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// VALIDATE the PIN => User requested action
async function accessToken({ oauth_token, oauth_secret }, verifier) {
    try {
        const url = `https://api.twitter.com/oauth/access_token?oauth_verifier=${verifier}&oauth_token=${oauth_token}`
        const authHeader = oauth.toHeader(oauth.authorize({
            url,
            method: 'POST'
        }));

        const request = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: authHeader['Authorization']
            }
        });
        const body = await request.text();
        return Object.fromEntries(new URLSearchParams(body));
    } catch (error) {
        console.error('Error:', error)
        throw error;
    }
}

// SEND THE TWEET
async function writeTweet({ oauth_token, oauth_token_secret }, tweet) {
    const token = {
        key: oauth_token,
        secret: oauth_token_secret
    }

    const url = 'https://api.twitter.com/2/tweets';

    const headers = oauth.toHeader(oauth.authorize({
        url,
        method: 'POST'
    }, token));

    try {
        const request = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(tweet),
            responseType: 'json',
            headers: {
                Authorization: headers['Authorization'],
                'user-agent': 'V2CreateTweetJS',
                'content-type': 'application/json',
                'accept': 'application/json'
            }
        })
        const body = await request.json();
        return body;
    } catch (error) {
        console.error('Error:', error)
    }
}

(async () => {
    try {
        // Get the request token from Twitter
        const oAuthRequestToken = await requestToken();

        // Request the user for a PIN
        const authorizeURL = `https://api.twitter.com/oauth/authorize?oauth_token=${oAuthRequestToken.oauth_token}`;
        console.log('Please go here and authorize', authorizeURL);
        const pin = await input('Paste the PIN here:');

        // Validate the PIN and get the access token
        const oAuthAccessToken = await accessToken(oAuthRequestToken, pin.trim());

        // Send a tweet
        const messageResponse = await writeTweet(oAuthAccessToken, { 'text': 'Hello Viewers!' });
        console.log(messageResponse);
    } catch (error) {
        console.log('Error: ', error);
    }
})();