### MODULE MADE BY BRANDOX WITH ♥

IMPORTANT: in the dir **'face-api/img/userFaces'** you must put your faces images

The default function of the dir **'facialRecognition'** take as input a image path to match if this image contain the same face or faces of the faces localized in the dir face-api/img/userFaces. return a array of: 
```{
     _label:<name-of-the-image's-file>,
     _distance:<what than near matched in a 0 to 1 scale>
}```

If detecting a face but this face do not match with any face the dir's faces then :
```{
     _label:'unknown',
     _distance:<what than near matched in a 0 to 1 scale>
}```
