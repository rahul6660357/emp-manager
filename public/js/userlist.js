let main = document.getElementById('main');
var assignto ;
function run(){
  let xhr = new XMLHttpRequest();
  xhr.open('GET','/getuserdata');
  xhr.send();
  xhr.onload = function(){
    if(xhr.status == 200 && xhr.readyState == 4)
    {
      createview(JSON.parse(xhr.responseText));
    }
  }
}
function createview(allusers){
  for(let i = 0 ; i < allusers.length ;i++)
  {
    if(allusers[i].role == 1)
    {
      let emp = document.createElement('div');
      emp.setAttribute("id","emp");
      let h2 = document.createElement('h2');
      h2.textContent = allusers[i].name;
      let h22 = document.createElement('h2');
      h22.textContent = allusers[i].phone;
      let btn = document.createElement('button');
      btn.setAttribute('class',allusers[i].email);
      btn.textContent = "Assign The work";
      btn.setAttribute('class',allusers[i].email);
      btn.setAttribute('data-toggle','modal');
      btn.setAttribute('data-target','#myModal');
      btn.onclick = function(){
        assignto = allusers[i].email;
        console.log(assignto);
      }
      emp.appendChild(h2);
      emp.appendChild(h22);
      emp.appendChild(btn);
      main.appendChild(emp);
    }
  }
}
var cname = document.getElementById('cname');
var cphone = document.getElementById('cphone');
var ccomplaint = document.getElementById('ccomplaint');
var caddress = document.getElementById('caddress');
function submitcomplaint(){
  if(cname.value == "" || cphone.value == "" || ccomplaint.value == "" || caddress.value == "")
  {
    alert('please enter all details');
    return ;
  }
  let xhr1 = new XMLHttpRequest();
  xhr1.open('POST','/submitcomplaint');
  xhr1.setRequestHeader('content-type','application/json');
  xhr1.send(JSON.stringify({
    assignedto:assignto,
    customername:cname.value,
    customerphone:cphone.value,
    customercomplaint:ccomplaint.value,
    customeraddress:caddress.value,
    complaintstatus:0,
  }))

  xhr1.onload = function(){
    if(xhr1.readyState == 4 && xhr1.status == 200)
    {
      cname.value = "";
      cphone.value = "";
      ccomplaint.value = "";
      caddress.value = "";
      document.getElementById("closebtn").click();
    }
  }
}