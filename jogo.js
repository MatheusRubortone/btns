var timeId = null; //variável que armazena a chamada da função timeout

var sec;

var tempoSegundos = 0;

var score = 0;

function iniciaJogo(){

	document.getElementById("score").innerHTML = 0;

	alert('Tudo pronto?');

	var url = window.location.search;
	
	var nivelJogo = url.replace("?","");

	// 1- fácil 30s

	if(nivelJogo == 1){

		tempoSegundos = 120;
	}

	// 2- medio: 60s

	if(nivelJogo == 2){

		tempoSegundos = 60;
	}

	// 3- difícil: 30s	

	if(nivelJogo == 3){

		tempoSegundos = 30;
	}

	//inserindo segundos no span
	document.getElementById('cronometro').innerHTML = tempoSegundos;


	// quantidade de balões
	var qtdBaloes = 80;

	var qtdBaloesEst = 0;

	criaBaloes(qtdBaloes);

	//imprimir qtde de baloes inteiros
	document.getElementById('baloesInteiros').innerHTML = qtdBaloes;

	//imprimir qtde de baloes estourados
	document.getElementById('baloesEstourados').innerHTML = qtdBaloesEst;

	contagemTempo(tempoSegundos + 1);
}

function criaBaloes(qtdBaloes){

	for(var i=1;i<=qtdBaloes;i++){

		var balao = document.createElement("img");

		balao.src="imagens/circ_preto.png";
		balao.style.cssText='margin: 10px; width: 36px; height: 36px';
 		balao.id = 'b'+i; 

		document.getElementById('cenario').appendChild(balao);

		balao.onclick = function(){ estourar(this); };

	}

}

function game_over(){
    remove_eventos_baloes();
    alert('Fim de jogo, você não conseguiu estourar todos os balões a tempo');
}

function estourar(b){
	var idBalao = b.id;

	document.getElementById(idBalao).setAttribute("onclick", "");

	document.getElementById(idBalao).src = 'imagens/circ_branco.jpg';
	document.getElementById(idBalao).style.cssText='margin: 10px; width: 36px; height: 36px';

	pontuacao(-1);

	score = score + 10;

	document.getElementById("score").innerHTML = score;
}

function pontuacao(acao){

	var baloesInteiros = document.getElementById("baloesInteiros").innerHTML;
	var baloesEstourados = document.getElementById("baloesEstourados").innerHTML;

	baloesInteiros = parseInt(baloesInteiros);
	baloesEstourados = parseInt(baloesEstourados);

	baloesInteiros = baloesInteiros + acao;
	baloesEstourados = baloesEstourados - acao;

	document.getElementById("baloesInteiros").innerHTML = baloesInteiros;
	document.getElementById("baloesEstourados").innerHTML = baloesEstourados;

	situacaoJogo(baloesInteiros);
}

function situacaoJogo(baloesInteiros ){
	if(baloesInteiros == 0){
		alert("Parabéns!! Você conseguiu apertar todos os botões a tempo!!");
		pararJogo();
	}
}

function pararJogo(){
	clearTimeout(timeId); 
	var total = sec + score;
	alert('Pontuação final: '+(total+1));
}

function contagemTempo(segundos){

	segundos = segundos - 1;

	sec = segundos;

	if(segundos == -1){
		game_over();
		clearTimeout(timeId); //para a execução da funcão do setTimeout
		pararJogo();
		return false;
	}

	document.getElementById('cronometro').innerHTML = segundos;

	timeId = setTimeout("contagemTempo("+segundos+")",1000);	

}

function remove_eventos_baloes() {
    var i = 1; //contado para recuperar balões por id
    
    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('b'+i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b'+i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}