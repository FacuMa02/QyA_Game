let base_preguntas = readText("base-preguntas.json");
let interprete_bp = JSON.parse(base_preguntas);
let question;
let posiblesResp;
let btn_correspondiente = [
  select_id("btn1"),
  select_id("btn2"),
  select_id("btn3"),
  select_id("btn4"),
];
var contador = 0;
var level = 0;
interprete_bp = interprete_bp.sort(() => {
  return Math.random() - 0.5;
});

selectRandomQuestion();

function selectRandomQuestion() {
  selectQuestion(level);
  level += 1;
  checkFinal(level);
}

function checkFinal(lev) {
  if (lev === 24) {
    return window.alert("¡FIN DEL JUEGO!\nNumero de aciertos: " + contador);
  }
}

function selectQuestion(n) {
  question = interprete_bp[n];
  select_id("categoria").innerHTML = question.categoria;
  select_id("pregunta").innerHTML = question.pregunta;
  select_id("imagen").setAttribute("src", question.imagen);
  style("imagen").objectFit = question.objectFit;
  if (question.imagen) {
    style("imagen").height = "250px";
    style("imagen").width = "100%";
  } else {
    style("imagen").height = "0px";
    style("imagen").width = "0px";
  }
  desordenarRespuestas(question);
}

function desordenarRespuestas(question) {
  posiblesResp = [
    question.respuesta,
    question.incorrecta1,
    question.incorrecta2,
    question.incorrecta3,
  ];
  posiblesResp.sort(() => Math.random() - 0.5);
  select_id("btn1").innerHTML = posiblesResp[0];
  select_id("btn2").innerHTML = posiblesResp[1];
  select_id("btn3").innerHTML = posiblesResp[2];
  select_id("btn4").innerHTML = posiblesResp[3];
}

function oprimir_btn(i) {
  if (posiblesResp[i] == question.respuesta) {
    btn_correspondiente[i].style.background = "lightgreen";
    contador += 1;
  } else {
    btn_correspondiente[i].style.background = "red";
  }
  setTimeout(() => {
    reiniciar();
  }, 1000);
}

function reiniciar() {
  for (const btn of btn_correspondiente) {
    btn.style.background = "white";
  }
  selectRandomQuestion();
}

function select_id(id) {
  return document.getElementById(id);
}

function style(id) {
  return select_id(id).style;
}

function readText(ruta_local) {
  //fetch(ruta_local).then((res) => res.json()).then(data=>{});
  var texto = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", ruta_local, false);
  xmlhttp.send();
  if (xmlhttp.status == 200) {
    texto = xmlhttp.responseText;
  }
  return texto;
}
