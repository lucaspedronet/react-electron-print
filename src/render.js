const { ipcRenderer } = require("electron");

const btnListPrint = document.getElementById("buscar-impressoras");

btnListPrint.addEventListener("click", () => {
  ipcRenderer.on("get-print");
  console.log("teste");
});
