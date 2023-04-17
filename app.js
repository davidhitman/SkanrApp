StartButton.addEventListener("click", function(){
    const frontPage = document.getElementById('front-page');
});


var context = canvas.getContext('2d');
function cameravideo(){
    const video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    const snap = document.getElementById("snap");
    const errorMsgElement = document.querySelector('span#errorMsg');

    const constraints = {
        video: {
            width: 1280, height: 720
        }
    };
    try {
        const stream = navigator.mediaDevices.getUserMedia(constraints);
        window.stream = stream;
        video.srcObject = stream;
    } catch (e) {
        errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
    }
};

    // Draw image
snap.addEventListener("click", function() {
    context.drawImage(video, 0, 0, 640, 480);
    saveImage();
});



function saveImage(){
    var imageDataURL = canvas.toDataURL('image/png');
    var image = imageDataURL;
    //sendDataBase(image);
    
};

function sendDataBase(image){
    
    // //const AWS = require('./aws-sdk');
    // const s3 = new AWS.S3({
    //     accessKeyId: 'AKIAVW5L6NSWFIE3XIDC',
    //     secretAccessKey: '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'
    // });

    // const params = {
    //     Bucket: 'face-recognition-website',
    //     Key: 'myImage.jpg',
    //     Body: image // the image data captured from the camera
    // };
    // s3.putObject(params, (err, data) => {
    //     if (err) {
    //         console.log('Error uploading image to S3: ', err);
    //     } else {
    //         console.log('Successfully uploaded image to S3');
    //     }
    // });
};





