const faceapi = require('./facialRecognition');
const path = require('path');

async function main() {
     // this is the image that will analize it
     const inputImage = path.join(__dirname, `img/sample.jpg`);
     // here start the facial recognition and detecting process
     const res = await faceapi(inputImage);
     console.log('the result of facial recognition: \n');
     console.log(res);
}

main();