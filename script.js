/**
 * Decodificador de Runas Ancestrais
 * 
 * Este script decodifica mensagens codificadas usando a cifra de César,
 * onde cada letra é deslocada um número fixo de posições no alfabeto.
 */

// Espera o DOM carregar completamente antes de executar o script
document.addEventListener('DOMContentLoaded', function () {
    // Obtém referências aos elementos do DOM
    const decodeBtn = document.getElementById('decodeBtn');
    const encodedMessageInput = document.getElementById('encodedMessage');
    const shiftInput = document.getElementById('shift');
    const resultDiv = document.getElementById('result');

    // Adiciona evento de clique ao botão de decodificação
    decodeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        decodeMessage();
    });

    // Adiciona evento de tecla para permitir decodificação ao pressionar Enter
    encodedMessageInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            decodeMessage();
        }
    });

    shiftInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            decodeMessage();
        }
    });

    /**
     * Função principal para decodificar a mensagem
     */
    function decodeMessage() {
        // Obtém os valores dos inputs
        const encodedMessage = encodedMessageInput.value.trim();
        const shift = parseInt(shiftInput.value) || 0;

        // Verifica se há mensagem para decodificar
        if (!encodedMessage) {
            alert('Por favor, insira uma mensagem codificada.');
            return;
        }

        // Decodifica a mensagem
        const decodedMessage = caesarCipher(encodedMessage, -shift);

        // Exibe o resultado
        resultDiv.textContent = decodedMessage;

        // Adiciona animação ao resultado
        resultDiv.style.animation = 'none';
        setTimeout(() => {
            resultDiv.style.animation = 'fadeIn 0.5s ease-in-out';
        }, 10);
    }

    /**
     * Implementa a cifra de César para codificar/decodificar mensagens
     * @param {string} str - A string a ser codificada/decodificada
     * @param {number} shift - O número de posições para deslocar (positivo para codificar, negativo para decodificar)
     * @returns {string} A string codificada/decodificada
     */
    function caesarCipher(str, shift) {
        // Ajusta o deslocamento para garantir que esteja no intervalo de 0-25
        shift = shift % 26;

        return str.split('').map(char => {
            // Mantém espaços inalterados
            if (char === ' ') return ' ';

            // Obtém o código Unicode do caractere
            const code = char.charCodeAt(0);

            // Verifica se é uma letra minúscula (a-z)
            if (code >= 97 && code <= 122) {
                // Aplica o deslocamento
                let newCode = code + shift;

                // Trata a rotação do alfabeto
                if (newCode > 122) {
                    newCode -= 26;
                } else if (newCode < 97) {
                    newCode += 26;
                }

                return String.fromCharCode(newCode);
            }

            // Retorna o caractere original se não for uma letra minúscula
            return char;
        }).join('');
    }

    // Adiciona estilos dinâmicos para a animação do resultado
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
});