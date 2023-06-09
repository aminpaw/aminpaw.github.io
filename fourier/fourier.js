let time = 0;
let wave = [];
let k = 10;
function setup(){
    //make a backbutton with round corners and player 2 ready font
    let back = createButton('Back');
    back.style('font-family', '"Press Start 2P", consolas, monospace');
    back.style('border-radius', '10px');
    back.style('background-color', 'white');
    back.style('color', 'black');
    back.style('font-size', '20px');
    back.style('border', 'none');
    back.style('padding', '10px');
    back.style('position', 'absolute');
    back.style('top', '50px');
    back.style('left', '50px');
    back.style('z-index', '1');
    back.mousePressed(function(){
        window.location.href = '../index.html';
    });



    if (window.innerWidth > window.innerHeight){
        createCanvas(window.innerWidth*0.8, window.innerHeight);
    }else{
        createCanvas(window.innerWidth, window.innerHeight*0.8);
    }
        // move canvas to center of any screen
    canvas = document.querySelector('canvas');
    canvas.style.position = 'absolute';
    canvas.style.left = (window.innerWidth - width) / 2 + 'px';
    //canvas.style.top = (window.innerHeight - height) / 2 + 'px';
    canvas.style.zIndex = -1;

    //draw square grid


    // move slider below canvas 
    slider = document.getElementById("myRange");
    slider.style.position = 'absolute';
    slider.style.width = window.innerWidth*0.8 + 'px';
    slider.style.left = (window.innerWidth - width) / 2 + 'px';
    slider.style.top = window.innerHeight*1.1 + height/5 + 'px';
    slider.style.zIndex = 1;

}

function draw(){

    strokeWeight = 1;
    if (width>height){
        Horizontal();
    }else{
        Vertical();
    }
    //draw square grid
    let count = 0;
    translate(-width/2, -height/2);
    for (let i = -1500; i < 10000; i+=height/40){
        stroke(255, 40);
        strokeWeight = 0.5;
        if (count%5 == 0){
            stroke(255, 100);
            strokeWeight = 1.1;
        }
        line(i,-height,i,height);
        line(-width,i,width,i);
        count += 1;
    }
}

function Horizontal(){
    background(0);
    translate(width/3, height/2);
    k = slider.value; // Display the default slider value
    //update printed k value
    document.getElementById("k_val").innerHTML = "K= " + k;
    // Update the current slider value (each time you drag the slider handle)
    let kViz = document.getElementById("k_val");
    //move text to left upper corner of canvas
    kViz.style.position = 'absolute';
    kViz.style.left = (window.innerWidth - width*0.9) / 2 + 'px';
    kViz.style.top = (window.innerHeight - height*0.5) / 2 + 'px';
    kViz.style.zIndex = 1;

    let x = 0;
    let y = 0;

    for (let i = 0; i < k; i++){
        n = 2*i + 1;
        prevX = x;
        prevY = y;
        let radius = (height/4) * (4 / (n * PI));
        stroke(255);
        noFill();
        ellipse(prevX, prevY, radius * 2);
        x += radius * cos(n*time);
        y += radius * sin(n*time);
        stroke(255, 75);
        line(prevX, prevY, x, y);
        fill(255);
        ellipse(x,y,5);
    }
    wave.unshift(y);
    line(x , y, width/3, wave[0]);
    beginShape();
    translate(width/3, 0);
    stroke(255);
    noFill();
    for (let i = 0; i < wave.length; i++){
        vertex(i, wave[i]);
    }
    endShape();
    if (wave.length > 500){
        wave.pop();
    }
    time += 0.02;
}

function Vertical(){
    background(0);
    translate(width/2, height/3);
    k = slider.value; // Display the default slider value
    //update printed k value
    document.getElementById("k_val").innerHTML = "K= " + k;
    // Update the current slider value (each time you drag the slider handle)
    let kViz = document.getElementById("k_val");
    //move text to left upper corner of canvas
    kViz.style.position = 'absolute';
    kViz.style.left = (window.innerWidth - width*0.9) / 2 + 'px';
    kViz.style.top = (window.innerHeight - height*0.5) / 2 + 'px';
    kViz.style.zIndex = 1;

    let x = 0;
    let y = 0;

    for (let i = 0; i < k; i++){
        n = 2*i + 1;
        prevX = x;
        prevY = y;
        let radius = (width/4) * (4 / (n * PI));
        stroke(255);
        noFill();
        ellipse(prevY, prevX, radius * 2);
        x += radius * cos(n*time);
        y += radius * sin(n*time);
        stroke(255, 75);
        line(prevY, prevX, y, x);
        fill(255);
        ellipse(y,x,5);
    }
    wave.unshift(y);
    line(y , x, wave[0],height/3);
    beginShape();
    translate(0, height/3);
    stroke(255);
    noFill();
    for (let i = 0; i < wave.length; i++){
        vertex(wave[i],i);
    }
    endShape();
    if (wave.length > 500){
        wave.pop();
    }
    time += 0.02;
}