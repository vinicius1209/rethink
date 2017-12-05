//Variáveis Globais
var graficoSaldo;
var graficoStatusServidor;

$(function() {
     
    //Template do saldo geral
    var saldoGeral = document.querySelector("#saldoGeral");
	//Template do status do servidor
	var servidorStatus = document.querySelector("#statusServidor");
  
    this.montaGraficoSaldo();
	this.montaGraficoStatusServidor();
  
    var socket = io.connect();
  
    //Quando receber o "stats" do socket...
    socket.on("stats", function(data) {    
		saldoGeral.stats = data.new_val.saldo;
		console.log(saldoGeral.stats);
		graficoSaldo.push([
			{ time: timestamp(), y: saldoGeral.stats}
		]);
    });
	
	//Quando receber o "server_stats" do socket...
	socket.on("server_stats", function(data) {
		servidorStatus.stats = data.new_val.query_engine;
		graficoStatusServidor.push([
			{ time: timestamp(), y: servidorStatus.stats.written_docs_per_sec },
			{ time: timestamp(), y: servidorStatus.stats.read_docs_per_sec}
		]);
    });
	 
 });
 
  //Monta o epoch gráfico para o saldo total dos itens
 function montaGraficoSaldo(){
	
	graficoSaldo = $("#chart_saldo_geral").epoch({
      type: "time.line",
	  axes: ["left", "bottom"],
	  data: [
		  {label: "Saldo", values: [{time: timestamp(), y: 0}]}
		  ]
    }); 
	 
 };
 
 
 //Monta o epoch gráfico para os status do servidor
 function montaGraficoStatusServidor(){
	 
    graficoStatusServidor = $("#chart_servidor_status").epoch({
		type: "time.line",
		axes: ["left", "bottom"],
		data: [
			{label: "Writes", values: [{time: timestamp(), y: 0}]},
			{label: "Reads", values: [{time: timestamp(), y: 0}]}
		]
    });  
 };
 
function timestamp() { 
	return (new Date).getTime() / 1000; 
};