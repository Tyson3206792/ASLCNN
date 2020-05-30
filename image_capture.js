const video = document.getElementById("videoElement");
const canvas = document.getElementById("mycanvas");
const context = canvas.getContext("2d");

var canvas2 = document.getElementById("mycanvas2");    
var context2 = canvas2.getContext("2d");

var canvas3 = document.getElementById("mycanvas3");  
var context3 = canvas3.getContext("2d");
canvas3.width = 60;
canvas3.height = 480;

let isVideo = false;
let model = null;
console.log(1);
const modelParams = {
    flipHorizontal: false,   // flip e.g for video  
    maxNumBoxes: 1,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.6,    // confidence threshold for predictions.
}
count = max_pics = 400;
key = '';

document.addEventListener('keypress', dload);

function dload(e) {
  console.log(e.code.replace('Key', ''));
  key = e.code.replace('Key', '');
  count = 0;
}

function startVideo() {
    handTrack.startVideo(video).then(function (status) {
        console.log("video started", status);
        if (status) {
            isVideo = true
            runDetection()
        }
    });
}

function runDetection() {
    model.detect(video).then(predictions => {
        if(predictions.length == 1){
            console.log("Predictions: ", predictions[0].bbox);
            console.log("Predictions: ", predictions[0].bbox[0]);
            wid = Math.ceil(predictions[0].bbox[2]);
            hei = Math.ceil(predictions[0].bbox[3]);
            x = Math.ceil(predictions[0].bbox[0]);  
            y = Math.ceil(predictions[0].bbox[1]);  

            //Resize canvas to fit prediction image
            canvas2.width = wid;
            canvas2.height = hei;

            context.drawImage(video, 0, 0);      

            //Take image in bounding box
            imgData = context.getImageData(x, y, wid, hei);   //Edited image
            //Place image on new canvas
            context2.putImageData(imgData, 0, 0);

            if(count < max_pics){
                save_images();          
            }
        }
        

        model.renderPredictions(predictions, canvas, context, video);

        if (isVideo) {
            requestAnimationFrame(runDetection);
        }
    });
}

function save_images(){
    img = canvas2.toDataURL("image/png", 1.0);

    var link = document.createElement("a");

    link.setAttribute("href", img);
    link.setAttribute("download", key + count.toString());
    link.click();
    count++;
}

// Load the model.
handTrack.load(modelParams).then(lmodel => {
    // detect objects in the image.
    console.log(2);

    model = lmodel;
    console.log(3);
    startVideo();
    console.log(4);
});
