const { default: axios } = require('axios');

module.exports = function(server){

    var io = require("socket.io")(server)

    io.on('connection', (socket)=>{
        console.log('user connected')
    
        socket.on('disconnect', ()=>{
            console.log('user disconnected')
        })

        socket.on('player choosing', async (value)=>{
            try {
               await axios.patch('http://localhost:5000/edit-choice', value)
               const updateRoom = await axios.get('http://localhost:5000/roomsapi/'+value.data._id)

               const player1 = updateRoom.data.gameRoom.hostChoice
               const player2 = updateRoom.data.gameRoom.challengerChoice

               let result
                if(!player1 || !player2){
                    result = 'winner not determined'
                }else if(player1 === 'rock' && player2 === 'rock' || player1 === 'paper' && player2 === 'paper' || player1 === 'scissor' && player2 === 'scissor'){
                    result = 'draw'
                }else if(player1 === 'rock' && player2 === 'scissor' || player1 === 'paper' && player2 === 'rock' || player1 === 'scissor' && player2 === 'paper'){
                    result = 'host win'
                }else{
                    result = 'challenger win'
                }
                updateRoom.data.gameRoom.result = result
                
               io.emit('choosed', updateRoom.data.gameRoom)
            } catch (error) {
                console.log(error)
            }

        })
    })
    
    return io;
};