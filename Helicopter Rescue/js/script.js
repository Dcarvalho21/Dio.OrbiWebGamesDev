function start() {
	$("#inicio").hide();
	
	$("#fundoGame").append("<div id='jogador' class='anima_jogador'></div>");
	$("#fundoGame").append("<div id='heliInimigo' class='anima_heliInimigo'></div>");
	$("#fundoGame").append("<div id='camInimigo'></div>");
	$("#fundoGame").append("<div id='amigo' class='anima_amigo'></div>");
	$("#fundoGame").append("<div id='placar'></div>");
	$("#fundoGame").append("<div id='energia'></div>");

	//Principais variáveis do jogo
	var posicaoFundo = parseInt($("#fundoGame").css("background-position"));
	
	var jogo = {
	};
	jogo.pontos = 0;
	jogo.amigosSalvos = 0;
	jogo.amigosPerdidos = 0;
	jogo.energia = 3;
	jogo.pressionou = [];
	jogo.fim = false;
	
	var TECLAS = {
		W: 87,
		S: 83,
		SPACE: 32
	};

	var sons = {
		"disparo": document.getElementById("somDisparo"),
		"explosao": document.getElementById("somExplosao"),
		"musica": document.getElementById("musica"),
		"gameOver": document.getElementById("somGameover"),
		"perdido": document.getElementById("somPerdido"),
		"resgate": document.getElementById("somResgate")
	};

	var helicopteroJogador = {
		"posicaoX": parseInt($("#jogador").css("left")),
		"posicaoY": parseInt($("#jogador").css("top")),
		"Atirar": true,
		"tiro" : {
			"posicaoX": parseInt($("#jogador").css("left")) + 190,
			"posicaoY": parseInt($("#jogador").css("top")) + 37
		}
	};
	
	var helicopteroInimigo = {
		"vivo": true,
		"velocidade": 5,
		"posicaoX": 694,
		"posicaoY": parseInt(Math.random() * 334)
	};
	
	var caminhaoInimigo = {
		"vivo": true,
		"velocidade": 3.5,
		"posicaoX": 780,
		"posicaoY": 447
	};
	
	var amigo = 
	{
		"vivo": true,
		"velocidade": 1,
		"posicaoX":	10,
		"posicaoY": 464
	};

	//Verifica se o usuário está pressionando alguma tecla
	$(document).keydown(function(e){
		jogo.pressionou[e.which] = true;
	});
	$(document).keyup(function(e){
		jogo.pressionou[e.which] = false;
	});

	sons.musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
	sons.musica.play();
		
	//Game Loop
	jogo.timer = setInterval(gameLoop, 30);
	function gameLoop() {
		moveFundo();
		comportamentosJogador();
		moveHeliInimigo();
		moveCamInimigo();
		moveAmigo();
		colisao();
		placar();
		energia();
	}

	function moveFundo() {
		posicaoFundo -= 2; 
		$("#fundoGame").css("background-position", posicaoFundo);
	}

	function comportamentosJogador() {
		if (jogo.pressionou[TECLAS.W]) {
			if(helicopteroJogador.posicaoY >= 10)
			{
				helicopteroJogador.posicaoY -= 10;
				$("#jogador").css("top", helicopteroJogador.posicaoY);
			}	
		}
		if (jogo.pressionou[TECLAS.S]) {
			if (helicopteroJogador.posicaoY <= 424)
			{
				helicopteroJogador.posicaoY += 10;
				$("#jogador").css("top", helicopteroJogador.posicaoY);
			}	
		}
		if (jogo.pressionou[TECLAS.SPACE]) {
			disparo();	
		}
	} //Fim da função comportamentosJogador()
	
	function moveHeliInimigo() { 
		if (helicopteroInimigo.vivo)
		{
			helicopteroInimigo.posicaoX -= helicopteroInimigo.velocidade; 
			$("#heliInimigo").css("left", helicopteroInimigo.posicaoX);
			$("#heliInimigo").css("top", helicopteroInimigo.posicaoY);
			
			//Reinicia posição do helicoptero inimigo quando chega na borda
			if (helicopteroInimigo.posicaoX < 0) {
				helicopteroInimigo.posicaoX = 694;
				helicopteroInimigo.posicaoY = parseInt(Math.random() * 334);
			}
		}	
	} //Fim da função moveHeliInimigo()

	function moveCamInimigo() { 
        if(caminhaoInimigo.vivo)
		{
			caminhaoInimigo.posicaoX -= caminhaoInimigo.velocidade;
			$("#camInimigo").css("left", caminhaoInimigo.posicaoX);
			
			//Reinicia posição do caminhão inimigo quando chega na borda
			if (caminhaoInimigo.posicaoX < 0) {
				caminhaoInimigo.posicaoX = 780;	
			}
		}
	} //Fim da função moveCamInimigo()

	function moveAmigo() {
		if (amigo.vivo) {
			amigo.posicaoX += amigo.velocidade;
			$("#amigo").css("left", amigo.posicaoX);
			
			//Reinicia posição do amigo quando chega na borda
			if (amigo.posicaoX > 906) {
				amigo.posicaoX = 10;
			}
		}
	} //Fim da função moveAmigo()

	function disparo() {
		//Cria o projetil
		if (helicopteroJogador.Atirar == true) {
			sons.disparo.play();
			helicopteroJogador.Atirar = false;
			helicopteroJogador.tiro.posicaoX = helicopteroJogador.posicaoX + 190;
			helicopteroJogador.tiro.posicaoY = helicopteroJogador.posicaoY + 37;
			$("#fundoGame").append("<div id='disparo'></div");
			$("#disparo").css("left", helicopteroJogador.tiro.posicaoX);
			$("#disparo").css("top", helicopteroJogador.tiro.posicaoY);
			var tempoDisparo = window.setInterval(executaDisparo, 30);
		}
	 
		function executaDisparo() {
			helicopteroJogador.tiro.posicaoX += 15;
			$("#disparo").css("left", helicopteroJogador.tiro.posicaoX); 
			if (helicopteroJogador.tiro.posicaoX > 910) {
				window.clearInterval(tempoDisparo);
				tempoDisparo = null;
				$("#disparo").remove();
				helicopteroJogador.Atirar = true;
			}
		} //Fim da função executaDisparo()
	} //Fim da função disparo()

	function colisao() {
		//Jogador com inimigos
		let colisao1 = ($("#jogador").collision($("#heliInimigo")));
		let colisao2 = ($("#jogador").collision($("#camInimigo")));
		//Disparos com os inimigos
		let colisao3 = ($("#disparo").collision($("#heliInimigo")));
		let colisao4 = ($("#disparo").collision($("#camInimigo")));
		//Amigo
		let colisao5 = ($("#jogador").collision($("#amigo")));
		let colisao6 = ($("#camInimigo").collision($("#amigo")));
		
		
		if (colisao1.length > 0) {
			jogo.energia--;
			explosao1(helicopteroInimigo.posicaoX, helicopteroInimigo.posicaoY);
			$("#heliInimigo").remove();
			reposicionaHeliInimigo();
		}

		if (colisao2.length > 0) {
			jogo.energia--;
			explosao2(caminhaoInimigo.posicaoX, caminhaoInimigo.posicaoY);	
			$("#camInimigo").remove();
			reposicionaCamInimigo();
		}
		
		if (colisao3.length > 0) {
			jogo.pontos += 75;
			helicopteroInimigo.velocidade += 0.3;
			$("#disparo").css("left", 950);
			explosao1(helicopteroInimigo.posicaoX, helicopteroInimigo.posicaoY);
			$("#heliInimigo").remove();
			reposicionaHeliInimigo();
		}

		if (colisao4.length > 0) {
			jogo.pontos += 50;
			caminhaoInimigo.velocidade += 0.3;
			$("#disparo").css("left", 950);
			explosao2(caminhaoInimigo.posicaoX, caminhaoInimigo.posicaoY);	
			$("#camInimigo").remove();
			reposicionaCamInimigo();
		}

		if (colisao5.length > 0) {
			sons.resgate.play();
			jogo.pontos += 100;
			jogo.amigosSalvos ++;
			amigo.velocidade += 0.5;
			$("#amigo").remove();
			reposicionaAmigo();
		}

		if(colisao6.length > 0)
		{
			sons.perdido.play();
			jogo.pontos -= 100;
			jogo.amigosPerdidos++;
			explosao3(amigo.posicaoX, amigo.posicaoY);
			$("#amigo").remove();
			reposicionaAmigo();
		}
	} //Fim da função colisao()

	//Explosão helicóptero inimigo
	function explosao1(posicaoX, posicaoY) {
		sons.explosao.play();
		$("#fundoGame").append("<div id='explosao1'></div");
		$("#explosao1").css("background-image", "url(imgs/explosao.png)");
		let div = $("#explosao1");
		div.css("left", posicaoX);
		div.css("top", posicaoY);
		div.animate({width:200, opacity:5}, "slow");
	
		let tempoExplosao = window.setInterval(removeExplosao, 450);
		function removeExplosao() {
			div.remove();
			window.clearInterval(tempoExplosao);
			tempoExplosao = null;
		}
	} // Fim da função explosao1()
	
	//Explosão caminhão inimigo
	function explosao2(posicaoX, posicaoY) {
		sons.explosao.play();
		$("#fundoGame").append("<div id='explosao2'></div");
		$("#explosao2").css("background-image", "url(imgs/explosao.png)");
		let div = $("#explosao2");
		div.css("left", posicaoX);
		div.css("top", posicaoY);
		div.animate({width:200, opacity:5}, "slow");
		
		let tempoExplosao = window.setInterval(removeExplosao2, 450);
		function removeExplosao2() {
			div.remove();
			window.clearInterval(tempoExplosao);
			tempoExplosao = null;
		}	
	} //Fim da função explosao2()

	function explosao3(posicaoX, posicaoY) {
		$("#fundoGame").append("<div id='explosao3' class='anima_amigo_morte'></div");
		$("#explosao3").css("left", posicaoX);
		$("#explosao3").css("top", posicaoY);
		
		let tempoExplosao = window.setInterval(removeExplosao3, 1000);
		function removeExplosao3() {
			$("#explosao3").remove();
			window.clearInterval(tempoExplosao);
			tempoExplosao = null;
		}
		
	} //Fim da função explosao3()

	function reposicionaHeliInimigo() {
		helicopteroInimigo.vivo = false;
		let tempoColisao = window.setInterval(reposiciona1, 3000);
		function reposiciona1() {
			window.clearInterval(tempoColisao);
			tempoColisao = null;
			if (!jogo.fim) {
				helicopteroInimigo.vivo = true;
				helicopteroInimigo.posicaoX = 694;
				helicopteroInimigo.posicaoY = parseInt(Math.random() * 334);
				$("#fundoGame").append("<div id='heliInimigo' class='anima_heliInimigo'></div>");
			}
		}
	} //Fim da função reposicionaHeliInimigo()
	
	function reposicionaCamInimigo() {
		caminhaoInimigo.vivo = false;
		let tempoColisao = window.setInterval(reposiciona2, 3000);
		function reposiciona2() {
			window.clearInterval(tempoColisao);
			tempoColisao = null;
			if (!jogo.fim) {
				caminhaoInimigo.vivo = true;
				caminhaoInimigo.posicaoX = 790;	
				$("#fundoGame").append("<div id='camInimigo'></div");
			}
		}
	} //Fim da função reposicionaCamInimigo()

	function reposicionaAmigo() {
		amigo.vivo = false;
		let tempoColisao = window.setInterval(reposiciona3, 5000);
		function reposiciona3() {
			window.clearInterval(tempoColisao);
			tempoColisao = null;
			if (!jogo.fim) {
				amigo.vivo = true;
				amigo.posicaoX = 10;
				$("#fundoGame").append("<div id='amigo' class='anima_amigo'></div>");
			}
		}
	} //Fim da função reposicionaAmigo()

	function placar() {
		$("#placar").html("<h2> Pontos: " + jogo.pontos + " Salvos: " + jogo.amigosSalvos + " Perdidos: " + jogo.amigosPerdidos + "</h2>");
	} //Fim da função placar()

	function energia() {
		if (jogo.energia == 3) {
			$("#energia").css("background-image", "url(imgs/energia3.png)");
		}
		else if (jogo.energia == 2) {
			$("#energia").css("background-image", "url(imgs/energia2.png)");
		}
		else if (jogo.energia == 1) {
			$("#energia").css("background-image", "url(imgs/energia1.png)");
		}
		else //energia = 0
		{
			$("#energia").css("background-image", "url(imgs/energia0.png)");
			gameOver();
		}
	} //Fim da função energia()
	
	function gameOver() {
		jogo.fim = true;
		sons.musica.pause();
		sons.gameOver.play();
		
		window.clearInterval(jogo.timer);
		jogo.timer = null;
		
		$("#jogador").remove();
		$("#heliInimigo").remove();
		$("#camInimigo").remove();
		$("#amigo").remove();
		$("#fundoGame").append("<div id='fim'></div>");
		$("#fim").html("<h1> Game Over </h1><p>Sua pontuação foi: " + jogo.pontos + "</p>" + "<div id='reinicia' onclick=reiniciaJogo()><h3>Jogar Novamente</h3></div>");
	} // Fim da função gameOver()

} //Fim da função start()
		
function reiniciaJogo() {
	$("#fim").remove();
	let gameOversound = document.getElementById("somGameover");
	gameOversound.pause();
	gameOversound.currentTime = 0;
	start();
} //Fim da função reiniciaJogo

