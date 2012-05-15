// parameters
var width = 640;
var height = 480;

// line class
var LineV = function(speed, x) {
  this.speed = speed;
  this.x     = x;
  
  this.draw  = function(c) {
    c.beginPath();
    c.moveTo(this.x, 0);
    c.lineTo(this.x, height);
    this.x = (this.x + this.speed) % width;
    c.stroke();
  };
};

var LineH = function(speed, y) {
  this.speed = speed;
  this.y     = y;
  
  this.draw  = function(c) {
    c.beginPath();
    c.moveTo(0, this.y);
    c.lineTo(width, this.y);
    this.y = (this.y + this.speed) % height;
    this.y = this.y < 0 ? height : this.y;
    c.stroke();
  };
};

// init
enchant();

window.onload = function() {
  var game = new Game(width, height);
  game.fps = 24;
  game.preload("seccon.png");

  game.onload = function() {
    logo = new Sprite(width, height);
    logo.image = game.assets["seccon.png"];
    logo._element.style.zIndex = 2;
    game.rootScene.addChild(logo);
    
    var layer = new Sprite(width, height);
    layer.image = new Surface(width, height);
    layer._element.style.zIndex = 1;
    game.rootScene.addChild(layer);

    var lines = [];
    lines.push(new LineV(3, 0));
    lines.push(new LineV(3, 20));
    lines.push(new LineV(3, 40));
    lines.push(new LineV(3, 200));
    lines.push(new LineV(3, 220));
    lines.push(new LineV(3, 240));
    lines.push(new LineV(3, 400));
    lines.push(new LineV(3, 420));
    lines.push(new LineV(3, 440));
    
    lines.push(new LineV(5, 200));
    lines.push(new LineV(5, 230));
    lines.push(new LineV(5, 260));
    lines.push(new LineV(5, 400));
    lines.push(new LineV(5, 430));
    lines.push(new LineV(5, 460));
    
    lines.push(new LineH(3, 0));
    lines.push(new LineH(3, 20));
    lines.push(new LineH(3, 40));
    lines.push(new LineH(3, 100));
    lines.push(new LineH(-3, 300));
    lines.push(new LineH(-3, 420));
    lines.push(new LineH(-3, 440));
    lines.push(new LineH(-3, 460));
    

    var c = layer.image.context
    game.addEventListener("enterframe", function(e) {
      c.clearRect(0, 0, width, height);
      c.lineWidth = 2;
      c.strokeStyle = 'rgb(255, 255, 255)';
      
      for (var i in lines) {
        lines[i].draw(c);
      }
    });
  };

  game.start();
};
