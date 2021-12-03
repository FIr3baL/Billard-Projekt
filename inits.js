function initBalls() {
	// beinhaltet alle Bälle
	balls = new Array();

	// weiße Kugel
	balls[0] = new Ball( new Vector(474.5,254.5), new Vector(-87,-13), 0);

	// Gelbe Kugel
	balls[1] = new Ball( new Vector(212.5,217.5), new Vector(0,0), 1);

	// blaue Kugel
	balls[2] = new Ball( new Vector(191.5,205.5), new Vector(0,0), 2);

	// rote Kugel
	balls[3] = new Ball( new Vector(191.5,229.5), new Vector(0,0), 3);

	// Lila Kugel
	balls[4] = new Ball( new Vector(170.5,192.5), new Vector(0,0), 4);

	// Orangene Kugel
	balls[5] = new Ball( new Vector(170.5,242.5), new Vector(0,0), 5);

	// Grüne Kugel
	balls[6] = new Ball( new Vector(149.5,205.5), new Vector(0,0), 6);

	// Weinrote Kugel
	balls[7] = new Ball( new Vector(149.5,229.5), new Vector(0,0), 7);

	// schwarze Kugel
	balls[8] = new Ball( new Vector(128.5,217.5), new Vector(0,0), 8);

	// Kugel 9
	balls[9] = new Ball( new Vector(170.5,217.5), new Vector(0,0), 9);


	ballsInGame = balls.length;

}

function initPockets() {
	pockets = new Array();

	// Ecktaschen
	pockets.push(new Ball(new Vector(-6,-1),0,0, 37));
	pockets.push(new Ball(new Vector(pg.width+5, -1 ), 0, 0, 37));
	pockets.push(new Ball(new Vector(pg.width+5, pg.height), 0, 0, 37));
	pockets.push(new Ball(new Vector(-6, pg.height), 0, 0, 37));

	// Mitteltaschen
	pockets.push(new Ball(new Vector(411.5, -33), 0, 0, 46));
	pockets.push(new Ball(new Vector(411.5, pg.height+32), 0, 0, 46));
}
function initCushions() {
	cushions = new Array();

	
	// Tasche Oben-Links Rechts
	cushions[0] = new cushion( new Vector(31,5), new Vector(17,12), 0);
	// Oben waagerecht links
	cushions[1] = new cushion( new Vector(48,17), new Vector(335,0), 1);
	// Oben Mittelloch links
	cushions[2] = new cushion( new Vector(383,17), new Vector(4,-12), 2);
	// Oben Mittelloch rechts
	cushions[3] = new cushion( new Vector(437,5), new Vector(4, 12), 3);
	// Oben waagerecht rechts
	cushions[4] = new cushion( new Vector(441,17), new Vector(335,0), 4);
	// Rechte Bande 
	cushions[5] = new cushion( new Vector(812,53), new Vector(0, 328), 5);
	// Unten waagerecht links
	cushions[6] = new cushion( new Vector(383,417), new Vector(-335,0), 6);
	//cushions[6] = new cushion( new Vector(383,434), new Vector(-335,0), 6);
	cushions[6].pos.drawLine(cushions[6].v, "red");
	// Unten waagerecht rechts
	cushions[7] = new cushion( new Vector(776,417), new Vector(-335,0), 7);
	// Linke Bande 
	cushions[8] = new cushion( new Vector(12,381), new Vector(0, -328), 8);


	// Tasche Oben-Links Links
	cushions[9] = new cushion( new Vector(12,53), new Vector(-12,-17), 9);
	
	// Tasche Unten-Rechts Rechts
	cushions[10] = new cushion( new Vector(812,381), new Vector(12,17), 10);
	
	// Tasche Unten-Rechts Links
	cushions[11] = new cushion( new Vector(793,429), new Vector(-17,-12), 11);
	
	// Tasche Unten-Links Rechts
	cushions[12] = new cushion( new Vector(48,417), new Vector(- 17, 12), 12);
	
	// Tasche Unten-Links Links
	cushions[13] = new cushion( new Vector(0,398), new Vector(12, -17), 13);
			
	// Tasche Oben-Rechts Links
	cushions[14] = new cushion( new Vector(776,17), new Vector(17, -12), 14);

	// Tasche Oben-Rechts Rechts
	cushions[15] = new cushion( new Vector(824,36), new Vector(-12, 17), 15);

	// Mittelloch unten Rechts
	cushions[16] = new cushion( new Vector(441,417), new Vector(-4, 12), 16);

	// Mittelloch unten Links
	cushions[17] = new cushion( new Vector(387,429), new Vector(-4, -12), 17);



	// // Triangle
	// cushions[18] = new cushion( new Vector(118,131), new Vector(0, 162), 18);
	// cushions[19] = new cushion( new Vector(233,212), new Vector(-115, -81), 19);
	// cushions[20] = new cushion( new Vector(118,293), new Vector(115, -81), 20);


	// // Queue
	// cushions[21] = new cushion( new Vector(493,251), new Vector(-1, 4), 21);
	// cushions[22] = new cushion( new Vector(492,255), new Vector(350, 50), 22);
	// cushions[23] = new cushion( new Vector(842,305), new Vector(4, -12), 23);
	// cushions[24] = new cushion( new Vector(846,293), new Vector(-353, -42), 24);




	// cushions[18] = new cushion( new Vector(100,100), new Vector(200,0), 18);

	// cushions[19] = new cushion( new Vector(20,300), new Vector(0,-260), 19);

}