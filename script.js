//Estados que pode ocorrer
const estados = {
    s0: "Computador desligado",
    s1: "Ligado corretamente",
    s2: "Erro de sistema",
    s3: "Sem energia elétrica",
    s4: "Pronto para uso",
    s5: "Reinicialização necessária",
    s6: "Energia restaurada",
    s7: "Falta de bateria"
};

//Transição de cada estado, com ações associadas 
const transicoes = {
    s0: [  // Quando o computador está desligado
        { acao: "Ligar", destino: "s1", prob: 0.7 }, // 70% de chance de ligar corretamente
        { acao: "Ligar", destino: "s2", prob: 0.2 }, //20% de chance de erro de sistema
        { acao: "Ligar", destino: "s3", prob: 0.1 }  //10% de chance de estar sem energia elétrica
    ],
    s1: [ // Quando o computador está ligado corretamente (s1)
        { acao: "Abrir programa", destino: "s4", prob: 0.9 }, // 90% de chance de estar pronto para uso
        { acao: "Abrir programa", destino: "s5", prob: 0.1 } // 10% de chance de precisar reinicializar
    ],
    s3: [
        { acao: "Esperar", destino: "s6", prob: 0.6 }, // 60% de chance da energia ser restaurada
        { acao: "Esperar", destino: "s7", prob: 0.4 }  // 40% de chance de falta de bateria
    ]
};

// Estado inicial, maquina desligada
let estadoAtual = "s0";

function transitar() {
    let possiveisTransicoes = transicoes[estadoAtual] || [];
    let rand = Math.random();
    let acumulado = 0;

    for (let transicao of possiveisTransicoes) {
        acumulado += transicao.prob;
        if (rand < acumulado) {
            estadoAtual = transicao.destino;
            atualizarEstado();
            return;
        }
    }
}

function atualizarEstado() {
    const estadoDisplay = document.getElementById("estado");
    estadoDisplay.textContent = `Estado atual: ${estados[estadoAtual]}`;
}

function reiniciar() {
    estadoAtual = "s0";
    atualizarEstado();
}

document.addEventListener("DOMContentLoaded", () => {
    atualizarEstado();
    document.getElementById("botaoTransicao").addEventListener("click", transitar);
    document.getElementById("botaoReiniciar").addEventListener("click", reiniciar);
    
});
