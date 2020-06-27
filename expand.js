function expand(list_id) {
    var list = document.getElementById(list_id);
    var show = list.getElementsByClassName("hide");
    console.log(show);
    console.log(show.length);
    for(var i = 0; i < show.length; i++) {
        console.log(i);
        show[i].classList.remove("hide");
    }
}