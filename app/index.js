const { ipcRenderer } = require('electron')
const btnBuscarImpressoras = document.getElementById("buscar-impressoras");

const alertOnlineStatus = () => {
  window.alert(navigator.onLine ? 'online' : 'offline')
}

window.addEventListener('online',  alertOnlineStatus)
window.addEventListener('offline',  alertOnlineStatus)

alertOnlineStatus()

btnBuscarImpressoras.addEventListener("click", function() {
  let result = ipcRenderer.sendSync("buscar-impressoras", "Buscar todas as impressoras instaladas em meu notebook.")
  console.log(result)
})