class Bullet{
    constructor(x,y,r,speed){
        this.x = x;
        this.y = y;
        this.r = r;
        this.td = false;
        this.speed = speed;
    }
    show(){
        noStroke();
        fill(230,230,30);
        ellipse(this.x,this.y,this.r*2,this.r*2);
    }
    hit(ghost){
        let d = dist(this.x,this.y,ghost.x,ghost.y);
        if(d<  this.r + ghost.temp){
            return true;
        } else {
            return false;
        }
    }
    update(){
        this.y -= this.speed;
        if (this.y < 0) {
            this.td = true;
        }
    }
    rem(){
        this.td = true;
        this.x = 1000;
    }
}
class EBull{
    constructor(x,y,r,speed){
        this.x = x;
        this.y = y;
        this.r = r;
        this.td = false;
        this.speed = speed;
    }
    show(){
        noStroke();
        fill(93,73,106);
        ellipse(this.x,this.y,this.r*2,this.r*2);
    }
    hit(player){
        let d = dist(this.x,this.y,player.x,player.y);
        if(d<  this.r + player.w){
            return true;
        } else {
            return false;
        }
    }
    update(){
        this.y += this.speed;
        if (this.y > height) {
            this.td = true;
        }
    }
    rem(){
        this.td = true;
        this.x = 1000;
    }
}