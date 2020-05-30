function copyText() {
  /* Get the text field */
    var aux = document.createElement("input");
    aux.setAttribute("value", document.getElementById("storedInput").innerHTML);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
}
