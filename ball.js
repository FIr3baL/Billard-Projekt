// Klasse Ball: Ortsvektor, Richtungsvektor, Kugelnummer
function Ball(pos, v, nr, r, potted, virtual){

	// Kugelposition
	this.pos = new Vector(pos.x, pos.y);

	// Kugel-Geschwindigkeitvektor
	this.v = v || new Vector(0,0);
	
	// Kugelposition nach 1 sek.
	this.aimTo = this.pos.add(this.v);
	
	// Kugelnummer (0 = weiße, 1 = 1 usw...)
	this.nr = nr;

	// Radius der Kugel
	this.r = r || (bRadius);

	// Kugel versenkt?
	this.potted = potted || 0;

	// Kollisionsanzeigekugel?
	this.virtual = virtual || 0;

	// Kugelposition während der Bewegung
	this.d = this.pos;

	// zuvor in html geladene Kugel-Bilder an Hand der Kugelnummer zuordnen
	if (this.nr > -1) {
		this.img = document.getElementById("ball"+nr);
	} else {
		//console.log(this.nr);
		showError("Kein HTML Element für Kugel Nr." + nr + " gefunden.");
	}

}

Ball.prototype.moveTo = function(v2) {
	this.pos = v2;
	this.aimTo = this.pos.add(this.v);
	drawBalls();
}

Ball.prototype.changeDir = function(v2) {
	this.v = v2;
	drawBalls();
}

// Ball zeichnen
Ball.prototype.draw = function() {
	//ctx.translate(-0.5, -0.5);

	if (this.virtual) ctx.globalAlpha = 0.5;
	if (this.potted) ctx.globalAlpha = 0.4;
	ctx.drawImage(this.img, (Math.round(this.pos.x - this.r)), (Math.round(this.pos.y - this.r)));
	//ctx.translate(0.5, 0.5);
	ctx.globalAlpha = 1;

	if (this.v.abs() > 0) {
		this.aimTo = this.pos.add(this.v);
		this.drawArrow("grey", "darkgrey");
    }
}

// Ball während Bewegung zeichnen
Ball.prototype.drawFramePos = function() {
	ctx.translate(-0.5, -0.5);

	//ctx.drawImage(this.img, Math.round(this.pos.x - deltaDraw), Math.round(this.pos.y - deltaDraw));
	
	ctx.drawImage(this.img, (this.d.x - deltaDraw), (this.d.y - deltaDraw));
	ctx.translate(0.5, 0.5);

}

// Ballschatten zeichnen
Ball.prototype.drawFrameShadow = function() {
	ctx.translate(-0.5, -0.5);

	ctx.drawImage(shadowImg, (this.d.x - deltaDraw-3), (this.d.y - deltaDraw-1));
	ctx.translate(0.5, 0.5);
}

// Ballschatten zeichnen
Ball.prototype.drawShadow = function() {
	ctx.translate(-0.5, -0.5);

	//ctx.drawImage(this.img, Math.round(this.pos.x - deltaDraw), Math.round(this.pos.y - deltaDraw));
	ctx.drawImage(shadowImg, (this.pos.x - deltaDraw-3), (this.pos.y - deltaDraw-1));
	ctx.translate(0.5, 0.5);

	// if (this.v.abs() > 0) {
	// 	this.aimTo = this.pos.add(this.v);
	// 	this.drawArrow(this.v, "grey", "darkgrey");
 //    }
}

Ball.prototype.topLeft = function() {
	var v2 = new Vector(this.x - deltaDraw, this.y - deltaDraw);
	return v2;
}


// Kollisionserkennung von Kugel mit Tasche
Ball.prototype.colDetectPocket = function(pocket){
	/****************************************************************************************************************************
	Es wird der KollisionsZEITPUNKT t ermittelt.

	Eine Kugel fällt in eine Tasche, wenn der Mittelpunkt der Kugel hinter dem Taschenrand liegt.

	Die Berechnung erfolgt synchron zu der Ermittlung von Kugel zu Kugel Kollsionen.
	Die Tasche wird durch eine Kugel simuliert, die einen Ortsvektor und einen Radius hat.

	Wird der Abstand von der sich bewegenden Kugel A zu dem Mittepunkt der Tasche kleiner als der Taschenradius, dann ist die Kugel versenkt.
	******************************************************************************************************************************/

	ABrel = pocket.pos.sub(this.pos);
	vCub = this.v.cub();
	q = ( ABrel.cub() - Math.pow((pocket.r), 2) ) / vCub;
	p =  ( -2 * ( ABrel.dot(this.v) ) ) / vCub;
	pHalf = -1 * p / 2;
	wurzelTerm = Math.sqrt( Math.pow(pHalf, 2) - q );
	t = pHalf - Math.sqrt( Math.pow(pHalf, 2) - q );

	return t;
}

// Kollisionserkennung für Ball B ruhend und Ball A mit gleichförmiger Bewegung
Ball.prototype.colDetect = function(ballB){
	
	/***************************************************************************************************************************
	Es wird der KollisionsZEITPUNKT t ermittelt.

	Die bewegliche Kugel A bewegt sich entlang ihres Richtungsvektors auf die ruhende Kugel B zu.
	Ermittelt wird der Zeitpunkt t, an dem der Abstand der Mittelpunkte beider Kugeln gleich der Summe ihrer Radien(r1+r2) ist.

	1. Relative Position von A zu B bestimmen ; ab hier ist B' im Koordinatenursprung(0/0) und A' in relativer Position zu B
	   A' = B - A
	2. Bewegungsgerade von Kugel A mit der Veriablen t, dem Ortsvektor A' und dem Richtungsvektor v
	   A'(t) = A' + v*t
	3. Abstand in Abhängigkeit der Zeit t beider Kugelmittelpunkte somit:
	   AB(t) = A'(t)
	4. Die Länge des Abstandsvektors AB berechnet sich aus:
	   |AB|(t) = Wurzel( AB(t)² )
	5. Der Abstand in Abhängigkeit der Zeit wird gleich der Summe der Radien beider Kugeln gesetzt
	   |AB|(t) = r1+r2
	6. Durch Termumformungen ergibt sich eine quadratische Gleichung, die mit Hilfe der pq-Formel gelöst wird
	****************************************************************************************************************************/

	ABrel = ballB.pos.sub(this.pos);
	vCub = this.v.cub();
	q = ( ABrel.cub() - Math.pow( (this.r + ballB.r), 2) ) / vCub;
	p =  ( -2 * ( ABrel.dot(this.v) ) ) / vCub;
	pHalf = -1 * p / 2;
	wurzelTerm = Math.sqrt( Math.pow(pHalf, 2) - q );
	t = pHalf - wurzelTerm;

	return t;
}

// Kollisionserkennung von 2 beweglichen Kugeln
Ball.prototype.relColDetect = function(ballB) {
	/**********************************************************************************************************************
	Es wird der KollisionsZEITPUNKT t ermittelt.

	1. Anstatt die relativ aufwendige Kugelkollision von 2 sich bewegenden Kugeln zu ermitteln, wird ein Trick verwendet:
	
	   Der Koordinatenursprung wird auf die sich bewegende Kugel B gesetzt.
	   Der Orts- und Richtungsvektor von Kugel A wird somit in einen relativen Vektor zu B umgerechnet
	   A' = B - A
	   vA' = vB - vA

	2. Ermittlung des Zeitpunktes t durch Funktion colDetect für ruhende + bewegliche Kugel
	************************************************************************************************************************/

	posArel = this.pos.sub(ballB.pos);
	dirArel = this.v.sub(ballB.v);
	ballArel = new Ball(posArel, dirArel, 0);

	t = ballArel.colDetect(new Ball(new Vector(0,0), new Vector(0,0),0));
	return t;
}

Ball.prototype.showCol = function(ballB, t, ballANr) {
		var posNewA = this.pos.add( this.v.mult(t) );
		var colBallA = new Ball(posNewA, this.v, this.nr);

		// console.log(colBallA);
		// colBallA.draw();

		var posNewB = ballB.pos.add( ballB.v.mult(t) );
		var colBallB = new Ball(posNewB, ballB.v, ballB.nr);

		var vPush = posNewB.sub(posNewA);
		//colBallA.pos.drawLine(vPush, "lime");

		// var vPushL = vPush.abs();
		// console.log(vPushL);

		var vOrtho = vPush.rot90();
		//colBallA.pos.drawLine(vOrtho,"lime");

		var vDNorm = vOrtho.norm();
		var vNNorm = vPush.norm();
		// console.log("vDNorm: ", vDNorm);
		// console.log("vNNorm : ", vNNorm);

		var ballAVd = colBallA.v.dot(vDNorm);
		var ballAVn = colBallA.v.dot(vNNorm);
		// console.log("ballAVn :", this.v, ballAVn);

		var ballBVd = colBallB.v.dot(vDNorm);
		var ballBVn = colBallB.v.dot(vNNorm);

		var ballAVNew = vDNorm.mult(ballBVd).add( vNNorm.mult(ballAVn) );
		var ballBVNew = vDNorm.mult(ballAVd).add( vNNorm.mult(ballBVn) );

		// console.log("ballAVNew :", ballAVNew);


		colBallB.pos.drawLine(ballAVNew,"lime");
		colBallA.pos.drawLine(ballBVNew,"lime");


		//var vContact = posNewA.add(vPush.div(2));
		// vContact.drawLine(vOrtho,"lime");

		// vContact.drawLine(vPush.mult(2),"lime");

		//vOrtho = vOrtho.rot90().rot90();
		// vContact = posNewA.add(vPush.div(2));
		// vContact.drawLine(vOrtho,"lime");

					
		// docInfo.innerHTML = "";

}

// Geschwinidkeitsvektoren nach Kugel-Kugel Kollision berechnen
Ball.prototype.calcColBalls = function(ballB) {
		var vPush = ballB.pos.sub(this.pos);

		var vOrtho = vPush.rot90();

		var vDNorm = vOrtho.norm();
		var vNNorm = vPush.norm();

		var ballAVd = this.v.dot(vDNorm);
		var ballAVn = this.v.dot(vNNorm);

		var ballBVd = ballB.v.dot(vDNorm);
		var ballBVn = ballB.v.dot(vNNorm);

		var ballAVNew = vDNorm.mult(ballBVd).add( vNNorm.mult(ballAVn) ).mult(0.95);
		var ballBVNew = vDNorm.mult(ballAVd).add( vNNorm.mult(ballBVn) ).mult(0.95);

		// colBallB.pos.drawLine(ballAVNew,"lime");
		// colBallA.pos.drawLine(ballBVNew,"lime");

		this.v = ballBVNew;
		return ballAVNew;
}

Ball.prototype.calcColCushion = function(cushionA) {
	var cushionOrtho = cushionA.v.rot90();
	var vCNorm = cushionOrtho.norm();

	this.v = this.v.sub( vCNorm.mult(2 * this.v.dot(vCNorm) ).mult(0.9)  );
}

// Kugelposition nach Zeit t berechnen
Ball.prototype.getNewPos = function(t) {
	var posNewA = this.pos.add( this.v.mult(t));
	//posNewA.x = Math.round(posNewA.x);
	//posNewA.y = Math.round(posNewA.y);
	var colBallA = new Ball(posNewA, new Vector(0,0), this.nr, bRadius, 0 , 1);
	return colBallA;
}

Ball.prototype.showColCushion = function(cushionNr, t) {
		cushions[cushionNr].pos.drawLine(cushions[cushionNr].v, "lime");
		// console.log(cushionNr);
		
		// var posNewA = this.pos.add( this.v.mult(t) );
		// var colBallA = new Ball(posNewA, new Vector(0,0), this.nr);

		// console.log("Kollision mit ", cushionNr, ". Bande.");

		// posNewB = ballB.pos.add( ballB.v.mult(t) );
		// colBallB = new Ball(posNewB, new Vector(0,0), ballB.nr);


		// vPush = colBallB.pos.sub(posNewA);
		// vOrtho = vPush.rot90();
		// vContact = posNewA.add(vPush.div(2));
		// vContact.drawLine(vOrtho,"lime");

		// vContact.drawLine(vPush.mult(2),"lime");

		// vOrtho = vOrtho.rot90().rot90();
		// vContact = posNewA.add(vPush.div(2));
		// vContact.drawLine(vOrtho,"lime");

					
		docInfo.innerHTML = "";
}

Ball.prototype.drawPotted = function() {

}

// Pfeilspitze zeichnen an Ende des Richtungsvektors v2
Ball.prototype.drawArrow = function(color1, color2) {
	
	// Richtungsvektor um 90° drehen
	var vOrtho = this.v.rot90();

	// Gedrehten Vektor auf Länge 8 bringen
	vOrtho = vOrtho.div(vOrtho.abs()).mult(8);
	
	// Einheitsvektor von Richtungsvektor
	var vUnitDir = this.v.div(this.v.abs());

	// Länge des Pfeils durch Verkürzen des Richtungsvektors auf Länge = Kugeldurchmesser
	var vArrowDirSize = vUnitDir.mult(bDiameter);

	// Grundlinienmittelpunkt = Mitte der Basislinie des Pfeildreiecks durch Subtraktion der Länge des Pfeils von Position des Zielpunktes
	var vArrowBaseMid = this.aimTo.sub(vArrowDirSize)

	// Ecke 1 des Pfeildreiecks
	var vArrowVertice1 = vArrowBaseMid.add(vOrtho);
	
	// Ecke 2 des Pfeildreiecks
	var vArrowVertice2 = vArrowBaseMid.sub(vOrtho);

	// Punkt auf Richtungsvektor, der 0.5 Pixel außerhalb der Kugel startet
	var vPosNextTo = this.pos.add(vUnitDir.mult(bRadius+0.5));



	ctx.beginPath();
	ctx.moveTo(vPosNextTo.x, vPosNextTo.y);
	ctx.lineTo(vArrowBaseMid.x, vArrowBaseMid.y);
	ctx.lineTo(vArrowVertice1.x, vArrowVertice1.y);
	ctx.lineTo(this.aimTo.x, this.aimTo.y);
	ctx.lineTo(vArrowVertice2.x, vArrowVertice2.y);
	ctx.lineTo(vArrowBaseMid.x, vArrowBaseMid.y);

	
	ctx.fillStyle = color1;
	ctx.fill();
	ctx.strokeStyle = color2;
	ctx.stroke();

	
	ctx.beginPath();
  	ctx.arc(this.aimTo.x, this.aimTo.y, deltaDraw, 0, 2 * Math.PI, false);
  	// ctx.fillStyle = 'green';
  	// ctx.fill();
  	ctx.lineWidth = 1;
  	ctx.strokeStyle = '#DDDDDD';
  	ctx.stroke();
}

// User-Button "Stillstand" setzt Geschwindigkeit der aktuellen Kugel auf 0
function deleteVelocity(){
	balls[cursorMoves.ballNr].v = new Vector(0,0);
	docxDirNum.value = 0;
	docyDirNum.value = 0;
	drawBalls();
}