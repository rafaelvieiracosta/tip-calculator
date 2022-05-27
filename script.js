let valorFatura;
let valorPessoas;
let porcentagemGorjeta;

function calcula() {
  if (valorFatura && valorPessoas && porcentagemGorjeta) {
    const gorjeta = document.querySelector(".gorjeta > span");
    const total = document.querySelector(".total > span");

    let valorFinalGorjeta =
      (valorFatura * (porcentagemGorjeta / 100)) / valorPessoas;
    let valorFinalTotal = valorFatura / valorPessoas + valorFinalGorjeta;

    gorjeta.innerHTML = valorFinalGorjeta.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    total.innerHTML = valorFinalTotal.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }
}

function validaInputFatura() {
  const inputFatura = document.querySelector("#fatura");

  function verificaInput() {
    valorFatura = this.value;
    calcula();
  }

  inputFatura.addEventListener("keyup", verificaInput);
}
validaInputFatura();

function validaInputPessoas() {
  const inputPessoas = document.querySelector("#pessoas");

  function verificaInputP() {
    valorPessoas = this.value;
    calcula();
  }

  inputPessoas.addEventListener("keyup", verificaInputP);
}
validaInputPessoas();

function initPorcentagemGorjeta_ParteDoMeio() {
  const inputGorjeta = document.querySelector("#personalizar");
  const botoes = document.querySelectorAll(".gorjeta > button");

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