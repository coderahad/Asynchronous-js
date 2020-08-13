const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
    return new Promise((resolve, reject)=> {
        fs.readFile(file, (err, data) => {
            if(err) reject('I could not find the file');
            resolve(data);
        });
    });
}

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject)=>{
        fs.writeFile(file, data, err => {
            if(err) reject('Could not write the file');
            resolve('success');
        });
    });
}

readFilePro(`${__dirname}/dog.txt`).then(data => {
    console.log(`Breed:${data}`);
    
    superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then(res=> {
        console.log(res.body.message);
        
        fs.writeFile('dog-text.txt', res.body.message, err => {
            if(err) return console.log(err.message);
            console.log('Random dog image saved');
        });
    }).catch(err => {
        console.log(err.message)
    });
})
