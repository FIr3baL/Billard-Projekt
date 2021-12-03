function saveState() {
	stateHistoryNow++;
	stateHistory[stateHistoryNow] = new Array();
	for (var i=0; i< ballsInGame; i++) {
		stateHistory[stateHistoryNow][i] = new Ball(balls[i].pos, balls[i].v, balls[i].nr);
		stateHistory[stateHistoryNow]["cursorMoves"] = cursorMoves;
	}

	docStateNr.innerHTML = stateHistoryNow+1;
	
	stateToURL();


	
}


function loadPrevState() {
	if ((stateHistoryNow - 1) >= 0) {
		stateHistoryNow--;
		loadState();
	}

	docStateNr.innerHTML = stateHistoryNow+1;
}

function loadPrevStateFast() {
	console.log("??? ", stateHistoryNow);
	if ((stateHistoryNow - 5) < 0)
		stateHistoryNow = 0
	else
		stateHistoryNow -= 5;
	console.log("WTF ", stateHistoryNow);
	loadState();

	docStateNr.innerHTML = stateHistoryNow+1;
}

function loadPrevStateVeryFast() {
	if ((stateHistoryNow - 25) < 0)
		stateHistoryNow = 0
	else
		stateHistoryNow -= 25;
	
	loadState();

	docStateNr.innerHTML = stateHistoryNow+1;
}

function loadNextState() {
	if ( (stateHistoryNow + 1) > (stateHistory.length-1) )
		return;
	
	stateHistoryNow = stateHistoryNow + 1;
	loadState();

	docStateNr.innerHTML = stateHistoryNow+1;
}

function loadNextStateFast() {
	if ( (stateHistoryNow + 5) > (stateHistory.length-1) )
		stateHistoryNow = stateHistory.length - 1
	else
		stateHistoryNow = stateHistoryNow + 5;

	loadState();

	docStateNr.innerHTML = stateHistoryNow+1;
}

function loadNextStateVeryFast() {
	if ( (stateHistoryNow + 25) > (stateHistory.length-1) )
		stateHistoryNow = stateHistory.length - 1
	else
		stateHistoryNow = stateHistoryNow + 25;

	loadState();

	docStateNr.innerHTML = stateHistoryNow+1;
}

function loadState() {
	ballsInGame = stateHistory[stateHistoryNow].length;
	balls = new Array();
	for (var i=0; i< ballsInGame; i++) {
		//stateHistory[stateHistoryNow][i] = new Ball(ballsNow[i].pos, ballsNow[i].v, ballsNow[i].nr);
		balls[i] = new Ball(stateHistory[stateHistoryNow][i].pos, stateHistory[stateHistoryNow][i].v, stateHistory[stateHistoryNow][i].nr);

	}
	cursorMoves = stateHistory[stateHistoryNow]["cursorMoves"];

	// Input-Felder aktualisieren
	docxPosNum.value = balls[cursorMoves.ballNr].pos.x;
	docyPosNum.value = balls[cursorMoves.ballNr].pos.y;

	docxDirNum.value = balls[cursorMoves.ballNr].v.x;
	docyDirNum.value = balls[cursorMoves.ballNr].v.y;

	drawBalls();
}

// Vollständigen Tischzustand in eine aufrufbare URL umformen
function stateToURL() {
	balls = balls.slice(0,ballsInGame);

	// aufrufende URL holen
	str = window.location.href;
	// Aus der URL den vorderen Teil bis zur index-Datei filtern
	str = str.match(/[^?]*/i)[0];
	str += '?';
	
	// Für jede Kugel...
	for (var i=0; i< balls.length; i++) {
		
		// Kugelposition komprimieren und 0,5px abziehen, da alle Kugelmittelpunkte zwischen 2 Pixeln liegen (xxx,5px) und eine ganze Zahl komprimiert werden soll
		str += toA65(balls[i].pos.x-0.5);
		str += toA65(balls[i].pos.y-0.5);
		
		// Kugelgeschwindigkeiten komprimieren; bei negativer Geschwindigkeit wird ein "-" vorangestellt
		if (balls[i].v.x < 0) {
			str += "-" + toA65(balls[i].v.x*-1);
		} else str += String(toA65(balls[i].v.x));
		if (balls[i].v.y < 0) {
			str += "-" + toA65(balls[i].v.y*-1);
		} else str += String(toA65(balls[i].v.y));
	}

	urlText.value = str;

	drawBalls();
}

// vollständigen Tischzustand wiederherstellen aus Argument hinter dem ? in der URL
function URLtoState() {
	
	// URL-Teil hinter dem Fragezeichen holen
	var locPar = location.search;
	
	// URL-Verarbeitung abbrechen, wenn die Länge des URL-Arguments kürzer ist als Sinn macht für 10 Kugeln(keine sichere Prüfung!)
	if ( (locPar.length/8) < 10 ) return false;
	
	// Das erste Zeichen des Arguments abschneiden, da es der Trenner "?" ist
	locPar = locPar.substr(1, locPar.length - 1);

	// hier kommt der neue Tischzustand rein
	testBalls = new Array();

	var i = 0;
	var minus = 1;
	var ballNr = 0;
	var posx = -1;
	var posy = -1;


	// URL-Argument schrittweise für jeweils 8 Buchstaben (oder 9, falls ein Minuszeichen dabei ist) durchgehen
	while (i < locPar.length) {
		
		// Aus den ersten 4 Stellen die Kugelposition in Zahlen zrückrechnen
		if ((posx = fromA65(locPar.substr(i,2))) == null) return "x"+i;
		else posx = Number(posx);
		if ((posy = fromA65(locPar.substr(i+2,2))) == null) return "x"+i;
		else posy = Number(posy);
		
		// Prüfen, ob die Geschwindigkeit negativ ist und nachfolgende 4 Zeichen in Zahlen zurückrechnen, die die Geschwindkeit repräsentieren
		if (locPar.substr(i+4,1) == "-") {
			minus = -1;
			i++;
		} else minus = 1;
		if ((vx =   minus * fromA65(locPar.substr(i+4,2))) == null) return "vx"+i;
		else vx =   Number(vx);

		if (locPar.substr(i+6,1) == "-") {
			minus = -1;
			i++;
		} else minus = 1;
		if ((vy =   minus * fromA65(locPar.substr(i+6,2))) == null) return "vy"+i;
		else vy = Number(vy);

		// Kugelpositionen +0,5 hinzufügen, die beim Codieren zuvor abgezogen wurden
		posx += 0.5;
		posy += 0.5;

		// dem zukünftigen Tischzustand, die dekodierte Kugel mit Position und Geschwindigkeit hinzufügen
		testBalls[ballNr] = new Ball(new Vector(posx,posy), new Vector(vx, vy), i);

		// Nächster Iterationsschritt startet bei 8 Zeichen weiter rechts und erhöhter Kugelnummer
		ballNr++;
		i += 8;
	}

	console.log(testBalls);	

	// testBalls = new Array();
	// for (var i = 0; i < balls.length; i++) {
	// 	if ((posx = getURLParameter("x"+i)) == null) return "x"+i;
	// 	else posx = Number(posx);
	// 	if ((posy = getURLParameter("y"+i)) == null) return "y"+i;
	// 	else posy = Number(posy);
	// 	if ((vx = getURLParameter("vx"+i)) == null) return "vx"+i;
	// 	else vx = Number(vx);
	// 	if ((vy = getURLParameter("vy"+i)) == null) return "vy"+i;
	// 	else vy = Number(vy);
	// 	testBalls[i] = new Ball(new Vector(posx,posy), new Vector(vx, vy), i);
	// }

	
	// Bei erfolgreicher Dekodierung der URL den ermittelten Testzustand in aktuellen Tischzustand kopieren
	balls = new Array();
	
	for (var i = 0; i < 10; i++) {
		balls[i] = new Ball(new Vector(testBalls[i].pos.x, testBalls[i].pos.y), new Vector(testBalls[i].v.x, testBalls[i].v.y), i );
		balls[i].aimTo = balls[i].pos.add(balls[i].v);
	}
	
	// Speichern, wieviele Kugeln existieren
	ballsInGame= balls.length;

	
	// Input-Felder aktualisieren
	cursorMoves.ballNr = 0;
	cursorMoves.vector = 1;

	docxPosNum.value = balls[0].pos.x;
	docyPosNum.value = balls[0].pos.y;

	docxDirNum.value = balls[0].v.x;
	docyDirNum.value = balls[0].v.y;

	// geladenen Zustand als ersten Zustand speichern
	saveState();


}

// ballA = getURLParameter("ballA");