//Componentes
const inputFatura = document.querySelector("#fatura");
const botoes = document.querySelectorAll(".gorjeta > button");
const inputGorjeta = document.querySelector("#personalizar");
const inputPessoas = document.querySelector("#pessoas");
const gorjeta = document.querySelector(".tip > span");
const total = document.querySelector(".total > span");
const buttonReset = document.querySelector(".baixo > button");

//Variáveis
let valorFatura;
let valorPessoas;
let porcentagemGorjeta;

//Validações
function initValidaInputFatura_ParteDeCima() {

  function verificaInput() {
    if(+this.value === 0){
      inputFatura.parentElement.classList.add('erro')
    } else {
      inputFatura.parentElement.classList.remove('erro')
      if (this.value.length > 7) {
        this.value = this.value.slice(0, -1);
      }
      valorFatura = this.value;
      calcula();
    }
  }

  inputFatura.addEventListener("keyup", verificaInput);
}
initValidaInputFatura_ParteDeCima();
function initPorcentagemGorjeta_ParteDoMeio() {

  function aplicaClassAosBotoes() {
    botoes.forEach((botao) => botao.classList.remove("active"));
    this.classList.add("active");
    porcentagemGorjeta = +this.innerText.replace("%", "");
    calcula();

    inputGorjeta.value = "";
    inputGorjeta.classList.remove("active");
    inputGorjeta.type = "number";
  }

  botoes.forEach((botao) => {
    botao.addEventListener("click", aplicaClassAosBotoes);
  });

  inputGorjeta.addEventListener("blur", () => {
    if (inputGorjeta.value !== "") {
      inputGorjeta.classList.add("active");
      inputGorjeta.type = "text";
      inputGorjeta.value = `${inputGorjeta.value}%`;
    } else {
      inputGorjeta.classList.remove("active");
      inputGorjeta.type = "number";
    }
  });

  inputGorjeta.addEventListener("keyup", () => {
    if(inputGorjeta.value > 100){
      inputGorjeta.value = 100
    }
    porcentagemGorjeta = +inputGorjeta.value;
    calcula();
  });

  inputGorjeta.addEventListener("click", () => {
    botoes.forEach((botao) => {
      botao.classList.remove("active");
    });
  });
}
initPorcentagemGorjeta_ParteDoMeio();
function initValidaInputPessoas_ParteDeBaixo() {

  function verificaInputP() {
    if(+this.value === 0){
      inputPessoas.parentElement.classList.add('erro')
    } else {
      inputPessoas.parentElement.classList.remove('erro')
      if (this.value.length > 7) {
        this.value = this.value.slice(0, this.maxLength);
      }
      valorPessoas = this.value;
      calcula();
    }
  }

  inputPessoas.addEventListener("keyup", verificaInputP);
}
initValidaInputPessoas_ParteDeBaixo();

//Funções
function initButtonResetar() {
  function reseta() {
    inputPessoas.value = "";
    inputFatura.value = "";
    inputGorjeta.value = "";
    inputGorjeta.classList.remove("active");
    inputGorjeta.type = "number";
    botoes.forEach((botao) => botao.classList.remove("active"));
    buttonReset.setAttribute("disabled", "");
    gorjeta.innerHTML = `R$ 0,00`;
    total.innerHTML = `R$ 0,00`;
    valorFatura = 0;
    valorPessoas = 0;
    porcentagemGorjeta = 0;
  }

  buttonReset.addEventListener("click", reseta);
}
initButtonResetar()

function calcula() {
  if (valorFatura && valorPessoas && porcentagemGorjeta) {
    let valorFinalGorjeta = (valorFatura * (porcentagemGorjeta / 100)) / valorPessoas;
    let valorFinalTotal = valorFatura / valorPessoas + valorFinalGorjeta;

    gorjeta.innerHTML = `R$${valorFinalGorjeta.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    total.innerHTML = `R$${valorFinalTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;-

    buttonReset.removeAttribute("disabled");
  }
}
