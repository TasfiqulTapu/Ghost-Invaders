
class Particle {
  constructor(x,y,vx,col) {
    this.x = x;
    this.y = y;
    if(vx == 1){
      this.vx = 1;
    }else if(vx == -1){
      this.vx = -1;
    }else{
      this.vx = random(-1, 1);
    }
    this.vy = random(0, -1);
    this.col = col;
    this.alpha = 255;
  }

  finished() {
    return this.alpha < 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 5;
  }

  show() {
    noStroke();
    //stroke(255);
    fill(this.col, this.alpha);
    rectMode(CENTER);
    rect(this.x, this.y, 10,10);
  }
}