document.getElementById('newuser').onclick = function(){
    console.log('btn clicked');
 let name = document.getElementById('newname').value;
 let email = document.getElementById('newemail').value;
 let password = document.getElementById('newpassword').value;
 let phone = document.getElementById('newphone').value;
 let role = 1;
   if(name == "" || email == "" || password == "" || phone == "")
   {
     alert('please fill all the fileds');
   }
   else
   {
     let xhr = new XMLHttpRequest();
     xhr.onload = function(){
       if(xhr.readyState == 4 && xhr.status == 200)
       {
         alert('Employee added successfully');
         window.location.href = "/adduser";
       }
       else
       {
         alert('user with simmilar email id exist');
         window.location.href = "/adduser";
       }
     }
     xhr.open('POST','/adduser');
     xhr.setRequestHeader("content-type","application/json");
     xhr.send(JSON.stringify({
       user:name,
       phoneno:phone,
       username:email,
       password,
       role:role
     }))
   }
 }
