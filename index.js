const config = require('./config.json');
const pluralize = require('pluralize')
const fs = require('fs');

const words = fs.readFileSync('./words-20k.txt', 'utf8').replace(/\r/g,'').split('\n');
const intros = fs.readFileSync('./intros.txt', 'utf8').replace(/\r/g,'').split('\n========\n');

const introsSing = intros[0].split('\n');
const introsPlur = intros[1].split('\n');

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

for(let i = 0; i<20; i++)
    console.log(generateRand());
