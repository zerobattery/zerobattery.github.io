/**  Coded by Tharun @zerobattery  **/

      //Initialising the canvas
      var canvas = document.querySelector('.myCanvas');
      var width = canvas.width = 1920;
      var height = canvas.height = width * 9 / 16;
      var ctx = canvas.getContext('2d');
      var x;
      var y;
      var mouseClicked;
      var keysPressed = [];
      var time = 0;
      var time1 = 0;
      //Game engine by Tharun
      function PVector(x, y) {
        this.x = x;
        this.y = y;
      }
      PVector.prototype.add = function(v) {
        this.x += v.x;
        this.y += v.y;
      };
      PVector.prototype.mult = function(v) {
        this.x = this.x * v;
        this.y = this.y * v;
      };
      function updateCoordinates(event) {
        x = event.clientX - canvas.offsetLeft;
        y = event.clientY - canvas.offsetTop;
      }
      function updateMouseStatus() {
        mouseClicked = true;
      }
      function updateTouch(event) {
        x = event.touches[0].clientX - canvas.offsetLeft;
        y = event.touches[0].clientY - canvas.offsetTop;
      }   
      function keyDownHandler(event) {
        var key = event.keyCode;
        if(!keysPressed.includes(key)) {
          keysPressed.push(key);
        }
      }
      function keyUpHandler(event) {
        var key = event.keyCode;
        if(keysPressed.includes(key)) { 
          keysPressed.splice(keysPressed.indexOf(key), 1);
        }
      }
      function random(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }
      function dist(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      }
      function roundedRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x, y + radius);
        ctx.lineTo(x, y + height - radius);
        ctx.arcTo(x, y + height, x + radius, y + height, radius);
        ctx.lineTo(x + width - radius, y + height);
        ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
        ctx.lineTo(x + width, y + radius);
        ctx.arcTo(x + width, y, x + width - radius, y, radius);
        ctx.lineTo(x + radius, y);
        ctx.arcTo(x, y, x, y + radius, radius);
        ctx.fill();
      }

      //Loading....Loading... - Graphics and UI
      function drawBurgerShop() {
        ctx.fillStyle = 'rgba(0, 255, 0, 1)';
        ctx.font = '150px Play';
        ctx.fillText('S', 150, 200);
        ctx.fillText('B', 140, 320);
        ctx.font = '120px Play';
        ctx.fillText('P', 230, 200);
        ctx.fillText('U', 230, 320);
        ctx.font = '100px Play';
        ctx.fillText('A', 290, 200);
        ctx.fillText('R', 310, 320);
        ctx.fillText('G', 370, 320);
        ctx.font = '110px Play';
        ctx.fillText('C', 360, 200);
        ctx.fillText('E', 440, 320);
        ctx.font = '140px Play';
        ctx.fillText('E', 420, 200);
        ctx.fillText('R', 500, 320);
        ctx.font = '150px Play'
        ctx.fillText('S', 575, 320);
        ctx.fillStyle = '#edc72a';
        ctx.beginPath();
        ctx.arc(width / 5, height / 2, width / 20, Math.PI, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.arc(width / 5, height / 1.85, width / 20, 0, Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = 'rgb(0, 0, 0)';
      }

      //SpaceShip Graphics and Physics
      function Zero(x, y) {
        this.position = new PVector(x, y);
        this.velocity = new PVector(0, 0);
        this.acceleration = new PVector(0, 0);
        this.friction = new PVector(0, 0);
      }

      Zero.prototype.display = function() {
        //Wing - Left
        ctx.fillStyle = 'rgb(150, 150, 150)';
        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y - 60);
        ctx.lineTo(this.position.x - 50, this.position.y - 40);
        ctx.lineTo(this.position.x - 50, this.position.y - 20);
        ctx.lineTo(this.position.x, this.position.y - 35);
        ctx.closePath();
        ctx.fill();
        //Wing - Right
        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y - 60);
        ctx.lineTo(this.position.x + 50, this.position.y - 40);
        ctx.lineTo(this.position.x + 50, this.position.y - 20);
        ctx.lineTo(this.position.x, this.position.y - 35);
        ctx.closePath();
        ctx.fill();
        //Main Base
        ctx.fillStyle = 'rgb(200, 200, 200)';
        ctx.beginPath();
        ctx.moveTo(this.position.x - 20, this.position.y);
        ctx.quadraticCurveTo(this.position.x, this.position.y - 150, this.position.x + 20, this.position.y);
        ctx.closePath();
        ctx.fill();
        //Cockpit
        ctx.fillStyle = 'rgba(0, 0, 250, 0.5)'
        ctx.beginPath();
        ctx.moveTo(this.position.x - 10, this.position.y - 15);
        ctx.quadraticCurveTo(this.position.x, this.position.y - 90, this.position.x + 10, this.position.y - 15);
        ctx.closePath();
        ctx.fill();
        //TailWing - Left
        ctx.fillStyle = 'rgb(150, 150, 150)';
        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y - 15);
        ctx.lineTo(this.position.x - 60, this.position.y + 5);
        ctx.lineTo(this.position.x - 60, this.position.y + 30);
        ctx.lineTo(this.position.x, this.position.y + 10);
        ctx.closePath();
        ctx.fill();
        //Tailwing - Right
        ctx.fillStyle = 'rgb(150, 150, 150)';
        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y - 15);
        ctx.lineTo(this.position.x + 60, this.position.y + 5);
        ctx.lineTo(this.position.x + 60, this.position.y + 30);
        ctx.lineTo(this.position.x, this.position.y + 10);
        ctx.closePath();
        ctx.fill();
        //Other Stuff
        ctx.fillStyle = 'rgb(100, 100, 100)';
        ctx.fillRect(this.position.x - 50, this.position.y - 40, 5, 30);
        ctx.fillRect(this.position.x + 50, this.position.y - 40, 5, 30);
        ctx.fillRect(this.position.x - 60, this.position.y + 5, 5, 35);
        ctx.fillRect(this.position.x + 60, this.position.y + 5, 5, 35);
        ctx.fillRect(this.position.x - 30, this.position.y - 4, 5, 35);
        ctx.fillRect(this.position.x + 30, this.position.y - 4, 5, 35);
      };
      
      Zero.prototype.update = function() {
        this.acceleration.x = 0;
        this.acceleration.y = 0;
        if(keysPressed.includes(37)) {
          this.acceleration.x = -0.4;
        }
        if(keysPressed.includes(39)) {
          this.acceleration.x = 0.4;
        }
        if(keysPressed.includes(38)) {
          this.acceleration.y = -0.4;
        }
        if(keysPressed.includes(40)) {
          this.acceleration.y = 0.4;
        }
        this.velocity.add(this.acceleration);
        if(!this.velocity.x == 0) {
          this.velocity.add(this.friction);
        }
        if(!this.velocity.y == 0) {
          this.velocity.add(this.friction);
        }
        if(this.position.x < 65) {
          this.velocity.x = 1;
        }
        if(this.position.x > width-65) {
          this.velocity.x = -1;
        }
        if(this.position.y < 75) {
          this.velocity.y = 1;
        }
        if(this.position.y > height-50) {
          this.velocity.y = -1;
        }
        this.position.add(this.velocity);
        this.friction.x = -0.02*this.velocity.x;
        this.friction.y = -0.02*this.velocity.y;
      };

      Zero.prototype.fire = function() { 
        if(keysPressed.includes(16) || keysPressed.includes(17)) {
          if(time-time1 > 20) {
            bullets.push(new Bullet(this.position.x, this.position.y - 100));
            time1 = time;
          }
        }
      }

      var zero = new Zero(200, 700);

      //Bullet graphics and physics
      function Bullet(x, y) {
        this.position = new PVector(x, y);
        this.velocity = new PVector(0, -7);
        this.acceleration = new PVector(0, -1);
      }

      Bullet.prototype.display = function() {
        ctx.fillStyle = 'rgb(255, 0, 0)';
        ctx.fillRect(this.position.x, this.position.y, 5, 15);
      }

      Bullet.prototype.update = function() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
      }

      var bullets = [];

      function bulletHandler() {
        for(var i = 0; i < bullets.length; i++) {
          bullets[i].display();
          bullets[i].update();
          if(bullets[i].position.y < -10) {
            bullets.splice(i, 1);
          }
        }
      }

      document.addEventListener('keydown', keyDownHandler, false);
      document.addEventListener('keyup', keyUpHandler, false);

      function main() {
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillRect(0, 0, width, height);
        zero.display();
        zero.update();
        zero.fire();
        bulletHandler();
        requestAnimationFrame(main);
        time++;
      }
      main();
      
