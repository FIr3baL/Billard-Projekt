function init(){
	a = 0;
	isDrawing = false;
	tMin = 0;
	AnimId = -1;
	ballsInGame = 0;

	stateHistory = new Array();
	stateHistoryNow = -1;

	colBallNrA = colBallNrB = -1;
	colBallA =colBallB = -1;

	hops = hopsinit = 50;

	Alphabet65();

	//snd_ballsHit = new sound("import/108615__juskiddink__billiard-balls-single-hit-dry.wav");
	// snd_ballsHit    = AudioFX('import/108615__juskiddink__billiard-balls-single-hit-dry',   { formats: ['wav'], pool: 30 });
	snd_ballsHit    = AudioFX('import/ballHit',   { formats: ['mp3'], pool: 30 });
	// snd_cushionHit    = AudioFX('import/42364__mccarthy-bedmas-com__pool-ball-bounce-off-rail',   { formats: ['wav'], pool: 30 });
	snd_cushionHit    = AudioFX('import/cushionHit',   { formats: ['mp3'], pool: 30 });
	snd_ballPocket    = AudioFX('import/ballPocket',   { formats: ['mp3'], pool: 30 });

	// Mausselektion = Kugelnummer, Eigenschaft(0=Position; 1=Geschwindigkeit, 2=Beschleunigung)
	cursorMoves = {
		ballNr: 0,   // Kugelnummer
		vector: 1  // 0 = Position; 1= Geschwindigkeit, 2 = Beschleunigung
	};

	ballName = new Array();
	ballName[0] = "Spielball (Wei&szlig;)";
	ballName[1] = "Kugel 1 (gelb)";
	ballName[2] = "Kugel 2 (blau)";
	ballName[3] = "Kugel 3 (rot)";
	ballName[4] = "Kugel 4 (lila)";
	ballName[5] = "Kugel 5 (orange)";
	ballName[6] = "Kugel 6 (Gr&uuml;n)";
	ballName[7] = "Kugel 7 (weinrot)";
	ballName[8] = "Kugel 8 (Schwarz)";
	ballName[9] = "Kugel 9 (halb gelb)";

	// Schattenbild
	shadowImg = document.getElementById("ballshadow");

	// Canvas erzeugen
	gameCanvas = document.getElementById("gamecanvas");
	ctx = gameCanvas.getContext('2d');
	ctx.translate(0.5, 0.5);
		
	canvasWidth = gameCanvas.width;
	canvasHeight = gameCanvas.height;


	// Tischgröße festlegen
	pg = new Playground(7);
	
	// Startpositionen der Kugeln festlegen
	initBalls();

	// Taschenpositionen festlegen
	initPockets();

	// Koordinaten aller Banden festlegen
	initCushions();

	initInputs();


	docInfo = document.getElementById("info");
	docBallTitle = document.getElementById("ballTitle");
	

	URLtoState();

	drawBalls();

	// Info und Inputfelder aktualisieren
	docBallTitle.innerHTML = ballName[cursorMoves.ballNr];

}

// Spielfeld festlegen
function Playground(tableSize){
		
	// Spielfeldgröße (die durch die Banden eingegrenzte Fläche + dicke der Banden)
	switch(tableSize) {
		// 8-Fuß
		case 8:
			this.width = 904;
			this.height = 452;
			break;
		// 9-Fuß
		case 9:
			this.width = 1024;
			this.height = 512;
			break;
		// 7-Fuß
		default:
			this.width = 824;
			this.height = 434;
	}

	origin = new Vector(48,48);
	gameCanvas.width = this.width;
	gameCanvas.height = this.height;
	// ctx.translate(0.5, 0.5);

	// Ball Durchmesser
	bDiameter = 23;

	// Ball Radius
	bRadius = bDiameter / 2;

	// Abstand von linker oberer Ecke des Kugelbildes zu Mittelpunkt der Kugel; Benötigt für Zeichnen-Funktionen
	deltaDraw = Math.floor(bRadius);

}




function drawBalls() {
	var colBallNr;
	ctx.clearRect(0, 0, pg.width, pg.height);

	// cushions[18].pos.drawLine(cushions[18].v, "sandybrown");
	// cushions[19].pos.drawLine(cushions[19].v, "sandybrown");
	// cushions[20].pos.drawLine(cushions[20].v, "sandybrown");

	// cushions[21].pos.drawLine(cushions[21].v, "maroon");
	// cushions[22].pos.drawLine(cushions[22].v, "maroon");
	// cushions[23].pos.drawLine(cushions[23].v, "maroon");
	// cushions[24].pos.drawLine(cushions[24].v, "maroon");

	// ctx.fillStyle="maroon";
	// ctx.beginPath();
	// ctx.moveTo(493,251);
	// ctx.lineTo(492,255);
	// ctx.lineTo(842,305);
	// ctx.lineTo(846,293);
	// ctx.closePath();
	// ctx.fill();

	// console.log(pockets[5]);
	// ctx.beginPath();
 //  	ctx.arc(pockets[5].pos.x, pockets[5].pos.y, pockets[5].r, 0, 2 * Math.PI, false);
 //  	ctx.lineWidth = 1;
 //  	ctx.strokeStyle = '#DDDDDD';
 //  	ctx.stroke();

	// balls = balls.slice(0,10);

	// //Kollisionserkennung mit Bällen
	// tMin = -1;
	// colType = -1;

	// for (var ballA = 0; ballA < (ballsInGame-1); ballA++) {

	// 	// Kugel-Kugel Kollisionen erkennen
	// 	for (ballB = (ballA+1); ballB < ballsInGame; ballB++) {
	// 		tTest = balls[ballA].relColDetect(balls[ballB]);
	// 		if (isFinite(tTest) && (tTest >= 0)) {
	// 			if ( (tMin == -1) || (tTest < tMin) ){
	// 				tMin = tTest;
	// 				colBallNrA = ballA;
	// 				colBallNrB = ballB;
	// 				colType = "ballball"
	// 			}
				
	// 		}
	// 	}


		

	// 	// Kollisionserkennung mit Löchern = versenkt
	// 	pockets.forEach(function(holei, index, array) {
	// 		tTest = balls[ballA].colDetectPocket(holei);
	// 		if (isFinite(tTest) && (tTest >= 0)) {
	// 			if ( (tMin == -1) || (tTest < tMin) ){
	// 				tMin = tTest;
	// 				colBallNrA = ballA;
	// 				colHoleNr = index;
	// 				colType = "ballhole"
	// 			}

	// 		}
	// 	});



	// 	// Kollisioneerkeunng mit Banden
	// 	cushions.forEach(function(cushioni, index, array) {
	// 		tTest = cushioni.colDetect(balls[ballA]);
	// 		if (tTest) {
	// 			if ( (tMin == -1) || (tTest < tMin) ){
	// 				tMin = tTest;
	// 				colBallNrA = ballA;
	// 				colCushionNr = index;
	// 				colType = "ballcushion";
	// 			}
	// 		} else if (tTest = cushioni.colDetectVertices(balls[ballA])) {
				
	// 			if ( (tMin == -1) || (tTest < tMin) ){
	// 				tMin = tTest;
	// 				colBallNrA = ballA;
	// 				colCushionNr = index;
	// 				colType = "ballcushion";
	// 			}
	// 		}

	// 	});

		
	// }

	tMin = searchNextCol();

	
	// falls eine Kollision erkannt wurde, 1 oder 2 virtuelle Kugeln an dem Kollisionspunkt hinzufügen
	if (tMin != -1) {
		
		balls.push(balls[colBallNrA].getNewPos(tMin));
		if (colType == "ballball") {
			balls.push(balls[colBallNrB].getNewPos(tMin));
		} else if (colType == "ballhole") {
			balls[balls.length-1].potted = 1;
		} else if (colType == "ballcushion") {
			//balls[colBallNrA].showColCushion(colCushionNr);
		} else {
		}
	} 

	// Alle Ballschatten zeichnen
	balls.forEach(function(balli, array, index) {
	 	balli.drawShadow();
	});

	// Alle Bälle zeichnen
	balls.forEach(function(balli, array, index) {
		balli.draw();
	});
	
	if (colType == "ballball") {
		balls[colBallNrA].showCol(balls[colBallNrB], tMin, colBallNrA);
		//balls[balls.length-2].showCol(balls[colBallNrB], tMin, colBallNrA);
	}

	drawCursorPointsTo();

}

function searchNextCol(){
	balls = balls.slice(0,10);

	//Kollisionserkennung mit Bällen
	tMin = -1;
	colType = -1;

	for (var ballA = 0; ballA < (ballsInGame); ballA++) {

		// Kugel-Kugel Kollisionen erkennen
		for (ballB = (ballA+1); ballB < ballsInGame; ballB++) {
			tTest = balls[ballA].relColDetect(balls[ballB]);
			if (isFinite(tTest) && (tTest >= 0)) {
				if ( (tMin == -1) || (tTest < tMin) ){
					tMin = tTest;
					colBallNrA = ballA;
					colBallNrB = ballB;
					colType = "ballball"
				}
				
			}
		}


		

		// Kollisionserkennung mit Löchern = versenkt
		pockets.forEach(function(holei, index, array) {
			tTest = balls[ballA].colDetectPocket(holei);
			if (isFinite(tTest) && (tTest >= 0)) {
				if ( (tMin == -1) || (tTest < tMin) ){
					tMin = tTest;
					colBallNrA = ballA;
					colHoleNr = index;
					colType = "ballhole"
				}

			}
		});



		// Kollisioneerkeunng mit Banden
		cushions.forEach(function(cushioni, index, array) {
			tTest = cushioni.colDetect(balls[ballA]);
			if (tTest) {
				if ( (tMin == -1) || (tTest < tMin) ){
					tMin = tTest;
					colBallNrA = ballA;
					colCushionNr = index;
					colType = "ballcushion";
				}
			} else if (tTest = cushioni.colDetectVertices(balls[ballA])) {
				
				if ( (tMin == -1) || (tTest < tMin) ){
					tMin = tTest;
					colBallNrA = ballA;
					colCushionNr = index;
					colType = "ballcushion";
				}
			}

		});

		
	}

	return tMin;

}

function drawCursorPointsTo() {

}

function stopAnimate() {
	cancelAnimationFrame(id);
	nextDiscret();
}

function startAnimate() {
	
	if (hops > 0 ) {
		hops--;

		// letzten Tischzustand abspeichern
		//saveState(balls);


		// etwaige Hilfsbälle aus der Menge der Bälle löschen
		balls = balls.slice(0,ballsInGame);

		// relative Zeit des Frames
		frameTime = 0;

		// Bewegung bis einen Tick(16ms) vor Zielzustand ausführen
		endTime = Math.round((tMin/2) * 1000) - 16;

		// Polyfill Funktion statt echtem requestAnimationFrame, da vom Java-Browser nicht unterstützt	
		AnimId = window.requestAnimationFrame(moveBalls);
	} else {
		nextDiscret();
	}
}

function moveBalls(timestamp) {
	frameTime += timestamp;
	// counter++;

	// Canvas komplett löschen
	ctx.clearRect(0, 0, pg.width, pg.height);
	
	// Alle Ballpositionen für das Frame berechnen und darstellen
	for (var ballA = 0; ballA < (ballsInGame); ballA++) {
		balls[ballA].d  = balls[ballA].pos.add( balls[ballA].v.mult(frameTime/1000*2) );
								  
		balls[ballA].drawFrameShadow();
	}

	for (var ballA = 0; ballA < (ballsInGame); ballA++) {
		balls[ballA].drawFramePos();
	}



	// Prüfen, ob Zielframe erreicht ist
	if (frameTime > endTime)  {
		id = window.requestAnimationFrame(collisionCalc);
	} else {
		id = window.requestAnimationFrame(moveBalls);
	}
}

function collisionCalc() {
	// Letztes Frame zeichnen mit zuvor berechntem tMin statt dem DeltaT aus RaF
	for (var ballA = 0; ballA < (ballsInGame); ballA++) {
		//balls[ballA].pos  = balls[ballA].pos.add( balls[ballA].v.mult(tMin) );
		balls[ballA].pos  = new Vector( ( balls[ballA].pos.x + balls[ballA].v.x * tMin),
										( balls[ballA].pos.y + balls[ballA].v.y * tMin)
										);	
	}

	if (colType == "ballball") {
		snd_ballsHit.play();

		balls[colBallNrB].v = balls[colBallNrA].calcColBalls(balls[colBallNrB]);

		tMin = searchNextCol();
		startAnimate();

	} else if (colType == "ballcushion") {
		snd_cushionHit.play();
		// console.log(balls[colBallNrA].pos);
		balls[colBallNrA].calcColCushion(cushions[colCushionNr]);

		tMin = searchNextCol();
		startAnimate();
		
	} else if (colType == "ballhole") {
		snd_ballPocket.play();
		balls.splice(colBallNrA,1);
		ballsInGame--;

		tMin = searchNextCol();
		startAnimate();

	} else {
		nextDiscret();
	}
	//drawBalls();	
}

function nextDiscret() {
	// Letztes Frame zeichnen mit zuvor berechntem tMin statt dem DeltaT aus RaF
	for (var ballA = 0; ballA < (ballsInGame); ballA++) {
		//balls[ballA].pos  = balls[ballA].pos.add( balls[ballA].v.mult(tMin) );
		balls[ballA].pos  = new Vector( Math.round( balls[ballA].pos.x + balls[ballA].v.x * tMin + 0.5) - 0.5,
										Math.round( balls[ballA].pos.y + balls[ballA].v.y * tMin + 0.5) - 0.5
										);	
	}


	hops = hopsinit;

	// neuen Tischzustand abspeichern
	saveState(balls);

	// Formularfelder aktualisieren
	docxPosNum.value = balls[cursorMoves.ballNr].pos.x;
	docyPosNum.value = balls[cursorMoves.ballNr].pos.y;

	docxDirNum.value = balls[cursorMoves.ballNr].v.x;
	docyDirNum.value = balls[cursorMoves.ballNr].v.y;

	drawBalls();	
}

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}
