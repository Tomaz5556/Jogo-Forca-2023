let jogarNovamente = true;
let tentativas = 6;
let listaDinamica = [];
let palavraSecretaCategoria;
let palavraSecretaSorteada;
let palavras = [];
let jogoAutomatico = true;

carregaListaAutomatica();

criarPalavraSecreta();
function criarPalavraSecreta() {
    const indexPalavra = parseInt(Math.random() * palavras.length);
    palavraSecretaSorteada = palavras[indexPalavra].nome;
    palavraSecretaCategoria = palavras[indexPalavra].categoria;
    console.log(palavraSecretaSorteada);
}

montarPalavraNaTela();
function montarPalavraNaTela() {
    const categoria = document.getElementById("categoria");
    categoria.innerHTML = palavraSecretaCategoria;
    const palavraTela = document.getElementById("palavra-secreta");
    palavraTela.innerHTML = "";
    const tentativasrestantes = document.getElementById("tentativas-restantes");
    tentativasrestantes.innerHTML = "Número de tentativas restantes: " + tentativas;
    for (i = 0; i < palavraSecretaSorteada.length; i++) {
        if (listaDinamica[i] === undefined) {
            if (palavraSecretaSorteada[i] === " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>";
            } else {
                listaDinamica[i] = "&nbsp;";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>";
            }
        } else {
            if (palavraSecretaSorteada[i] === " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>";
            } else {
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>";
            }
        }
    }
}

function verificaLetraEscolhida(letra) {
    document.getElementById("tecla-" + letra).disabled = true;
    if (tentativas > 0)
    {
        mudarStyleLetra("tecla-" + letra, false);
        comparalistas(letra);
        montarPalavraNaTela();
    }
}

function mudarStyleLetra(tecla, condicao) {
    if (condicao === false)
    {
        document.getElementById(tecla).style.background = "#ff0000";
        document.getElementById(tecla).style.color = "#ffffff";
    } else {
        document.getElementById(tecla).style.background = "#008000";
        document.getElementById(tecla).style.color = "#ffffff";
    }
}

function comparalistas(letra) {
    const pos = palavraSecretaSorteada.indexOf(letra);
    if (pos < 0) {
        tentativas--;
        carregaImagemForca();

        if (tentativas === 0) {
            var str = palavraSecretaSorteada;
            abreModal("VOCÊ PERDEU!", "Você foi enforcado! ... A palavra secreta era <br>" + str.bold());
        }
    } else {
        mudarStyleLetra("tecla-" + letra, true);
        for (i = 0; i < palavraSecretaSorteada.length; i++) {
            if (palavraSecretaSorteada[i] === letra) {
                listaDinamica[i] = letra;
            }
        }
    }

    let vitoria = true;
    for (i = 0; i < palavraSecretaSorteada.length; i++) {
        if (palavraSecretaSorteada[i] !== listaDinamica[i]) {
            vitoria = false;
        }
    }

    if (vitoria === true)
    {
        abreModal("PARABÉNS!", "Você se salvou!");
        tentativas = 0;
    }
}

function carregaImagemForca() {
    switch (tentativas) {
        case 5:
            document.getElementById("imagem").style.background = "url('./images/forca01.png')";
            break;
        case 4:
            document.getElementById("imagem").style.background = "url('./images/forca02.png')";
            break;
        case 3:
            document.getElementById("imagem").style.background = "url('./images/forca03.png')";
            break;
        case 2:
            document.getElementById("imagem").style.background = "url('./images/forca04.png')";
            break;
        case 1:
            document.getElementById("imagem").style.background = "url('./images/forca05.png')";
            break;
        case 0:
            document.getElementById("imagem").style.background = "url('./images/forca06.png')";
            break;
        default:
            document.getElementById("imagem").style.background = "url('./images/forca.png')";
            break;
    }
}

function abreModal(titulo, mensagem) {
    let modalTitulo = document.getElementById("exampleModalLabel");
    modalTitulo.innerText = titulo;

    let modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = mensagem;

    $('#myModal').modal({
        show: true,
        backdrop: 'static', 
        keyboard: false
    });
}

function listaAutomatica() { // ativa o modo manual
    if (jogoAutomatico === true) {
        document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-play-circle'></i>";
        palavras = [];
        jogoAutomatico = false;
        document.getElementById("abreModalAddPalavra").style.display = "block";
        document.getElementById("status").innerHTML = "Modo Manual";
    } else if (jogoAutomatico === false) { // ativa o modo automático
        document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-pause-circle'></i>";
        jogoAutomatico = true;
        document.getElementById("abreModalAddPalavra").style.display = "none";
        document.getElementById("status").innerHTML = "Modo Automático";
    }
}

const modal = document.getElementById("modal-alerta");
const btnAbreModal = document.getElementById("abreModalAddPalavra");
btnAbreModal.onclick = function () {
    modal.style.display = "center";
};

const btnFechaModal = document.getElementById("fechaModal");
btnFechaModal.onclick = function () {
    modal.style.display = "none";
    document.getElementById("addPalavra").value = "";
    document.getElementById("addCategoria").value = "";
};

window.onclick = function () {
    if (event.target === modal) {
        modal.style.display = "none";
        document.getElementById("addPalavra").value = "";
        document.getElementById("addCategoria").value = "";
    }
};

function carregaListaAutomatica() {
    palavras = [
        palavra001 = {
            nome: "PIZZA",
            categoria: "COMIDA"
        },
        palavra002 = {
            nome: "CERVEJA",
            categoria: "BEBIDA"
        },
        palavra003 = {
            nome: "CHILE",
            categoria: "PAÍS"
        },
        palavra004 = {
            nome: "MICROSOFT",
            categoria: "EMPRESA"
        },
        palavra005 = {
            nome: "SBT",
            categoria: "EMISSORA"
        },
        palavra006 = {
            nome: "RAP",
            categoria: "MÚSICA"
        },
        palavra007 = {
            nome: "IFNMG",
            categoria: "INSTITUTO"
        },
        palavra008 = {
            nome: "RICARDO",
            categoria: "NOME"
        },
        palavra009 = {
            nome: "DIREITA",
            categoria: "IDEOLOGIA"
        },
        palavra010 = {
            nome: "UMBANDA",
            categoria: "RELIGIÃO"
        }
    ];
}

function isNullOrWhiteSpace(input) {
    return !input || !input.trim();
}

function sortear() {
    if (jogoAutomatico === true) {
        location.reload();
    } else {
        if (palavras.length > 0) {
            listaDinamica = [];
            criarPalavraSecreta();
            montarPalavraNaTela();
            resetaTeclas();
            tentativas = 6;
        }
    }
}

function resetaTeclas() {
    let teclas = document.querySelectorAll(".teclas > button");
    teclas.forEach((x) => {
        x.style.background = "#FFFFFF";
        x.style.color = "#FF0000";
        x.disabled = false;
    });
}