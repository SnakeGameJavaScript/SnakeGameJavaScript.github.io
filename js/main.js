


//Coje el form de los nivels    
      let levels = document.getElementById("levels");
        console.log(levels);
    //Coje los niveles    
      let level = document.getElementById("level");
        console.log(level);
    //Spam del form nivles    
      let highScore = document.querySelector(".highScore");
        console.log(highScore);

        
      highScore.innerHTML = JSON.parse(localStorage.getItem("snakeHighScore"));
        
       console.log(localStorage);
        
      levels.addEventListener("submit", () => {
        localStorage.setItem("snakeLevel", JSON.stringify(level.value));
          console.log(level.value);
      });

      let table =
        `
      <table>
        <thead>
          <tr>
            <td>Level</td>
            <td>High Score</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Easy</td>
              <td class='easyHighScore'>` +
        localStorage.getItem("snakeHighScore150") +
        `</td>
              </tr>
            <tr>
              <td>Medium</td>
              <td class='mediumHighScore'>` +
        localStorage.getItem("snakeHighScore100") +
        `</td>
              </tr>
            <tr>
              <td>Hard</td>
              <td class='hardHighScore'>` +
        localStorage.getItem("snakeHighScore70") +
        `</td>
              </tr>
            </tbody>
        </table>
      `;
        
      <!---->   
      <!--Div para agregar la tabla de records--> 
      let scoresDiv = document.querySelector(".scores");
      scoresDiv.innerHTML = table;

      let easyHighScore = document.querySelector(".easyHighScore");
        
      let mediumHighScore = document.querySelector(".mediumHighScore");
        
      let hardHighScore = document.querySelector(".hardHighScore");

      function resetHighScore() {
        highScore.innerHTML = 0;
        easyHighScore.innerText = 0;
        mediumHighScore.innerText = 0;
        hardHighScore.innerText = 0;
          
        localStorage.setItem("snakeHighScore", JSON.stringify(0));
          
        localStorage.setItem("snakeHighScore150", JSON.stringify(0));
          
        localStorage.setItem("snakeHighScore100", JSON.stringify(0));
          
        localStorage.setItem("snakeHighScore70", JSON.stringify(0));
      }