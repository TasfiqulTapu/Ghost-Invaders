class Menu{
    constructor(){

    }
    show(){
        imageMode(CORNER);
        image(pla,80,180,140,120);
        image(tutorial,width/2 - 100,350,140,100);
        image(wad,width/2 - 350,370,80,80);
        image(arrow,width - 240,370,80,80);
        image(cred,80,300,140,60);
        if (mouseX > 80 && mouseX < 240 && mouseY > 300 && mouseY < 360 ) {
            rectMode(CORNER);
            image(credit,480,108,186,162);
        }
    }
    clearScreen(ghosts){
        for (let i = ghosts.length-1; i >= 0 ; i--) {
            ghosts.splice(i,1);
        }
    }
    
}