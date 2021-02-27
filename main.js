let p1, p2, spn, boo, inky, pinky, pla, cred, gover, thanks,p1idle,p1right,p1left,p1dead,p2idle,p2left,p2right,p2dead,pd,pdp,score,laser,glaser,destroyed,arrows,wad,tutorial,music,credit,phit;
let level = 0;
let pHealth = 100;
let bullets = [];
let eb = [];
let ghosts = [];
let particles = [];
let currentScreen = 'menu';

function preload() {
  boo = loadImage('p-art/boo.png');
  pinky = loadImage('p-art/pinky.png');
  inky = loadImage('p-art/inky.png');
  pla = loadImage('tutorial/play.png');
  cred = loadImage('tutorial/credits.png');
  gover = loadImage('tutorial/gameover.png');
  thanks = loadImage('tutorial/thanks.png');
  p1idle = loadImage('p-art/p1idle.png');
  p1left = loadImage('p-art/p1left.png');
  p1right = loadImage('p-art/p1right.png');
  p1dead = loadImage('p-art/p1dead.png');
  p2idle = loadImage('p-art/p2idle.png');
  p2left = loadImage('p-art/p2left.png');
  p2right = loadImage('p-art/p2right.png');
  p2dead = loadImage('p-art/p2dead.png');
  tutorial = loadImage('tutorial/tutorial.png');
  wad = loadImage('tutorial/wad.png');
  arrow = loadImage('tutorial/arrows.png');
  credit = loadImage('tutorial/credit.png');
  soundFormats('mp3', 'wav');
  laser = loadSound('sounds/laser.wav');
  destroyed = loadSound('sounds/destroyed.wav');
  phit = loadSound('sounds/phit.wav');
  glaser = loadSound('sounds/ghostbeam.wav');
  music = loadSound('sounds/music.wav');
}

function setup() {
  createCanvas(960, 540);
  p1 = new Player1();
  p2 = new Player2();
  score = 0;
  //for (let i = 0; i < 6; i++) {
  //   ghosts[i] = new Ghost(i*80+80,60,1);  
  //}
  spn = new Spawner();
  mnu = new Menu();
  // let test = new Ghost(100,100,1);
  // test.show();
  
  music.loop();
}

function mousePressed() {
  if (currentScreen == 'menu') {
    if (mouseX > 80 && mouseX < 240 && mouseY > 180 && mouseY < 300) {
      level = 0;
      currentScreen = 'game';
      score = 0;
    }
    // if (mouseY > 180 && mouseY < 300) {
    //   console.log('works!')
    //   currentScreen = 'game';
    // }
  }
}

function draw() {
  //console.log(pHealth);
  background(33);
  rectMode(CORNER);
  fill(200);
  rect(0,505,width,height)

  if(p1.x > p2.x){
    pd = p1.x - p2.x;
  }else if(p2.x >p1.x) {
    pd = p2.x - p1.x;
  }
  if (currentScreen == 'menu') {
    mnu.show();

  } else if (currentScreen == 'game') {
    spn.spawn(level);
    textAlign(LEFT);
    fill(252,105,50);
    textSize(30);
    text('score:',20,30);
    fill(255);
    text(score,100,30);
    textAlign(CENTER);
    textSize(20);
    fill(0);
    text(pHealth +' / 100 ❤️',width/2,528);
    
  } else if (currentScreen == 'gameover') {
    imageMode(CORNER);
    image(gover, 240, 180, 480, 180);
    
    textAlign(CENTER);
    textSize(80);
    fill(255);
    text(score,width/2,70);
  }
  if(ghosts.length < 1 && level >= spn.waves.length){
         
          imageMode(CORNER);
          image(thanks,width/4,height/4,width/2,height/2);
    }
  if (pHealth < 1) {
    currentScreen = 'gameover';
    for (let i = ghosts.length - 1; i >= 0; i--) {
      ghosts.splice(i, 1);
    }
    level = 0;
    pHealth = 100;
  }
  
  let edge = false;
  for (let i = 0; i < ghosts.length; i++) {
    ghosts[i].show();
    ghosts[i].move();
    if (ghosts[i].x + ghosts[i].temp * 1.5 > width || ghosts[i].x - ghosts[i].temp * 1.5 < 0) {
      edge = true;
    }
    if (ghosts[i]._type == 3) {
      if (Math.random() < 0.008) {
        let b = new EBull(ghosts[i].x, ghosts[i].y, 4, 4);
        eb.push(b);
        glaser.play();
      }
    }
    if (ghosts[i].health <= 0) {
      score += ghosts[i].point;
      ghosts.splice(i, 1);
      destroyed.play()
      return;
    }
    if (ghosts[i].y > height - 60) {
      pHealth = pHealth - ghosts[i].health;
      ghosts.splice(i, 1);
      
    }
  }
  p1.show(pd);
  p2.show(pd);
  p1.move();
  p2.move();
  if (edge) {
    for (let i = 0; i < ghosts.length; i++) {
      ghosts[i].shift();
    }
  }
  for (let bu of bullets) {
    bu.show();
    bu.update();
    for (let i = 0; i < ghosts.length; i++) {
      if (bu.hit(ghosts[i])) {
        ghosts[i].health = ghosts[i].health - 1;
        bu.rem();
      }
    }
  }
  for (let ebu of eb) {
    ebu.show();
    ebu.update();
    if (ebu.hit(p1)) {
      pHealth = pHealth - 1;
      phit.play();
      ebu.rem();
    }
    if (ebu.hit(p2)) {
      pHealth = pHealth - 1;
      phit.play();
      ebu.rem();
    }
  }
  
  for (let i = bullets.length - 1; i >= 0; i--) {
    if (bullets[i].tD) {
      bullets.splice(i, 1);
    }
  }
  for (let i = eb.length - 1; i >= 0; i--) {
    if (eb[i].tD) {
      eb.splice(i, 1);
    }
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      // remove this particle
      particles.splice(i, 1);
    }
  }
}

function keyReleased() {
  if (keyCode === 65 && !keyIsDown(68)) {
    p1.setDir(0);
  }
  if (keyCode === 68 && !keyIsDown(65)) {
    p1.setDir(0);
  }
  if (keyCode === 37 && !keyIsDown(39)) {
    p2.setDir(0);
  }
  if (keyCode === 39 && !keyIsDown(37)) {
    p2.setDir(0);
  }
}

function keyPressed() {
  if (keyCode === 65) {
    p1.setDir(-1);
  } else if (keyCode === 68) {
    p1.setDir(1);
  }
  if (keyCode === 37) {
    p2.setDir(-1);
  } else if (keyCode === 39) {
    p2.setDir(1);
  }
  if (keyCode === 87) {
    if(pd < 320){
    let b = new Bullet(p1.x, height - p1.yoff, 4, 5);
    bullets.push(b);
      laser.play();
      laser.volume = 0.2;
    }
  }
  if (keyCode === 38) {
    if(pd < 320 ){
    let b = new Bullet(p2.x, height - p2.yoff, 4, 5);
    bullets.push(b);
      laser.play();
      laser.volume = 0.2;
      }
  }
  if (currentScreen == 'menu' && keyCode === 32) {
    level = 0;
    currentScreen = 'game';
    score = 0;
  }
  if (currentScreen == 'gameover' && keyCode === 32) {
    level = 0;
    currentScreen = 'game';
    score = 0;
  }
  if (currentScreen == 'game' && keyCode === 27) {
    currentScreen = 'menu';
    score = 0;
    for (let i = ghosts.length - 1; i >= 0; i--) {
      ghosts.splice(i, 1);
    }
    pHealth = 100;
    level = 0;
  }
}
