class Ghost{
    constructor(x,y,_type){
        this.x = x;
        this.y = y;
        this.temp = 22;
        this.xdir = 1;
        this._type = _type;
        if (_type == 1) {
            this.health = 1;// norm
            this.point = 30;
        }else if (_type == 2) {
            this.health = 5; // heavy
          this.point = 70;
        }else if (_type == 3) {
            this.health = 5; // shooter
          this.point = 100;
        }else if (_type == 4) {
            this.health = 5; // invis
        }else if (_type == 5) {
            this.health = 2;
        }
    }
    show(){
        if (this._type == 1) {
            image(boo,this.x,this.y,48,48);
        }else if (this._type == 2) {
            image(pinky,this.x,this.y,48,48);
        }else if (this._type == 3) {
            image(inky,this.x,this.y,48,48);
        }else{
        noStroke();
        fill(255,255,255,200);
        ellipse(this.x,this.y,this.temp*2,this.temp*2);
        }
    }
    move(){
        this.x += this.xdir;
    }
    shift(){
        this.xdir *= -1;
        this.y += this.temp * 2;
    }
    shoot(){
        
    }
}