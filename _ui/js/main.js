$(document).ready(function(){

	// Play Song
	var song  = document.getElementById("song_original");
	var song2 = document.getElementById("song_techno");
	
	function play(){
		song.currentTime  = 7.8;
		song2.currentTime = 23.7;
		song.play();
	}
	setTimeout(play, 1000);
	
	$()


	// Amount, Width, ClassName, angleX
	var unicorns = new Piece(12,186,'unicorn');
	var pole     = new Piece(15,10,'pole'); 
	var circle   = new Piece(18,112,'roof',50); 
	var floor    = new Piece(15,112,'floor',95); 

	$('.unicorn').css({backgroundColor : "transparent"});

	var i = 0, k = 0, g = 0, speed = .5;


	function startCarousel(){
		$('#carousel').css({
			"-webkit-transform" : "rotateY(" + i + "deg)"
		});


		i -= speed;
		g += .004;
	}
	function unicornBounce(){
		$('.unicorn').each(function(){
			var	index = $(this).index();
				$(this).css({
					top: Math.sin((k * .4) + index * 2) * 40 + 250
				});
		});

		k += 0.1;
	}


	function epilepsyStart(){
		$('body').css({backgroundColor : "rgb(" + rand(255) + "," + rand(255) + "," + rand(255) + ")"});
	}
	

	setInterval(startCarousel, 30);
	setInterval(unicornBounce, 10);



	var speedInput = $('#speed');
	speedInput.change(function(){
		speed = $(this).val();
	});

	var width = $('#width');
	width.change(function(){
		floor.adjust($(this).val(), floor.angleX);
	});

	var height = $('#height');
	height.change(function(){
		$('.floor').css({height : $(this).val() + '%'});
	});

	var topcontrol = $('#top');
	topcontrol.change(function(){
		$('.floor').css({top : $(this).val() + '%'});
	});

	var color = $('#color');
	color.click(function(){
		$('.floor').css({backgroundColor : "rgb(" + rand(255) + "," + rand(255) + "," + rand(255) + ")"});
		$('.roof').css({backgroundColor : "rgb(" + rand(255) + "," + rand(255) + "," + rand(255) + ")"});
	});

	var bodyColor = $('#bodyColor');
	bodyColor.click(function(){
		$('body').css({backgroundColor : "rgb(" + rand(255) + "," + rand(255) + "," + rand(255) + ")"});
	});

	var epilepsy = $('#epilepsy');
	epilepsy.click(function(){
		$('body').css({"-webkit-transition" : "none"});
		setInterval(epilepsyStart, 85);
		speed = 7;
		speedInput.val(7);
		song.pause();
		song2.play();
	});

	var angle = $('#angle');
	angle.change(function(){
		floor.adjust(width.val(), $(this).val());
	});

});



/*********************/
// Helper Functions \\
/*********************/

// Generate random number
function rand(range){
	var num = Math.floor(Math.random() * range);
	return num;
}

/******************/
// Build 3D object 
/******************/

function Piece(amount,width,tag,angleX){
	this.carousel = $('#carousel');
	this.setValues(amount,width,tag,angleX);
	this.build();
	this.transform();
}

Piece.prototype.setValues = function(amount,width,tag,angleX){
	this.pieces    = amount; 
	this.width     = width;
	this.angle     = 360 / this.pieces;
	this.angleX    = (angleX == undefined) ? 0 : angleX;
	this.translate = Math.round((this.width / 2) / Math.tan(Math.PI / this.pieces));
	this.offset    = (this.carousel.width() / 2) - (this.width / 2);
	this.tag       = tag;
}

// Put Sphere on page
Piece.prototype.build = function(){
	for(j=0; j<this.pieces; j++){
		var el = '<figure class="' + this.tag + '" />';
		$(el).appendTo('#carousel');
	}
};

// Adjust panel angles
Piece.prototype.adjust = function(width, angleX){
	this.setValues(this.pieces,width,this.tag,angleX);
	this.transform();
};

// Apply tranformations
Piece.prototype.transform = function(){
	var figure = $('figure.' + this.tag);
	var freq   = .5;
	var amp    = 128;
	for(j=0; j<this.pieces; j++){
		var red   = Math.floor(Math.sin(freq*j)*amp+amp);
		var green = Math.floor(Math.sin(freq*j + 2)*amp+amp);
		var blue  = Math.floor(Math.sin(freq*j + 4)*amp+amp);
		var rgb   = "rgb(" + red + "," + green + "," + blue + ")";
		figure.eq(j).css({
			"-webkit-transform" : "rotateY(" + j * this.angle + "deg) translateZ(" + this.translate + "px) rotateX(" + this.angleX + "deg)",
			width: this.width,
			left: this.offset,
			backgroundColor: rgb
		});	
	}
};









