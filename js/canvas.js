var canvas;
var context;
var images = {};
var totalResources = 6;
var numResourcesLoaded = 0;
var fps = 30;
var x = 75;
var y = 160;

var breathInc = 0.1;
var breathDir = true;
var breathAmt = 0;
var breathInterval = setInterval(updateBreath, 1000 / fps);

var heartRate = 0;

var heartDir = true; // => true = -, false = +
var heartSize = 0.6; // => 60% of original size
var heartInterval = setInterval(updateHeart, 1000 / fps);

var eyesDir = false;
var eyesSize = -0.8999999;
var heartInterval = setInterval(updateEyes, 1000 / fps);

var temperature=0;

var pressureSystolic=0;
var pressureDiastolic=0;

var pacientStatus = true;
var gender = "male";

function prepareCanvas(canvasDiv, canvasWidth, canvasHeight)
{
	canvas = document.createElement('canvas');
	canvas.setAttribute('width', canvasWidth);
	canvas.setAttribute('height', canvasHeight);
	canvas.setAttribute('id', 'canvas');
	canvasDiv.appendChild(canvas);
	
	if(typeof G_vmlCanvasManager != 'undefined') {
		canvas = G_vmlCanvasManager.initElement(canvas);
	}
	context = canvas.getContext("2d");
	
    //nalozi slike
    loadImage("head",gender+"_"); 
    loadImage("heart","")
    loadImage("body",gender+"_");
    loadImage("cold","");
    loadImage("hot","");
    loadImage("eyes","");

}

function loadImage(name, gender) {

  images[name] = new Image();
  images[name].onload = function() { 
	  resourceLoaded();
  }
  images[name].src = "images/" + gender + name + ".png";
}

function resourceLoaded() {

  numResourcesLoaded += 1;
  if(numResourcesLoaded === totalResources) {
  
	setInterval(redraw, 1000 / fps);
  }
}
//RISANJE ELEMENTOV IN BARVANJE BESEDILA
function redraw() {

  canvas.width = canvas.width;
  if(gender=="male") {
      context.drawImage(images["body"], x, y + 60, images["body"].width*0.8,images["body"].height*0.8);    
      context.drawImage(images["head"], x+10, y - 125 - breathAmt, images["head"].width*0.8,images["head"].height*0.8);    
      context.drawImage(images["heart"],x+100,y+80, images["heart"].width*heartSize,images["heart"].height*heartSize);    
      context.drawImage(images["eyes"], x+100, y-breathAmt, images["eyes"].width,images["eyes"].height*eyesSize);
  }
  else{
      context.drawImage(images["body"], x, y+40, images["body"].width*0.8,images["body"].height*0.8);    
      context.drawImage(images["head"], x+10, y - 125 - breathAmt, images["head"].width*0.8,images["head"].height*0.8);    
      context.drawImage(images["heart"],x+110,y+100, images["heart"].width*heartSize,images["heart"].height*heartSize);    
      context.drawImage(images["eyes"], x+120, y-breathAmt+40, images["eyes"].width,images["eyes"].height*eyesSize);      
  }
    //temperatura
  temperature = document.getElementById("tempValue").innerHTML;
    if(temperature<35.0){
        context.drawImage(images["cold"], x+30, y - 60 - breathAmt, images["cold"].width*0.8,images["cold"].height*0.8);  
        document.getElementById("temperature").style.color = "#c0392b"; 
        pacientStatus = false;
    }
    else if(temperature>37.5){
        context.drawImage(images["hot"], x+10, y - 85 - breathAmt, images["hot"].width*0.8,images["hot"].height*0.8);
        document.getElementById("temperature").style.color = "#c0392b";
        pacientStatus = false;
    }
    else{
        document.getElementById("temperature").style.color = "#2ecc71";
    }
    
      
    
    //pritisk
    pressureSystolic = document.getElementById("pressureSystolic").innerHTML;
    pressureDiastolic = document.getElementById("pressureDiastolic").innerHTML;
   
    if(pressureSystolic >= 90 && pressureSystolic<=120 &&
     pressureDiastolic >= 60 && pressureDiastolic<=80){
        document.getElementById("bloodPresure").style.color = "#2ecc71";
    }
    else{
        document.getElementById("bloodPresure").style.color = "#c0392b";
        pacientStatus = false;
    }
    
    if(pacientStatus){
        document.getElementById("pacientStatus").style.background = "#2ecc71";
        document.getElementById("pacientStatus").style.borderColor = "#4fee93";
    }
    else{
        document.getElementById("pacientStatus").style.background = "#c0392b"; 
        document.getElementById("pacientStatus").style.borderColor = "#d14a3c";
    }
    
}


function updateBreath() { 
				
  if (breathDir) {
	breathAmt -= breathInc;
  } else {  // breath out
	breathAmt += breathInc;
  }
    if(breathAmt > 2 || breathAmt < -2) {
	  breathDir = !breathDir;
	}
}

function updateHeart() {
    if(heartRate==0){
        heartRate = document.getElementById("pulseValue").innerHTML;
    }
    else if(heartRate>71&&heartRate<=75){
        heartSize=0;
        document.getElementById("pulse").style.color = "#2ecc71";
    }
    else {
        document.getElementById("pulse").style.color = "#c0392b";
        pacientStatus=false;
        if(heartDir){
            heartSize-=heartRate/4000;
        }
        else {
            heartSize+=heartRate/4000;        
        }

        if (heartSize<0.39999 || heartSize>0.59999){
            heartDir = !heartDir;
        }
    }
}



function updateEyes() {
    
    if (eyesSize<=-0.89999 || eyesSize>0){
        eyesDir = !eyesDir;
    }
    
    if(eyesDir){
        if (eyesSize<=-0.7){
            eyesSize+=0.001;
        }
        else {
            eyesSize+=0.1;        
        }
    }
    else {
        eyesSize-=0.1;        
    }
    

}

