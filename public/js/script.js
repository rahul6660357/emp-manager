const username = document.getElementById('username');
const password = document.getElementById('password');
const loginbtn = document.getElementById('login');

loginbtn.addEventListener("click",()=>{
    if(username.value === '')
    {
        alert('please enter email');
    }
    else if(password.value === '')
    {
        alert('please enter password');
    }
    else
    {
        let xhr = new XMLHttpRequest();
        xhr.onload=function() {
            if (this.readyState == 4) {
                if(this.status == 200)
                window.location.href = '/adminpanel'
                if(this.status == 202)
                window.location.href = '/emppanel'
            }
            else{
                alert('incorrect details');
                password.value = "";
                username.value = "";
            }
          };
        xhr.open('POST','/check');
        xhr.setRequestHeader("content-type","application/json");
        xhr.send(JSON.stringify({
            "username":username.value,
            "password":password.value
        }));
    }
})
