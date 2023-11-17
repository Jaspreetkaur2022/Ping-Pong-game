document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('pong-game');
    const ctx = canvas.getContext('2d');
    const paddleWidth = 10;
    const paddleHeight = 60;
    const paddleSpeed = 4;
    let paddle1Y = canvas.height / 2 - paddleHeight / 2;
    let paddle2Y = canvas.height / 2 - paddleHeight / 2;
    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let ballSpeedX = 5;
    let ballSpeedY = 2;
  
    function drawPaddle(x, y) {
      ctx.fillStyle = '#e74c3c'; // Paddle color
      ctx.fillRect(x, y, paddleWidth, paddleHeight);
    }
  
    function drawBall() {
      ctx.fillStyle = '#3498db'; // Ball color
      ctx.beginPath();
      ctx.arc(ballX, ballY, 8, 0, 2 * Math.PI);
      ctx.fill();
    }
  
    function clearCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  
    function update() {
      clearCanvas();
  
      // Move paddles
      if (paddle1Y < canvas.height - paddleHeight && paddle2Y < canvas.height - paddleHeight) {
        if (paddle1Y < ballY - paddleHeight / 2) {
          paddle1Y += paddleSpeed;
        }
  
        if (paddle2Y < ballY - paddleHeight / 2) {
          paddle2Y += paddleSpeed;
        }
      }
  
      // Move ball
      ballX += ballSpeedX;
      ballY += ballSpeedY;
  
      // Bounce off the top and bottom
      if (ballY < 0 || ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
      }
  
      // Bounce off paddles
      if (
        (ballX < paddleWidth && ballY > paddle1Y && ballY < paddle1Y + paddleHeight) ||
        (ballX > canvas.width - paddleWidth && ballY > paddle2Y && ballY < paddle2Y + paddleHeight)
      ) {
        ballSpeedX = -ballSpeedX;
      }
  
      // Check for scoring
      if (ballX < 0 || ballX > canvas.width) {
        resetGame();
      }
  
      drawPaddle(0, paddle1Y);
      drawPaddle(canvas.width - paddleWidth, paddle2Y);
      drawBall();
  
      requestAnimationFrame(update);
    }
  
    function resetGame() {
      ballX = canvas.width / 2;
      ballY = canvas.height / 2;
      ballSpeedX = -ballSpeedX;
      score = 0;
    }
  
    document.addEventListener('keydown', function (event) {
      switch (event.code) {
        case 'ArrowUp':
          if (paddle2Y > 0) {
            paddle2Y -= paddleSpeed;
          }
          break;
        case 'ArrowDown':
          if (paddle2Y < canvas.height - paddleHeight) {
            paddle2Y += paddleSpeed;
          }
          break;
        case 'KeyW':
          if (paddle1Y > 0) {
            paddle1Y -= paddleSpeed;
          }
          break;
        case 'KeyS':
          if (paddle1Y < canvas.height - paddleHeight) {
            paddle1Y += paddleSpeed;
          }
          break;
      }
    });
  
    update();
  });
  