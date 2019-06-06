function run(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET','/assignedwork');
    xhr.send();
    xhr.onload = function(){
        if(xhr.readyState == 4 && xhr.status == 200)
        {
            createview(JSON.parse(xhr.responseText));
        }
    }
}


    function createview(arrofcomplaints)
{
    deleteview();
    let tbody = document.createElement('tbody');
    tbody.setAttribute("id","populate");
    let k = 0;
    for(var i = 0 ; i < arrofcomplaints.length;i++)
    {
        if(arrofcomplaints[i].status == 0)
        {
            let tr = document.createElement('tr');
            let num = document.createElement('td');
            num.textContent = k+1;
            k++;
            tr.appendChild(num);
            let assignedto = document.createElement('td');
            assignedto.textContent = arrofcomplaints[i].assignedto.slice(0,arrofcomplaints[i].assignedto.indexOf('@'));
            tr.appendChild(assignedto);
            let customername = document.createElement('td');
            customername.textContent = arrofcomplaints[i].customername;
            tr.appendChild(customername);
            let phone = document.createElement('td');
            phone.textContent = arrofcomplaints[i].phone;
            tr.appendChild(phone);
            let complaint = document.createElement('td');
            complaint.textContent = arrofcomplaints[i].customercomplaint;
            tr.appendChild(complaint);
            let status = document.createElement('td');
            let btn = document.createElement('button');
            btn.innerHTML = '<i class="fas fa-thumbs-up"></i>'
            btn.className = arrofcomplaints[i]._id;
            btn.addEventListener("click",function(){
                let xhr = new XMLHttpRequest();
                xhr.open('GET','/workdone?id='+this.className);
                xhr.send();
                xhr.onload = function(){
                    if(xhr.readyState == 4 && xhr.status == 200){
                        window.location.href = '/report';
                    }
                }
                window.location.href = '/report';
            })
            status.appendChild(btn);
            tr.appendChild(status);
            tbody.appendChild(tr);
        }
    }
    document.getElementById('maintable').appendChild(tbody);
}

    function deleteview(){
    try{
      var main = document.getElementById("populate");
      main.parentNode.removeChild(main);
    }
    catch(e)
    {
      return ;
    }
}
