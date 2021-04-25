
IMPORTANT: in the dir 'face-api/img/userFaces' you must put your faces images


this function take as input a image path to match if this image contain the same face or faces of the faces localized in the dir face-api/img/userFaces. return a array of: 
{
     _label:<name-of-the-image's-file>,
     _distance:<what than near matched in a 0 to 1 scale>
}

if detecting a face but this face do not match with any face the list's faces then:

{
     _label:'unknown',
     _distance:<what than near matched in a 0 to 1 scale>
}

# MODULE MADE BY BRANDOX WITH ♥