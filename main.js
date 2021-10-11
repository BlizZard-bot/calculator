const time=document.querySelector(".time")
const date=new Date();
time.textContent=`${date.getHours()}:${date.getMinutes()}`;
const main=document.querySelector(".main")
const audio=document.querySelector("audio")
main.addEventListener("click",(e)=>{
    if(e.target.classList.contains("btn")){
        audio.play();
    }
})
