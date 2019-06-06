document.getElementById('searchbtn').onclick = function(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET','/searchbyname/'+document.getElementById('searchbox').value);
    xhr.send();
    xhr.onload = function(){
      if(xhr.readyState == 4 && xhr.status == 200)
      {
        createview(JSON.parse(xhr.responseText));
      }
    }
  }
  let type = document.getElementById('typeofcomplaint');
  var run = function(){
      let xhr = new XMLHttpRequest();
      xhr.open('GET','/getcomplaints/'+type.value);
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
      for(var i = 0 ; i < arrofcomplaints.length;i++)
      {
          let tr = document.createElement('tr');
          
          let num = document.createElement('td');
          num.textContent = i+1;
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
          if(arrofcomplaints[i].status == 1)
          status.innerHTML = "<b style='color:green;font-weight:1000'>Completed</b>";
          else
          status.innerHTML = "<b style='color:red;font-weight:1000'>PENDING</b>";
          tr.appendChild(status);
          tbody.appendChild(tr);
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
    document.getElementById('typeofcomplaint').onchange = function(){
    let xhr = new XMLHttpRequest();
      xhr.open('GET','/getcomplaints/'+type.value);
      xhr.send();

      xhr.onload = function(){
          if(xhr.readyState == 4 && xhr.status == 200)
          {
            createview(JSON.parse(xhr.responseText));
          }
      }
  }