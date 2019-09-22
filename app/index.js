const { ipcRenderer } = require('electron')
const btnBuscarImpressoras = document.getElementById("buscar-impressoras");


btnBuscarImpressoras.addEventListener("click", function() {
  let result = ipcRenderer.sendSync("buscar-impressoras", "Buscar todas as impressoras instaladas em meu notebook.")
  console.log(result)
})