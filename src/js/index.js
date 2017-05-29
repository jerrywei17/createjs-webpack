require('Easeljs');
require('Tweenjs');
require('Preloadjs');


var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Create a stage by getting a reference to the canvas
stage = new createjs.Stage("canvas");
createjs.Ticker.addEventListener("tick", function() {
    stage.update();
});
//Create a Shape DisplayObject.
circle = new createjs.Shape();
circle.graphics.beginFill("red").drawCircle(0, 0, 40);
//Set position of Shape instance.
circle.x = circle.y = 50;
//Add Shape instance to stage display list.
circle.alpha = 0;
createjs.Tween.get(circle).to({ alpha: 1 }, 1000)
stage.addChild(circle);

console.log(window.createjs);