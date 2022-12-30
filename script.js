var cal = {
  
  months : [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ],
  days : ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],



 
 first : () => {
    
    cal.month = document.getElementById("allMonth");
    cal.year = document.getElementById("Year");
    // cal.input=document.getElementById("inp")
    // input.appendChild(year)
    cal.close = document.getElementById("calWrap");
    cal.hFormWrap = document.getElementById("calForm");
    cal.hForm = cal.hFormWrap.querySelector("form");
    
    let now = new Date(), nowMth = now.getMonth();
    cal.year.value = parseInt(now.getFullYear());

    for (let i=0; i<12; i++)
     {
      let opt = document.createElement("option");
      opt.value = i;
      opt.innerHTML = cal.months[i];
      opt.innerHTML = cal.months[i];
      if (i==nowMth) 
      { 
        opt.selected = true;
       }
      cal.month.appendChild(opt);
     
    }

    
    cal.month.onchange = cal.second;
    cal.year.onchange = cal.second;
   
    if (cal.begindays) { 
      cal.days.push(cal.days.shift());
     }
    cal.second();
  },

  
  second : () => {
   
    cal.sMth = parseInt(cal.month.value); 
    cal.sYear = parseInt(cal.year.value); 
    let daysInMth = new Date(cal.sYear, cal.sMth+1, 0).getDate(), 
        numbers = new Date(cal.sYear, cal.sMth, 1).getDay(), 
        endDay = new Date(cal.sYear, cal.sMth, daysInMth).getDay(), 
        now = new Date(), 
        nowMth = now.getMonth(), 
        nowYear = parseInt(now.getFullYear()), 
        nowDay = cal.sMth==nowMth && cal.sYear==nowYear ? now.getDate() : null ;

   
    cal.data = localStorage.getItem("cal-" + cal.sMth + "-" + cal.sYear);
    if (cal.data==null)
     {
      localStorage.setItem("cal-" + cal.sMth + "-" + cal.sYear, "{}");
      cal.data = {};
    } else { cal.data = JSON.parse(cal.data); }

    
    let shapes = [];
    if (cal.begindays && numbers != 1) {
      let nums = numbers==0 ? 7 : numbers ;
      for (let i=1; i<nums; i++) { shapes.push("b"); }
    }
    if (!cal.begindays && numbers != 0) {
      for (let i=0; i<numbers; i++) { shapes.push("b"); }
    }

    for (let i=1; i<=daysInMth; i++) 
    { 
      shapes.push(i);
     }

    
    if (cal.begindays && endDay != 0) 
    {
      let nums = endDay==6 ? 1 : 7-endDay;
      for (let i=0; i<nums; i++) { shapes.push("b"); }
    }
    if (!cal.begindays && endDay != 6) {
      let nums = endDay==0 ? 6 : 6-endDay;
      for (let i=0; i<nums; i++) { shapes.push("b"); }
    }

    
    cal.close.innerHTML = `<div class="calHead"></div>
    <div class="calBody">
      <div class="calRow"></div>
    </div>`;

    
    wrap = cal.close.querySelector(".calHead");
    for (let d of cal.days)
     {
      let cell = document.createElement("div");
      cell.className = "calCell";
      cell.innerHTML = d;
      wrap.append(cell);
     
     }
    

    
    wrap = cal.close.querySelector(".calBody");
    row = cal.close.querySelector(".calRow");
    for (let i=0; i<shapes.length; i++) 
    {
     
      let cell = document.createElement("div");
      cell.className = "calCell";
      if (nowDay==shapes[i])
       { 
        cell.classList.add("calToday");
      
      }
      if (shapes[i]=="b") 
      { 
        cell.classList.add("calBlank"); 
      }
      else {
        cell.innerHTML = `<div class="cellDate">${shapes[i]}</div>`;
        if (cal.data[shapes[i]]) {
          cell.innerHTML += "<div class='evt'>" + cal.data[shapes[i]] + "</div>";
        }
        cell.onclick = () => { cal.show(cell); };
      }
      row.appendChild(cell);

      
      if (i!=(shapes.length-1) && i!=0 && (i+1)%7==0) {
        row = document.createElement("div");
        row.className = "calRow";
        wrap.appendChild(row);
      }
    }
  },

 
  
}

function myChangeFunction(input1) {
  var input2 = document.getElementById('Year');
  input2.value = input1.value
  // let now = new Date(), nowMth = now.getMonth();
  // cal.year.value = parseInt(now.getFullYear())


  // let now = new Date(), input1 = now.getMonth();
  // cal.year.value = parseInt(now.getFullYear());
}
window.onload = cal.first;
