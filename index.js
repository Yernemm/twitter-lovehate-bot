const config = require('./config.json');
const pluralize = require('pluralize')
const Twit = require('twit');
const fs = require('fs');

const words = fs.readFileSync('./words-20k.txt', 'utf8').replace(/\r/g,'').split('\n');
const intros = fs.readFileSync('./intros.txt', 'utf8').replace(/\r/g,'').split('\n========\n');

const introsSing = intros[0].split('\n');
const introsPlur = intros[1].split('\n');

let T = new Twit(config);

function generateRand()
{
    let word = randArr(words);
    let intro;
    if(pluralize.isSingular(word)){
    intro = randArr(introsSing);
    }else{
    intro = randArr(introsPlur);
    }
    return cap(intro.replace('##', word));
}

function randArr(items)
{
    return items[Math.floor(Math.random() * items.length)];
}

function cap(str)
{
    return str.charAt(0).toUpperCase() + str.substring(1);
}



console.log(new Date().getTime());

function nextHalfHour(){
    let current = new Date().getTime()
    current /= 1000; //seconds
    current /= 60; //minutes
    current /= 30; //half hour
    current = Math.ceil(current);
    current *= 30;
    current *= 60;
    current *= 1000;
    if(current < new Date().getTime())
        current += 1000 * 60 * 30;

    return current;
}

setTimeout(()=>{
    sendOne();
    setInterval(()=>{
        sendOne();
    },1000 * 60 * 30);

}, nextHalfHour() - new Date().getTime())

function sendOne(){
    T.post('statuses/update', { status: generateRand() }, function(err, data, response) {
        console.log(data)
      })
}

console.log(generateRand())
console.log('we goin');
