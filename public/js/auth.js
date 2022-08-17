function login(){
    const username = document.querySelector('#username-input').value
    const password = document.querySelector('#password-input').value

    const data = {
        username,password
    }

    fetch('http://localhost:5000/login', {
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
        body: JSON.stringify(data) // body data type must match "Content-Type" 
    })
    .then((res)=>res.json())
    .then(result=>{
        console.log(result)
        result.redirected?window.location.href = `http://localhost:5000${result.redirected}`:null
    })
    .catch(console.error())
}

function logout(){
    fetch('http://localhost:5000/logout')
    .then((res)=>res.json())
    .then((result)=>{
        result.redirected?window.location.href = `http://localhost:5000${result.redirected}`:null
    })
    .catch(console.error())
}
