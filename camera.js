function mode(func){
  var buttons = ['test', 'translate', 'learn'];
  mod = func;
  document.getElementById('storedInput').textContent = '';
  for(i = 0; i < 3; i++){
    var current = document.getElementById(buttons[i]);
    if(buttons[i] == func){
      current.style.backgroundColor = 'rgb(0, 102, 153)';
      current.style.color = 'rgb(222, 222, 222)';
    }
    else{
      current.style.backgroundColor = 'rgb(238, 238, 238)';
      current.style.color = 'rgb(0, 102, 121)';
    }
  }
  then = new Date().getTime();
  if(mod == 'learn'){
  	countDown();
  }
}

function update_canvas(){
    if(video.videoWidth < video.videoHeight){   //Portrait mode
        canvas.width = 480;
        canvas.height = 480;
        if(facing == "user")
        {
            context.scale(-1, 1);
            context.drawImage(video, 0, -80, -480, 640);    //Put image within 200/200 box and process whole thing
            context.beginPath();
            context.strokeStyle = "#0000FF";
            context.strokeRect(-260, y, -200, 200);
            context3.drawImage(video, -20, -y-80, 480, 640);
        }
        else
        {
            context.drawImage(video, 0, -80, 480, 640);
            context.beginPath();
            context.strokeStyle = "#0000FF";
            context.strokeRect(20, y, 200, 200);
        }
    }
    else{       //Landscape mode
        canvas.width = 640;
        canvas.height = 480;
        if(facing == "user")
        {
            context.scale(-1, 1);
            context.drawImage(video, 0, 0, -640, 480);
            context.beginPath();
            context.strokeStyle = "#0000FF";
            context.strokeRect(-420, y, -200, 200);
            context3.drawImage(video, -20, -y, 640, 480);
        }
        else
        {
            context.drawImage(video, 0, 0, 640, 480);
            context.beginPath();
            context.strokeStyle = "#0000FF";
            context.strokeRect(20, y, 200, 200);
        }
    }
}

async function collectImage(){      //Retrives image from within prediction square
    if(video.videoWidth < video.videoHeight){   //Portrait mode
        if(facing == "user")
        {
            imgData = context3.getImageData(0, 0, 200, 200);
        }
        else
        {
            imgData = context.getImageData(20, y, 200, 200);
        }
    }
    else{       //Landscape mode
        if(facing == "user")
        {
            imgData = context3.getImageData(0, 0, 200, 200);
        }
        else
        {
            imgData = context.getImageData(20, y, 200, 200);
        }
    }
	return imgData;
}

async function runDetection() {
    imgData = await collectImage();
    done = await predict(imgData);
    console.log("Predicted");
	setTimeout(runDetection, 20);
}

async function predict(imgData){
	var frame = await tf.browser.fromPixels(imgData);
	frame = await frame.reshape([1, 200, 200, 3])
	//Predict class
	var vals = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','_','Nothing'];
	var pred = await model.predict(frame);		//Predict class outputs
	var arr = String(pred.dataSync());	//Convert tensor to string
	arr = arr.split(',').map(Number);	//Convert to String array
	if(mobile){
	    document.getElementById("graph").style.display="none";
	}
	else{
	    graph(arr, vals);
	}
	confidence = Math.max.apply(Math, arr);
	if(confidence > 0.4){
		display(vals[arr.indexOf(confidence)]);	//Return correct prediction (max value pos))
	}
	else{
		display('...');
	}
	return 1;
}

function graph(a, v){
	context2.clearRect(0, 0, canvas2.width, canvas2.height);
	for(i = 0; i < a.length; i++){
		context2.beginPath();
		context2.lineWidth = "3";
		context2.fillStyle = "blue";
		context2.fillRect(30, 20 + i*22, 270*Number(a[i]), 12);
		context2.stroke();
		context2.fillStyle = "red";
		context2.font = "16px Arial";
		context2.fillText(v[i], 10, 30 + i*22);
	}
}

function display(val){
	if(mod == 'test'){
		output.textContent = val;
	}
	else if(mod == 'translate'){
		if(val == output.textContent && val != '...'){
            var now = new Date().getTime();
            var seconds = (now-then)/1000;
            console.log(seconds);
			if(seconds > 1.5){
				if(val == '_'){
					storedOut.textContent = storedOut.textContent + ' ';
				}
				else{
					storedOut.textContent = storedOut.textContent + val;
				}
				then = new Date().getTime();
			}
		}
		else{
			then = new Date().getTime();
		}
		output.textContent = val;
	}
	else if(mod == 'learn'){

	}
}

function countDown(){
	clearInterval(timer);
	seconds = 60;
	timer = setInterval(function() {
		storedOut.textContent = seconds;
		if (seconds <= 0 || mod != 'learn') {
	    	clearInterval(timer);
	    	storedOut.textContent = "You signed " + "" + "characters";
		}
		seconds--;
	}, 1000);
}

function mobilecheck() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  console.log(check);
  return check;
};

//START CODE
var w, h, wid, hei = 200;
var y = 100;
var mod = 'test'
var model;		//Stores CNN
//load_model();	//Load CNN

var timer;
var seconds;
var mobile = mobilecheck();

var cur = document.getElementById(mod);
cur.style.backgroundColor = 'rgb(0, 102, 153)';
cur.style.color = 'rgb(222, 222, 222)';

//Stores the processed image. Remove in html page when not testing
var video = document.querySelector("#videoElement");		//Webcam
var canvas = document.getElementById('mycanvas');		//Stores cropped image
var context = canvas.getContext('2d');
var canvas2 = document.getElementById("mycanvas2");		//predictions
var context2 = canvas2.getContext("2d");
var canvas3 = document.getElementById("mycanvas3");		//Stores further processed image
var context3 = canvas3.getContext("2d");
var storedOut = document.getElementById('storedInput');
var output = document.getElementById('predictedInput');
var facing= "environment";
var then;
video.style.display="none";
canvas3.style.display="none";

//Used to access webcam
function access_webcam(){
    if(facing == "user" && mobile){
        facing = "environment";
        constraints = {
            "video": {
                "facingMode":
                { "ideal": facing }
            }
        };
    }
    else{
        facing = "user";
        constraints = {
            "video": {
                "facingMode":
                { "ideal": facing }
            }
        };
    }
	if (navigator.mediaDevices.getUserMedia) {				//Access webcam
	  navigator.mediaDevices.getUserMedia(constraints)
		.then(function (stream) {
		  video.srcObject = stream;
		  ready = true;
		})
		.catch(function (err0r) {
		  console.log("Something went wrong!");
		});
	}
}

async function load_model(){
    access_webcam();
    console.log('CNN loading...')
    model = await tf.loadLayersModel('https://raw.githubusercontent.com/Tyson3206792/ASLCNN/master/trained_models/a-zmulti_0/model.json');
    console.log('CNN loaded.')
    model.summary();
    output.textContent = 'Translating...';
    w = model.inputs[0].shape[1];
    h = model.inputs[0].shape[2];
    update_canvas();
    runDetection();
    setInterval(update_canvas, 50);
}

load_model();
