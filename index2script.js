

    


    var b = localStorage.getItem("num");
    var a = parseInt(b);
    document.getElementById("number").innerHTML = a;
    document.getElementById("number2").innerHTML = a;
  

function counter(button) {
        
    if (button == plus) {
        a += 1;

    } else if (button == minus) {
        if (a <= 0) {
            a = a;
        } else {
            a = a - 1;
        }


    } else if (button == reset) {
        a = 0;
    }
    document.getElementById("number").innerHTML = a;
    document.getElementById("number2").innerHTML = a;
    localStorage.setItem('num', a);
    
}

