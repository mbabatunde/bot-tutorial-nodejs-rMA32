var HTTPS = require('https');
//var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/testing/;  //botRegexClassic = /^\Classic/i; 
      botRegexBender = /^\Bender/; 
      botRegexDonald = /^\Donald/;
      botRegexStop = /^\Stop/;
      botRegexFunny = /^\Funny/;
  //var people = ["KARAN","GAVIN","CIAMACCO","NICK","BRENNAN"]
  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage("Testing this bot - Should happen automatically");
    this.res.end();
  }
  //Come back to this and test with the people Array
  
  /*else if(request.text && botRegexClassic.test(request.text)) {
    this.res.writeHead(200);
    var req = request.text.substring(9,request.text.length);
    var rep = req.replace(/ /,"+");
    postMessage("https://i.groupme.com/640x364.jpeg.f8a0e216bf7e42ed9a86b3ae23cc2ff1.large");
    this.res.end();
  }*/
  else if(request.text && botRegexBender.test(request.text)) {
    this.res.writeHead(200);
    postMessage("http://67.media.tumblr.com/tumblr_m7e2ahFFDo1qcuoflo2_250.gif");
    this.res.end();
  } 
  else if(request.text && botRegexDonald.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://s3.amazonaws.com/wp-ag/wp-content/uploads/sites/72/2015/09/Trumpreactionface.gif");
    this.res.end();
  }
  else if(request.text && botRegexStop.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://media.giphy.com/media/TlNY7ob29c4Gk/giphy.gif");
    this.res.end();
  }
  
  else if(request.text && botRegexFunny.test(request.text)) {
    this.res.writeHead(200);
    postMessage("Freaking Karan");
    this.res.end();
  }
  
  else {
    console.log("Cool story bro");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(response) {
  var botResponse, options, body, botReq;

  botResponse = response

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


exports.respond = respond;
