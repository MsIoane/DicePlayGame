var btnNew = document.querySelector('.btn-new');
var btnRoll = document.querySelector('.btn-roll');
var btnHold = document.querySelector('.btn-hold');
var finalScore = document.querySelector('.final-score');
var dice = document.querySelector('.dice');

var scores, currentScore,activePlayer,gameStatus,activePlayerPanel;

var init = function(){
   scores = [0,0];
   currentScore = 0;
   activePlayer = 0;
   gameStatus = false;
   activePlayerPanel = document.querySelector('.player-0-panel');
  
    document.querySelector('.player-0-panel .player-score').textContent = '0';
    document.querySelector('.player-0-panel .player-current-score').textContent = '0';
    document.querySelector('.player-1-panel .player-score').textContent = '0';
    document.querySelector('.player-1-panel .player-current-score').textContent = '0';
    document.querySelector('.player-0-panel .player-name').textContent = 'player 1';
    document.querySelector('.player-1-panel .player-name').textContent = 'player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.dice').style.display = 'block';
}

var next = function(){
    currentScore = 0;
    activePlayerPanel.querySelector('.player-current-score').textContent = 0;
    activePlayerPanel.classList.remove('active');
    activePlayer = activePlayer == 0 ? 1 : 0;  
    activePlayerPanel =  document.querySelector('.player-'+ activePlayer +'-panel');
    activePlayerPanel.classList.add('active');
}

var roll = function(){
    if (finalScore.value) {
        var randomNumber = Math.floor(Math.random() * 6) + 1; // ეს საბოლოო ჯამში მიგენერირებს 1 დან 6 მდე შემთხვევითღ რიცხვს.
        dice.src = 'img/'+ randomNumber  + '.png';
        currentScore += randomNumber;
        gameStatus = true;
    
        if (randomNumber !==1) {
            activePlayerPanel.querySelector('.player-current-score').textContent = currentScore;
            console.log(currentScore);
        } else {
            //next player
            next();
        }  
     }else{ 
        alert('Plese enter score ');
        finalScore.focus();
        finalScore.placeholder = ' please intert score ';
    }
}

var hold = function(){
    if (gameStatus) {
      scores[activePlayer] += currentScore;
      activePlayerPanel.querySelector('.player-score').textContent = scores[activePlayer];
 
     if (scores[activePlayer] >= +finalScore.value) {
         // winner
         activePlayerPanel.classList.remove('active');
         activePlayerPanel.classList.add('winner');
         activePlayerPanel.querySelector('.player-name').textContent = 'Winner!!!';
         dice.style.display = 'none';
         gameStatus = false;
         btnRoll.style.display = 'none';
         finalScore.value = ' ';
         finalScore.placeholder = 'winner Score';
        } else {
         next();
        }  
     }
 }

init();
btnRoll.addEventListener('click', roll);
btnHold.addEventListener('click', hold);
btnNew.addEventListener('click',function(){
    //alert('Please refresh page');
   init();
   alert('Plese enter score ');
   finalScore.focus();
   finalScore.placeholder = ' please intert score ';
});




