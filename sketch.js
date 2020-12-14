var pontos = 0;
var tela = 0;
var player_x = 100;
var player_y = 100;
var player_r = 30; //Raio do Player
var player_vidas = 5;
var player_disparos = 20;
var player_pode_disparar = true;
var disparo_vaga = []
var disparos_x = [];
var disparos_y = [];
var velocidade = 5;

var lv_dificuldade = 1;
var covid = 7;
var covid_pass = 0; // Covid que passou
var covid_velocidade = 2;
var covid_vida = [];
var covid_x = [];
var covid_y = [];

var r = 0;
var hp_spawner = false; // se "true" existe uma vida em tela
var hp_x = 0;
var hp_y = 0;
var img
var img1
var img2

function preload() {
  img = loadImage('covid.jpg');
  img1 = loadImage ('covid perdeu.jpg');
  img2 = loadImage ('covid venceu.jpg')
}

function setup() {
  createCanvas(600, 400);
  for (var i = 0; i < 20; i++) {
    disparo_vaga[i] = false;
  }
  for (var i = 0; i < covid; i++) {
    covid_x[i] = 650 + 60 * i;
    covid_y[i] = int(random(35, 380));
    covid_vida[i] = 2;
  }
}

function draw() {
  if (tela == 0) {
    background(0);
    image(img, 0,50)

    hp_spawner = false;
    pontos = 0;
    covid_pass = 0;
    covid_velocidade = 2;
    lv_dificuldade = 1;
    player_vidas = 5;
    player_x = 100;
    player_y = 100;
    for (var i = 0; i < 20; i++) {
      disparo_vaga[i] = false;
    }
    for (var i = 0; i < covid; i++) {
      covid_x[i] = 650 + 60 * i;
      covid_y[i] = int(random(35, 380));
      covid_vida[i] = 2;
    }

    fill(0, 0, 0);
    textAlign(CENTER);

    textSize(48);
    text('COVID-19 - A Extinção', 300, 96);

    textSize(24);
    text('- Aperte 1 Para Jogar -', 300, 250);
    text('- Aperte 2 Para Intruções -', 300, 290);
    text('- Aperte 3 Para Créditos -', 300, 330);

    if (keyIsDown(49)) {
      tela = 1;
    }
    if (keyIsDown(50)) {
      tela = 4;
    }
    if (keyIsDown(51)) {
      tela = 5;
    }


  } else if (tela == 1) {
    background(0);

    if (pontos > 300 && pontos < 800) {
      lv_dificuldade = 2;
      covid_velocidade = 2.5;
    } else if (pontos >= 800 && pontos < 1300) {
      lv_dificuldade = 3;
      covid_velocidade = 3;
    } else if (pontos > 1500) {
      tela = 3;
    }

    if (keyIsDown(LEFT_ARROW)) {
      if (player_x > 15) {
        player_x = player_x - velocidade;
      }
    }
    if (keyIsDown(RIGHT_ARROW)) {
      if (player_x < 585) {
        player_x = player_x + velocidade;
      }
    }
    if (keyIsDown(UP_ARROW)) {
      if (player_y > 15) {
        player_y = player_y - velocidade;
      }
    }
    if (keyIsDown(DOWN_ARROW)) {
      if (player_y < 385) {
        player_y = player_y + velocidade;
      }
    }
    fill(255);
    ellipse(player_x, player_y, player_r, player_r);

    if (keyIsDown(32) && player_pode_disparar == true) {
      for (var i = 0; i < player_disparos; i++) {
        if (disparo_vaga[i] == false) {
          disparos_x[i] = player_x + 10;
          disparos_y[i] = player_y;
          player_pode_disparar = false;
          disparo_vaga[i] = true;
          break;
        }
      }
    }

    for (var i = 0; i < player_disparos; i++) {
      if (disparo_vaga[i] == true) {
        disparos_x[i] = disparos_x[i] + 8;
        fill(255, 255, 255);
        ellipse(disparos_x[i], disparos_y[i], 20, 20);
        if (disparos_x[i] > 630) {
          disparo_vaga[i] = false;
        }
      }
    }

    for (var j = 0; j < covid; j++) {
      covid_x[j] = covid_x[j] - covid_velocidade;
      fill(50, 205, 50);
      ellipse(covid_x[j], covid_y[j], 35, 35);
      if (covid_x[j] < -35) {
        covid_x[j] = random(650, 1250);
        covid_y[j] = random(15, 380);
        covid_vida[j] = 2;
        covid_pass = covid_pass + 1;
        if (covid_pass >= 5) {
          player_vidas = player_vidas - 1;
          covid_pass = 0;
        }
      }
    }

    for (var i = 0; i < player_disparos; i++) {
      for (var j = 0; j < covid; j++) {
        if (disparo_vaga[i] == true) {
          if (dist(disparos_x[i], disparos_y[i], covid_x[j], covid_y[j]) < 31) {
            covid_vida[j] = covid_vida[j] - 1;
            disparo_vaga[i] = false;
          }
          if (covid_vida[j] <= 0) {
            covid_x[j] = random(650, 1250);
            covid_y[j] = random(15, 380);
            covid_vida[j] = 2;
            pontos += 15;
          }
        }
      }
    }

    for (var j = 0; j < covid; j++) {
      if (dist(covid_x[j], covid_y[j], player_x, player_y) < 30) {
        player_vidas = player_vidas - 1;
        covid_x[j] = random(650, 1250);
        covid_y[j] = random(15, 380);
        covid_vida[j] = 2;
      }
    }

    if (hp_spawner == true) {
      hp_x = hp_x - 3;
      fill(255, 255, 255);
      ellipse(hp_x, hp_y, 30, 30);
      if (dist(hp_x, hp_y, player_x, player_y) < 30) {
        if (player_vidas < 5) {
          player_vidas = player_vidas + 1;
        }
        pontos = pontos + 30;
        hp_spawner = false;
      } else if (hp_x < -35) {
        hp_spawner = false;
      }
    } else {
      r = int(random(1, 100));
      if (r > 98 - lv_dificuldade) {
        hp_x = random(650, 1250);
        hp_y = random(50, 350);
        hp_spawner = true;
      }
    }

    fill(255, 255, 255);
    textSize(20);
    text('Pontuação: ' + pontos, 500, 39)
    text('Nivel de Dificuldade: ' + lv_dificuldade, 460, 400 - 29)
    text('HP: ', 33, 39)
    for (var i = 0; i < player_vidas; i++) {
      ellipse(64 + i * 20, 32, 15, 15);
    }
    text('Covid: ', 45, 400 - 29)
    for (var i = 0; i < covid_pass; i++) {
      fill(50, 205, 50)
      ellipse(85 + i * 20, 400 - 35, 15, 15);
    }
    if (player_vidas <= 0) {
      tela = 2;
    }

  } else if (tela == 2) {
    background(0);
    image(img1, 0,0)
    fill(0, 0, 0);
    textAlign(CENTER);

    textSize(36);
    text('- VOCÊ PERDEU -', 300, 48);

    textSize(24);
    text('O seu ser humano aparentemente gosta\n' +
      'de dificultar a sua vida não usando\n' +
      'máscara e álcool em gel, ele acredita\n' +
      'que seja só uma gripezinha e graças a\n' +
      'isso, a humanidade foi extinta!', 300, 125);

    textSize(24);
    textAlign(CENTER);
    text('Pressione ENTER para Voltar', 300, 352);

    if (keyIsDown(13)) {
      tela = 0;
    }


  } else if (tela == 3) {
    background(0);
    image(img2, 0,0)
    fill(0, 0, 0);
    textAlign(CENTER);

    textSize(36);
    text('- PARABÉNS -', 300, 48);

    textSize(24);
    text('Você fez sua parte!\n' +
      'Se todos forem um bom glóbulo branco como você,\n' +
      'usando máscara e álcool em gel\n' +
      'venceremos essa batalha\n' +
      'e a humanidade não será extinta!', 300, 125);

    textSize(24);
    textAlign(CENTER);
    text('Pressione ENTER para Voltar', 300, 352);

    if (keyIsDown(13)) {
      tela = 0;
    }

  } else if (tela == 4) {
    background(0);
    fill(255, 255, 255);
    textAlign(CENTER);

    textSize(36);
    text('- INSTRUÇÕES -', 300, 48);
    textAlign(LEFT);
    textSize(18);
    text('- Use as setinhas do teclado para movimentar o personagem.\n' +
      '- Pressione barra de espaço para disparar contra os inimigos.\n' +
      '- Ao colidir com os inimigos você perde 1 de HP.\n' +
      '- A cada 5 inimigos que conseguirem passar, você perderá \n 1 de HP\n' +
      '- Colida com outro globulos brancos para recuperar HP\n' +
      '- Ao atingir certa quantidade de pontos, a dificuldade irá aumentar', 40, 100);

    textSize(24);
    textAlign(CENTER);
    text('Pressione ENTER para Voltar', 300, 352);

    if (keyIsDown(13)) {
      tela = 0;
    }
  } else if (tela == 5) {
    background(0);
    fill(255, 255, 255);
    textAlign(CENTER);
    textSize(24);
    text('- Creditos -', 300, 48);
    text('Pressione ENTER para Voltar', 300, 352);

    textSize(18);
    textAlign(LEFT);

    text('- Raissa\n' +
      '- Djalma', 40, 100);


    if (keyIsDown(13)) {
      tela = 0;
    }
  }
}

function keyReleased() {
  if (keyCode === 32) {
    player_pode_disparar = true;
  }
}