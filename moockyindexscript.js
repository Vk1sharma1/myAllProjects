function submit() {
    allNames = [];
    var names = document.getElementById("names").value;
    allNames.push(names);
    localStorage.setItem("names", names)
    document.getElementById("namesList").innerHTML = allNames
}


function myfunction(x) {
    x.classList.toggle("change");

}


setInterval(function () {
    var data = localStorage.getItem('num');
    document.getElementById("number").innerHTML = data;
}, 100);


