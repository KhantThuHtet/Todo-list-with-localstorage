let overlayTag = document.getElementsByClassName("overlay")[0];
let textBoxTag = document.getElementsByClassName("text-box")[0];
let addBtn = document.getElementsByClassName("add-btn")[0];

addBtn.addEventListener('click', ()=>{
    showOverLayTag();
    showTextBox();
    let cancelBtn = document.getElementById("cancel-btn");
    cancelBtn.addEventListener('click', ()=> closeTextBox());
});

function showOverLayTag(){
    overlayTag.style.display = "block";
    setTimeout(() => {
      overlayTag.style.opacity = "0.9";
    }, 100);
}

function showTextBox(){
    textBoxTag.style.display = "block";
    
}

function closeTextBox(){
    overlayTag.style.opacity = '0';
    setTimeout(() => {
        overlayTag.style.display = "none";
    }, 100);
    if (textBoxTag.classList.contains("animate__flipInX")) {
      textBoxTag.classList.add("animate__flipOutX");
    }
    setTimeout(() => {
        textBoxTag.classList.remove("animate__flipOutX");
        textBoxTag.style.display = "none";
    }, 500);
}