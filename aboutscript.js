
setInterval(function () {
    var data = localStorage.getItem('num');
    document.getElementById("number").innerHTML = data;
}, 100);