/*
*	GA - Single Page Track v0.1
*	
*	author: Gabriel Almeida
*	description: 
*
*/


var spt = (function(){
	'use strict'; 

	//variável que recebe o objeto com os parametros 
	var app = {}; 
	
	var tools = {
		
		//retorna um objeto com as propriedades de começo e fim da section
		getSectionProperties: function(element) {
			
			var element = document.getElementById(element); 
			//debugger
			var properties = {
				begin: element.offsetTop,
				end: element.offsetTop + element.offsetHeight
			}

			return properties; 
		},

		//adiciona o ponto de começo e final da section em cada uma
		addSectionSizes: function() {
			if (app.hasOwnProperty("pages") 
				&& Object.keys(app.pages).length > 0) {
				for (var page in app.pages) {
					if (app.pages[page].hasOwnProperty("element")) {
						var props = this.getSectionProperties(app.pages[page].element); 
						app.pages[page].begin = props.begin; 
						app.pages[page].end = props.end; 
					}
				}
			}
		},

		setHomeReference: function() {
			
			var smaller = ""; 
			
			for (var section in app.pages) {
				var current = app.pages[section]; 

				if (smaller == "") {
					smaller = current.begin; 
				} else {
					if (smaller > current.begin) {
						smaller = current.begin; 
					}
				}
			}


			app.pages.home = {
				element: " ", 
				begin: 0, 
				end: smaller,
				pageview: {
					allow: false,
					status: false
				}
			} 

			return true; 
		},

		executeOnCurrentSection: function() {

			//posição da janela
			var wposition = document.body.scrollTop; 
		
			//pega o offset da janela
			for (var section in app.pages) {
				
				var current = app.pages[section]; 
				if (wposition > current.begin && wposition < current.end) {

					history.replaceState(null, null, current.element.trim() == "" ? " " : "#"+current.element);
					
					if (app.config.trackAllPages) {
						if (!current.pageview.status) {
							ga('send', 'pageview', { 'page': location.pathname + location.hash});
							console.log(location.pathname + location.hash);
							console.log("tracked");
						}
					} else {
						if (current.pageview.allow && !current.pageview.status){
							ga('send', 'pageview', { 'page': location.pathname + location.hash});
							current.pageview.status = true; 
							console.log(location.pathname + location.hash);
							console.log("tracked");
						}
					}
					break; 
				}

				if (wposition < app.homeSize) {
					history.replaceState(null, null, "#"+current.element);
				}
			}

			return true; 
		}


	}; 	

	var actions = {
		start: function() {
			window.addEventListener("scroll", function() {
				tools.executeOnCurrentSection(); 
			}); 
		},
	}

	return {
		init: function (obj) {
			app = obj; 

			tools.addSectionSizes(); 
			tools.setHomeReference(); 

			console.log(app); 
			
			actions.start(); 
		},
	}
})(window, document);