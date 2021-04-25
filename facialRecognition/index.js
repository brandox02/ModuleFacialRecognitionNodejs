const faceapi = require('face-api.js');
const path = require('path');
const canvas = require('canvas');
const fs = require('fs');



module.exports = async function (pathImage) {
     console.log('facial recognition and detection have started');
     const MODEL_URL = path.join(__dirname, './models');

     try {
          // loading models 
          await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL);
          await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL);
          await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL);

     } catch (error) {
          error => console.log(error);
     }
     console.log('models has been readed')
     // loading input images
     const { Canvas, Image } = canvas;
     faceapi.env.monkeyPatch({ Canvas, Image });
     const img = await canvas.loadImage(pathImage);
     console.log('the input image has been loaded');

     let fullFaceDescriptions = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors();
     console.log('the input image has been analized');
     // getting name of all user's faceImages
     const labels = fs.readdirSync(path.join(__dirname, 'userFaces'));
     console.log('the dir with all images that contain the faces has been readed');
     // getting array with all face user images knowed
     const labeledFaceDescriptors = await Promise.all(
          labels.map(async label => {
               const urlImg = path.join(__dirname, `userFaces/${label}`);
               const img = await canvas.loadImage(urlImg);
               // detect the face with the highest score in the image and compute it's landmarks and face descriptor
               const fullFaceDescription = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();

               if (!fullFaceDescription) {
                    console.error(`no faces detected for ${label}`);
               }

               const faceDescriptors = [fullFaceDescription.descriptor];
               return new faceapi.LabeledFaceDescriptors(label, faceDescriptors);
          })
     );
     console.log("analize of the image'lists has been completed");
     const maxDescriptorDistance = 0.6;
     const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, maxDescriptorDistance)
     // matching faceusers rendered with input image
     const results = fullFaceDescriptions.map(fd => faceMatcher.findBestMatch(fd.descriptor));
     console.log('the facial recognition and detecting process has finished');
     return results;
}