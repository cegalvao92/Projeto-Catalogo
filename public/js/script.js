const closeMessage = document.querySelector("#close");
const mensagem = document.querySelector("#message");

closeMessage.addEventListener("click", function (){
    mensagem.style.display = "none"
});
setTimeout(() => {
    mensagem.style.display = "none"
}, 5000);
