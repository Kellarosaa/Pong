let sizeX=1100;
let sizeY=800;
let mode="1-P"; // options: "1-P" /"2-P"
function setup() {
  createCanvas(sizeX, sizeY);// use the var sizes!
  background(153);
  font = loadFont('assets/Atari.ttf');
  textFont(font);
}

let rectY=[];
rectY[0]=sizeY/2+sizeY/12/2;
rectY[1]=sizeY/2+sizeY/12/2;
let rectX=[];
rectX[0]=sizeX/16;
rectX[1]=sizeX/16;
let rectThickness=sizeX/100;
let rectHeight=sizeY/14;
let ballPath=1; // random
let ballY=sizeY/2;
let ballX=sizeX/2;
let ballYC;
let scores= [];
scores[0]=0;
scores[1]=0;
function draw() {
  fill(255,255,255);
  stroke(255,255,255);
  background(0);
  scoress();
  centerLine(16, 3, 22);
  playerBars(sizeY/43, 0.4); // 5 alternative!!!!! / 47
  ballMovement(kleiner(sizeX, sizeY)/88, 22, 3); //20, 18, 22 ; width1 10
}
//rectY[1]=ballY-rectHeight/2+random(-rectHeight/2-rectHeight/2/10, rectHeight/2+rectHeight/2/10);
let newCompSpeed=true;
let compSpeed1;
function playerBars(compSpeed, compSpeedVariation) { // widht1
  if (mode=="1-P") {
    //if (ballY-rectHeight/2>0&&ballY-rectHeight/2+rectHeight<sizeY) { // bar computer
    if (ballX>sizeX/2&&ballPath==2) {
      if  (newCompSpeed==true) {
        newCompSpeed=false;
        compSpeed1=compSpeed*random(1-compSpeedVariation, 1+compSpeedVariation);
        log(compSpeed1+" compSpeed");
      }
      if (ballY-rectY[1]-rectHeight/2<0) {
        rectY[1]-= compSpeed1;
      } else if (ballY-rectY[1]-rectHeight/2>0) {
        rectY[1]+= compSpeed1;
      }
    } else {
      newCompSpeed=true;
    }
    if (rectY[1]<0) {
      rectY[1]=0;
    } else if (rectY[1]>sizeY-rectHeight) {
      rectY[1]=sizeY-rectHeight;
    }
    rectX[1]=sizeX-sizeX/16;
    rect(rectX[1], rectY[1], rectThickness, rectHeight);

    if (mouseY-rectHeight/2>0&&mouseY-rectHeight/2+rectHeight<sizeY) { // bar player with mouse
      rectY[0]=mouseY-rectHeight/2;
      rectX[0]=sizeX/16;
      rect(rectX[0], rectY[0], rectThickness, rectHeight);
    } else if (mouseY-sizeY/8/2<0) {
      rect(rectX[0], 0, rectThickness, rectHeight);
    } else if (mouseY-sizeY/8/2+sizeY/8>sizeY) {
      rect(rectX[0], sizeY-rectHeight, rectThickness, rectHeight);
    }
  } else if (mode=="2-P") {
  }
}




function centerLine (distances, width1, height1) {
  let finished=false;
  let counter=sizeY+sizeY/15; // start-value
  while (finished==false) {
    counter-=distances+height1;
    rect(sizeX/2-width1/2, counter, width1, height1);
    if (counter<0) {
      finished=true;
    }
  }
}
 
function ballMovement (width1,speed, intensity) {
  if (ballPath==0.1) {
    ballPath=1;
  } else if (ballPath==0.2) {
    ballPath=2;
  }
  if (ballY<=0) {
    ballYC*=-1;
  } else if (ballY+width1>=sizeY) {
    ballYC*=-1;
  } 
  if (ballX-speed<=rectX[0] && ballX<rectX[0]-rectThickness==false && ballY+width1>=rectY[0] && ballY<=rectY[0]+rectHeight && ballPath==1) {
    ballYC=ballY+width1/2-rectY[0]-rectHeight/2;
    log(ballYC+" left");
    ballX=rectX[0]+rectThickness;
    ballPath=0.2;
  } else if (ballX+speed>=rectX[1] && ballX>rectX[1]+rectThickness==false && ballY+width1>=rectY[1] && ballY<=rectY[1]+rectHeight && ballPath==2) {
    ballYC=ballY+width1/2-rectY[1]-rectHeight/2;
    log(ballYC+" right");
    ballX=rectX[1]-width1;
    ballPath=0.1;
  } else if (ballPath==2) { //
    ballX+=speed;
    ballY+=ballYC/intensity;
  } else if (ballPath==1) {
    ballX-=speed;
    ballY+=ballYC/intensity;
    //ballY=sizeY/2;
  }
  if (ballX<=0) {
    scores[1]+=1;
    ballX=sizeX/2+width1/2;
    ballY=sizeY/2-width1/2;
    ballYC=0;
  } else if (ballX>= sizeX) {
    scores[0]+=1;
    ballX=sizeX/2+width1/2;
    ballY=sizeY/2-width1/2;
    ballYC=0;
  }
  rect(ballX, ballY, width1, width1);
}

function scoress() {
  textAlign(CENTER, CENTER);
  textSize(kleiner(sizeY, sizeX)/15);
  text(scores[0], sizeX/4, sizeY/8);
  text(scores[1], sizeX-sizeX/4, sizeY/8);
}


function kleiner(n1, n2) { // if equal also kleiner==n1
  if (n1<=n2) {
    return n1;
  } else {
    return n2;
  }
}
