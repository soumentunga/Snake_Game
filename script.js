
document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const scoreDisplay = document.getElementById('score');
    const statusDisplay = document.getElementById('status');
    const pauseButton = document.getElementById('pauseButton');
    let snake = [{ row: 0, col: 0 }];
    let direction = 'right';
    let food = generateFood();
    let score = 0;
    let isPaused = false;
  
    function generateFood() {
      const row = Math.floor(Math.random() * 20);
      const col = Math.floor(Math.random() * 20);
      return { row, col };
    }
  
    function draw() {
      board.innerHTML = '';
      for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 20; col++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          if (snake.some(s => s.row === row && s.col === col)) {
            cell.classList.add('snake');
          } else if (food.row === row && food.col === col) {
            cell.classList.add('food');
          }
          board.appendChild(cell);
        }
      }
      scoreDisplay.textContent = `Score: ${score}`;
      statusDisplay.textContent = isPaused ? 'Game Paused' : 'Game Running';
    }
  
    function move() {
      if (isPaused) {
        return;
      }
  
      const head = { ...snake[0] };
  
      switch (direction) {
        case 'up':
          head.row--;
          break;
        case 'down':
          head.row++;
          break;
        case 'left':
          head.col--;
          break;
        case 'right':
          head.col++;
          break;
      }
  
      snake.unshift(head);
  
      if (head.row === food.row && head.col === food.col) {
        food = generateFood();
        score++;
      } else {
        snake.pop();
      }
  
      checkCollision();
    }
  
    function checkCollision() {
      const head = snake[0];
  
      // Check collision with walls
      if (head.row < 0 || head.row >= 20 || head.col < 0 || head.col >= 20) {
        gameOver();
      }
  
      // Check collision with itself
      if (snake.slice(1).some(s => s.row === head.row && s.col === head.col)) {
        gameOver();
      }
    }
  
    function gameOver() {
      alert(`Game Over! Your score is ${score}`);
  
      // Restart the game
      snake = [{ row: 0, col: 0 }];
      direction = 'right';
      food = generateFood();
      score = 0;
      isPaused = false;
    }
  
    function handleKeyPress(event) {
      if (event.key === 'p' || event.key === 'P') {
        isPaused = !isPaused;
      } else if (!isPaused) {
        switch (event.key) {
          case 'ArrowUp':
            direction = 'up';
            break;
          case 'ArrowDown':
            direction = 'down';
            break;
          case 'ArrowLeft':
            direction = 'left';
            break;
          case 'ArrowRight':
            direction = 'right';
            break;
        }
      }
    }
  
    function togglePause() {
      isPaused = !isPaused;
    }
  
    document.addEventListener('keydown', handleKeyPress);
    pauseButton.addEventListener('click', togglePause);
  
    setInterval(() => {
      move();
      draw();
    }, 200);
  });
  