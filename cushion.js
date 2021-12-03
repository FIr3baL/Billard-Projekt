// Klasse Cushion: Bande definiert durch Ortsvektor und Richtungsvektor
function cushion(pos, v, nr){
	this.pos = new Vector(pos.x, pos.y);
	this.v = new Vector(v.x, v.y);	
	this.nr = nr;
}


// Kollisionserkennung Ball B gegen Bande
cushion.prototype.colDetect = function(ballB){
	/****************************************************************************************************************************
	Es wird der KollisionsZEITPUNKT t ermittelt.

	Die Kugel berührt die Bande, wenn der Mittelpunkt der Kugel sich im Abstand Kugelradius von der Bande befindet.

	1. Parallele zur Bande im orthogonalen Abstand r ziehen
	2. Schnittpunktszeitpunkt der Kugelmitelpunktsbewegung mit der Parallelen ermitteln
	******************************************************************************************************************************/

	var bandeOrtho = this.v.rot270();
	
	// var bandeOrthoBetrag = bandeOrtho.abs();
	
	// var bandeOrthoEinheits = bandeOrtho.div(bandeOrthoBetrag);
	var bandeOrthoNorm = bandeOrtho.norm();
	
	// falls die Bewegungsrichtung der Kugel von der Bande wegzeigt, also falls der Bewegungsanteil der othogonal auf der Bande steht positiv ist.
	if (ballB.v.dot(bandeOrthoNorm) >= 0) {
		// console.log("abbruch");
		return false;
	}


	var bandeOrthoRadius = bandeOrthoNorm.mult(ballB.r);



	//var radX = radY = ballB.r ;
	// if (bandeOrthoRadius.x < 0) radX = radX + 1;
	// if (bandeOrthoRadius.y < 0) radY = radY + 1;
		

	//bandeOrthoRadius.x = bandeOrthoEinheits.x * (radX);
	//bandeOrthoRadius.y = bandeOrthoEinheits.y * (radY);


	var Sd = this.pos.sub(ballB.pos).add(bandeOrthoRadius);

	var lambda = ( ballB.v.y*Sd.x - ballB.v.x*Sd.y ) /
				 ( ballB.v.x*this.v.y  - ballB.v.y*this.v.x);
	

	if ((lambda >= 0) && (lambda <= 1.0)) {
		var t1 = (Sd.x + this.v.x*lambda) / ballB.v.x;
		var t2 = (Sd.y + this.v.y*lambda) / ballB.v.y;
		if ( (t1 >= 0) && isFinite(t1) ) {
			return t1;
		} else if ( (t2 >= 0) && isFinite(t2) ){
			return t2;
		}
	}

	return false;
}


// Spezialfall: Bandenberührung auf der Ecke
cushion.prototype.colDetectVertices = function(ballB) {
	var vertices = new Array();
	vertices[0] = this.pos;
	vertices[1] = this.pos.add(this.v);

	var tLow = false;

	vertices.forEach(function(b, index, array) {
	//b = vertices[0];

		// var pHalf = ( (ball.pos.x - b.x)*ball.v.x + (ball.pos.y - b.y)*ball.v.y ) / (Math.pow(ball.pos.x,2) + Math.pow(ball.pos.y,2));
		// console.log("pHalf: ", pHalf);
		// var q = (Math.pow(ball.pos.x,2) + Math.pow(ball.pos.y,2) + Math.pow(b.x,2) + Math.pow(b.y,2) - 2*ball.pos.x*b.x - 2*ball.pos.y*b.y - Math.pow(deltaDraw,2)) / (Math.pow(ball.pos.x,2) + Math.pow(ball.pos.y,2));
		// var pCub = Math.pow(pHalf,2);
		// console.log("pCub: ", pCub);
		// console.log("q: ", q);
		// var wurzelterm = pCub - q;
		// console.log("Wurzelterm: ", wurzelterm);
		// t1 = -pHalf - Math.sqrt( wurzelterm);

		var pHalf = ( -b.x*ballB.v.x + ballB.pos.x*ballB.v.x - b.y*ballB.v.y + ballB.pos.y*ballB.v.y  ) / ( Math.pow(ballB.v.x,2)+ Math.pow(ballB.v.y,2));
		var q = (Math.pow(ballB.pos.x,2) + Math.pow(ballB.pos.y,2) + Math.pow(b.x,2) + Math.pow(b.y,2) + 2*( -b.x*ballB.pos.x - b.y * ballB.pos.y) - Math.pow(deltaDraw,2)) / ( Math.pow(ballB.v.x,2) + Math.pow(ballB.v.y,2));

		var pCub = Math.pow(pHalf,2);
		// console.log("pCub: ", pCub);
		// console.log("q: ", q);
		
		var wurzelterm = pCub - q;
		// console.log("Wurzelterm: ", wurzelterm);
		
		var t1 = -pHalf - Math.sqrt( wurzelterm);
		
		// console.log("t1: ", t1);
		if (t1 >= 0) {
	//		return t1;
			if (tLow === false) {
				tLow = t1;
			} else if (t1 < tLow) {
				tLow = t1;
			}
		}

	});
	if (isFinite(tLow)) {
		return tLow;
	}
	return false;

	
}