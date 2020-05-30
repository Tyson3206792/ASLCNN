const video = document.getElementById("videoElement");
const canvas = document.getElementById("mycanvas");
const context = canvas.getContext("2d");

var canvas2 = document.getElementById("mycanvas2");    
var context2 = canvas2.getContext("2d");

count = max_pics = 50;
key = '';

document.addEventListener('keypress', dload);

function dload(e) {
  console.log(e.code.replace('Key', ''));
  key = e.code.replace('Key', '');
  count = 0;
}

function runDetection() {	
	canvas.width = 640;
	canvas.height = 480;
	context.scale(-1, 1);
	context.drawImage(video, 0, 0, -640, 480); 
	context2.drawImage(video, -80, -150);      
	//Take image in bounding box
	//imgData = context.getImageData(x, y, wid, hei);   //Edited image
	//Place image on new canvas
	//context2.putImageData(imgData, 0, 0); 
	context.beginPath();
	context.strokeStyle = "#0000FF";
	context.strokeRect(-x, y, -wid, hei);    

	if(count < max_pics){
		save_images();          
	}
	console.log("loop");
	setTimeout(runDetection, 200);
}

function save_images(){
    img = canvas2.toDataURL("image/png", 1.0);

    var link = document.createElement("a");

    link.setAttribute("href", img);
    link.setAttribute("download", key + count.toString());
    link.click();
    count++;
}

function access_webcam(){
	if (navigator.mediaDevices.getUserMedia) {				//Access webcam
	  navigator.mediaDevices.getUserMedia({ video: true })
		.then(function (stream) {
		  video.srcObject = stream;
		  ready = true;
		})
		.catch(function (err0r) {
		  console.log("Something went wrong!");
		});
	}
}

var x = 360;
var y = 150;
var wid = 200;
var hei = 200;

access_webcam();

//setInterval(runDetection, 100);
setTimeout(runDetection, 100);

