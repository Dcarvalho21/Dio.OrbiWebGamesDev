var jogador = 'X';
var vencedor = null;
var jogadorSelec = document.getElementById('jogadorSelec');
var vencedorHTML = document.getElementById('vencedor');
var quadrados = document.getElementsByClassName('quadrado');
var jogadas = 0;


function escolherQuadrado(id)
{
    if(vencedor == null)
    {
        var quadrado = document.getElementById(id);
        if (quadrado.innerHTML == '-')
        {
            quadrado.innerHTML = jogador;
            quadrado.style.color = '#000';
            jogadas++;
            
            if (jogadas >= 5)
                verificaVencedor();
            
            if(jogadas == 9 && vencedor == null)
            {
                jogadorSelec.innerHTML = ' ';
                vencedor = 'EMPATE'
                vencedorHTML.innerHTML = vencedor;
            }
                
            if (vencedor == null)
                mudarJogador();
        }
    }
}

function mudarJogador()
{
    if (jogador == 'X')
        jogador = 'O';
    else
        jogador = 'X';

    jogadorSelec.innerHTML = jogador;
}

function quadradosVencedores(q1, q2, q3)
{
    q1.style.background = '#0f0';
    q2.style.background = '#0f0';
    q3.style.background = '#0f0';
}

function reiniciar()
{
    vencedor = null;
    jogador = 'X';
    jogadas = 0;
    vencedorHTML = ' ';   
    for (let i = 0; i < quadrados.length; i++)
        {
            quadrados[i].innerHTML = '-';
            quadrados[i].style.color = '#eee';
        }
}

function verificaVencedor()
{
    if(quadrados[0].innerHTML != '-')
    {
        // Linha 1
        if (quadrados[0].innerHTML == quadrados[1].innerHTML
            && quadrados[1].innerHTML == quadrados[2].innerHTML)
        {
            vencedor = jogador;
            quadradosVencedores(quadrados[0], quadrados[1], quadrados[2]);
        }
        // Coluna 1
        else if(quadrados[0].innerHTML == quadrados[3].innerHTML
            && quadrados[3].innerHTML == quadrados[6].innerHTML)
        {
            vencedor = jogador;
            quadradosVencedores(quadrados[0], quadrados[3], quadrados[6]);
        }
        // Diagonal principal
        else if(quadrados[0].innerHTML == quadrados[4].innerHTML
            && quadrados[4].innerHTML == quadrados[8].innerHTML)
        {
            vencedor = jogador;
            quadradosVencedores(quadrados[0], quadrados[4], quadrados[8]);
        }
    }
    if(quadrados[4].innerHTML != '-')
    {
        // Linha 2
        if(quadrados[3].innerHTML == quadrados[4].innerHTML
            && quadrados[4].innerHTML == quadrados[5].innerHTML)
        {
            vencedor = jogador;
            quadradosVencedores(quadrados[3], quadrados[4], quadrados[5]);
        }
        // Coluna 2
        else if(quadrados[1].innerHTML == quadrados[4].innerHTML
            && quadrados[4].innerHTML == quadrados[7].innerHTML)
        {
            vencedor = jogador;
            quadradosVencedores(quadrados[1], quadrados[4], quadrados[7]);
        }
        // Diagonal secundária
        else if(quadrados[2].innerHTML == quadrados[4].innerHTML
            && quadrados[4].innerHTML == quadrados[6].innerHTML)
        {
            vencedor = jogador;
            quadradosVencedores(quadrados[2], quadrados[4], quadrados[6]);
        }
    }
    if(quadrados[8].innerHTML != '-')
    {
        // Linha 3
        if(quadrados[6].innerHTML == quadrados[7].innerHTML
            && quadrados[7].innerHTML == quadrados[8].innerHTML)
        {
            vencedor = jogador;
            quadradosVencedores(quadrados[6], quadrados[7], quadrados[8]);
        }
        // Coluna 3
        else if(quadrados[2].innerHTML == quadrados[5].innerHTML
            && quadrados[5].innerHTML == quadrados[8].innerHTML)
        {
            vencedor = jogador;
            quadradosVencedores(quadrados[2], quadrados[5], quadrados[8]);
        }
    }

    if (vencedor != null)
    {
        jogadorSelec.innerHTML = ' ';
        vencedorHTML.innerHTML = vencedor;
    }
}