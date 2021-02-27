class Player1{
    constructor(){
        this.x = width/4;
        this.xdir = 0;
        this.yoff = 60;
        this.w = 40;
        this.h = 50;
        this.y = height - this.yoff;
    }
    
    show(pd){
        noStroke();
        fill(100);
        rectMode(CENTER);
        rect(this.x,this.y, this.w, this.h);
      if(pd < 320){
        if(this.xdir == 0){
          imageMode(CENTER);
          image(p1idle,this.x,this.y, this.w, this.h);
        } else if(this.xdir == 1){
          let p = new Particle(this.x,this.y + 30 ,this.xdir,220);
      particles.push(p);
          imageMode(CENTER);
          image(p1right,this.x,this.y, this.w, this.h);
        } else if(this.xdir == -1){
          let p = new Particle(this.x,this.y + 30 ,this.xdir,220);
      particles.push(p);
          imageMode(CENTER);
          image(p1left,this.x,this.y, this.w, this.h);
        } 
      }else{
        if(this.xdir != 0){
        let p = new Particle(this.x,this.y + 30 ,this.xdir,220);
      particles.push(p);
        }
        imageMode(CENTER);
          image(p1dead,this.x,this.y, this.w, this.h);
      }
       
    }
    setDir(dir){
        this.xdir = dir;
    }
    move(){
        this.x += this.xdir * 5;
        if(this.x - (this.w/2) < 0 ){
            this.x = this.w/2;
        } else if(this.x + (this.w/2) > width){
            this.x = width - (this.w/2);
        }
    }
}
class Player2{
    constructor(){
        this.x = (3 * width)/4;
        this.xdir = 0;
        this.yoff = 60;
        this.w = 40;
        this.h = 50;
        this.y = height - this.yoff;
    }
    
    show(pd){
        noStroke();
        fill(180);
        rectMode(CENTER);
        rect(this.x,this.y, this.w, this.h);
        if(pd < 320){
        if(this.xdir == 0){
          imageMode(CENTER);
          image(p2idle,this.x,this.y, this.w, this.h);
        } else if(this.xdir == 1){
          let p = new Particle(this.x,this.y + 30 ,this.xdir,220);
      particles.push(p);
          imageMode(CENTER);
          image(p2right,this.x,this.y, this.w, this.h);
        } else if(this.xdir == -1){
          let p = new Particle(this.x,this.y + 30 ,this.xdir,220);
      particles.push(p);
          imageMode(CENTER);
          image(p2left,this.x,this.y, this.w, this.h);
        } 
      }else{
        if(this.xdir != 0){
        let p = new Particle(this.x,this.y + 30 ,this.xdir,220);
      particles.push(p);
        }
        imageMode(CENTER);
          image(p2dead,this.x,this.y, this.w, this.h);
      }
    }
    setDir(dir){
        this.xdir = dir;
    }
    move(){
        this.x += this.xdir * 5;
        if(this.x - (this.w/2) < 0 ){
            this.x = this.w/2;
        } else if(this.x + (this.w/2) > width){
            this.x = width - (this.w/2);
        }
    }
}