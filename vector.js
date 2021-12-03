// Vektor-Klasse mit Operatoren ----------------------------------------
function Vector(x,y) {
	this.x = x;
	this.y = y;
}

// Addition
Vector.prototype.add = function(v2) {
	var v = new Vector(	this.x + v2.x,
						this.y + v2.y);
	return v;
}

// Subtraktion
Vector.prototype.sub = function(v2) {
	var v = new Vector(	this.x - v2.x,
						this.y - v2.y);
	return v;
}

// Multiplikation mit Skalar
Vector.prototype.mult = function(a) {
	var v = new Vector(	this.x * a,
						this.y * a);
	return v;
}

// Division durch Skalar
Vector.prototype.div = function(a) {
	var v = new Vector(	this.x / a,
						this.y / a);
	return v;
}

// Betrag - rechenintensiv wegen Wurzel!
Vector.prototype.abs = function() {
    var a = Math.sqrt(this.x * this.x + this.y * this.y);
    return a;
}

// Normieren
Vector.prototype.norm = function() {
    var a = this.div(this.abs()); 
    return a;
}

// Skalarprodukt
Vector.prototype.dot = function(v2) {
	var a = this.x * v2.x + this.y * v2.y;
	return a;
}

// Skalarpdorukt mich sich selbst
Vector.prototype.cub = function() {
	var a = this.x * this.x + this.y * this.y;
	return a;
}	

// Kreuzprodukt (wahrscheinlich irrelevant in 2D)
Vector.prototype.cross = function(v2) {
	var a = this.x * v2.y - this.y * v2.x;
	return a;
}

// gleich
Vector.prototype.equal = function(v2) {
	if ( (this.x == v2.x) && (this.y == v2.y) )
		return true
	return false;
}

// größer oder gleich
Vector.prototype.greaterOrEequal = function(v2) {
	if ( (this.x >= v2.x) && (this.y >= v2.y))
		return true;
	return false
}

// größer
Vector.prototype.greater = function(v2) {
	if ( (this.x > v2.x) && (this.y > v2.y))
		return true;
	return false
}

// kleiner oder gleich
Vector.prototype.lessOrEequal = function(v2) {
	if ( (this.x <= v2.x) && (this.y <= v2.y))
		return true;
	return false
}

// kleiner
Vector.prototype.less = function(v2) {
	if ( (this.x < v2.x) && (this.y < v2.y))
		return true;
	return false

}


// Linie von Ortsvektor + Richtungsvektor der Länge des Richtungsvektors zeichnen
Vector.prototype.drawLine = function(v2, color) {
	
	//ctx.translate(0.5, 0.5);
	ctx.beginPath();
	ctx.moveTo(this.x, this.y);
	ctx.lineTo(this.x + v2.x, this.y + v2.y);
	ctx.strokeStyle = color;
	ctx.lineWidth = 1;
	ctx.stroke();
	//ctx.translate(-0.5, -0.5);
}



Vector.prototype.rot90 = function() {
	var v = new Vector( this.y,
						-this.x );
	return v;
}

// Rotation des Vektors um 270°
Vector.prototype.rot270 = function() {
	var v = new Vector( -this.y,
						this.x );
	return v;
}

// Maus-Position umrechnen in Canvas-Position
Vector.prototype.mouseInCanvas = function() {
	var mouseV = this.sub(new Vector(gameCanvas.offsetLeft, gameCanvas.offsetTop));

	// Maus einfangen, wenn außerhalb des Canvas
	if (mouseV.x <11) mouseV.x = 11;
	if (mouseV.x >812) mouseV.x = 812;
	
	if (mouseV.y <11) mouseV.y = 11;
	if (mouseV.y >412) mouseV.y = 412;
	
	this.x = mouseV.x;
	this.y = mouseV.y;
	
}

Vector.prototype.isInsideBall = function(v2) {
	if (this.sub(v2).abs() <= deltaDraw)
		return true;
	return false;
}

Vector.prototype.isInsideArrow = function(v2) {
	if (this.sub(v2).abs() <= 23)
		return true;
	return false;
}