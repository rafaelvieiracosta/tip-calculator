let valorFatura;
let valorPessoas;
let porcentagemGorjeta;

function validaInputFatura() {
  const inputFatura = document.querySelector("#fatura");

  function verificaInput() {
    console.log(this.value);
    if (`${this.value}`.endsWith(".")) {
      this.classList.add("erro");
    }
  }

  inputFatura.addEventListener("keyup", verificaInput);
}
validaInputFatura();

function validaInputPessoas() {
  const inputPessoas = document.querySelector("#pessoas");

  inputPessoas.addEventListener("keyup", () => {
    valorPessoas = inputPessoas.value;
  });
}
validaInputPessoas();

function initPorcentagemGorjeta_ParteDoMeio() {
  const inputGorjeta = document.querySelector("#personalizar");
  const botoes = document.querySelectorAll(".gorjeta > button");

  function aplicaClassAosBotoes() {
    botoes.forEach((botao) => botao.classList.remove("active"));
    this.classList.add("active");
    porcentagemGorjeta = +this.innerText.replace("%", "");

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
  });

  inputGorjeta.addEventListener("click", () => {
    botoes.forEach((botao) => {
      botao.classList.remove("active");
    });
  });
}
initPorcentagemGorjeta_ParteDoMeio();
