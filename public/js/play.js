const rockPlayer = document.querySelector(".rock-player")
const paperPlayer = document.querySelector(".paper-player")
const scissorsPlayer = document.querySelector(".scissors-player")

const rockComputer = document.querySelector(".rock-computer")
const paperComputer = document.querySelector(".paper-computer")
const scissorsComputer = document.querySelector(".scissors-computer")

const refreshButton = document.querySelector("#refresh-button")
const versusText = document.querySelector('.versus-text')
const winnerBox = document.querySelector('.win-box')
const clicked = "#C4C4C4"

let playerChoice = ''
let comChoice = ''

class RockPaperScissors{
    static computerRandomChoice(){
        let randomNumber = Math.floor(Math.random()*3)+1
        switch(randomNumber){
            case 1:
                comChoice = rockComputer
                return rockComputer.style["background-color"] = clicked
            case 2:
                comChoice = paperComputer
                return paperComputer.style["background-color"] = clicked
            case 3:
                comChoice = scissorsComputer
                return scissorsComputer.style["background-color"] = clicked
        }
    }
    
    static resetGame(){
        if(playerChoice && comChoice){
            playerChoice.style["background-color"] = '#9B835F'
            comChoice.style["background-color"] = '#9B835F'
            playerChoice = ''
            comChoice = ''
            versusText.style.display = 'inline'
            winnerBox.style.display = 'none'
            winnerBox.style['background-color'] = '#4C9653'
        }
    }
    
    static winnerDecider(player, computer){
        const playerValue = player.getAttribute('value')
        const comValue = computer.getAttribute('value')
        let result = ''

        console.log(playerValue)
        
        if(playerValue === 'rock' && comValue === 'rock' || playerValue === 'paper' && comValue === 'paper' || playerValue === 'scissors' && comValue === 'scissors'){
            result = 'draw'
            winnerBox.innerHTML = 'DRAW'
            winnerBox.style['background-color'] = '#035B0C'
        }else if(playerValue === 'rock' && comValue === 'scissors' || playerValue === 'paper' && comValue === 'rock' || playerValue === 'scissors' && comValue === 'paper'){
            result = 'win'
            winnerBox.innerHTML = 'PLAYER 1 <br> WIN'
        }else{
            result = 'lose'
            winnerBox.innerHTML = 'COM <br> WIN'
        }

        console.log({choice:playerValue, result})

        fetch('http://localhost:5000/postresult', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({choice:playerValue, result}) // body data type must match "Content-Type" header
          })
          .then((res)=>res.json())
          .then(result=>{console.log('berhasil post', result)})
          .catch(console.error())

        this.hideVersusText()
        this.showWinnerBox()
    }
    
    static hideVersusText(){
        versusText.style.display = 'none'
    }
    
    static showWinnerBox(){
        winnerBox.style.display = 'inline'
    }   
}

rockPlayer.addEventListener('click', ()=>{
    RockPaperScissors.resetGame()
    playerChoice = rockPlayer
    rockPlayer.style["background-color"] = clicked
    RockPaperScissors.computerRandomChoice()
    RockPaperScissors.winnerDecider(playerChoice, comChoice)
    RockPaperScissors.hideVersusText()
 })

paperPlayer.addEventListener('click', ()=>{
    RockPaperScissors.resetGame()
    playerChoice = paperPlayer
    paperPlayer.style["background-color"] = clicked
    RockPaperScissors.computerRandomChoice()
    RockPaperScissors.winnerDecider(playerChoice, comChoice)
    RockPaperScissors.hideVersusText()
 })
 
 scissorsPlayer.addEventListener('click', ()=>{
    RockPaperScissors.resetGame()
    playerChoice = scissorsPlayer
    scissorsPlayer.style["background-color"] = clicked
    RockPaperScissors.computerRandomChoice()
    RockPaperScissors.winnerDecider(playerChoice, comChoice)
    RockPaperScissors.hideVersusText()
  })

 refreshButton.addEventListener('click', ()=>{
    RockPaperScissors.resetGame()
 })