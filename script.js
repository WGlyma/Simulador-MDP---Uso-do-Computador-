// Estados do computador
const estados = {
    s0: "Computador desligado",
    s1: "Ligado corretamente",
    s2: "Erro de sistema",
    s3: "Sem energia elétrica",
    s4: "Pronto para uso",
    s5: "Reinicialização necessária",
    s6: "Energia restaurada",
    s7: "Falta de bateria",
    s8: "Modo de segurança ativado",
    s9: "Atualizando sistema",
    s10: "Conectando à rede",
    s11: "Aguardando energia estável",
    s12: "Recuperação do sistema concluída",
    s13: "Atualização falhou, reiniciando"
};

// Transições entre os estados
const transicoes = {
    s0: [ 
        { acao: "Ligar", destino: "s1", prob: 0.7 },
        { acao: "Ligar", destino: "s2", prob: 0.2 },
        { acao: "Ligar", destino: "s3", prob: 0.1 }
    ],
    s1: [ 
        { acao: "Abrir programa", destino: "s4", prob: 0.9 },
        { acao: "Abrir programa", destino: "s5", prob: 0.1 }
    ],
    s2: [ 
        { acao: "Entrar no modo de segurança", destino: "s8", prob: 1.0 } 
    ],
    s3: [
        { acao: "Esperar", destino: "s6", prob: 0.6 },
        { acao: "Esperar", destino: "s7", prob: 0.4 }
    ],
    s4: [ 
        { acao: "Conectar à rede", destino: "s10", prob: 1.0 }
    ],
    s5: [ 
        { acao: "Atualizar sistema", destino: "s9", prob: 1.0 }
    ],
    s6: [
        { acao: "Aguardar estabilidade", destino: "s11", prob: 1.0 }
    ],
    s8: [ 
        { acao: "Recuperar sistema", destino: "s12", prob: 1.0 }
    ],
    s9: [ 
        { acao: "Finalizar atualização", destino: "s13", prob: 0.3 },
        { acao: "Finalizar atualização", destino: "s4", prob: 0.7 } 
    ]
};

// Estado inicial
let estadoAtual = "s0";

// Função que realiza a transição de estado com base nas probabilidades
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

// Atualiza a interface do usuário para mostrar o estado atual
function atualizarEstado() {
    const estadoDisplay = document.getElementById("estado");
    estadoDisplay.textContent = `Estado atual: ${estados[estadoAtual]}`;
}

// Reinicia a máquina de estados para o estado inicial
function reiniciar() {
    estadoAtual = "s0";
    atualizarEstado();
}

// Aguarda o carregamento da página  
document.addEventListener("DOMContentLoaded", () => {
    atualizarEstado();
    document.getElementById("botaoTransicao").addEventListener("click", transitar);
    document.getElementById("botaoReiniciar").addEventListener("click", reiniciar);
});
