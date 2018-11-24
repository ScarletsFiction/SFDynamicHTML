/*
	ScarletsFiction Dynamic HTML Library v1.0
	Dynamically change content of a html
	https://github.com/ScarletsFiction/SFIntercom
	
	Make sure you include this header on this script
*/
'use strict';

// values = {ids:{href, html, src}}
function SFDynamicHTML(tagName, values, target){
	var elemList = (target ? target : document).querySelectorAll(tagName);
	tagName = [tagName.toUpperCase()];

	var getRelatedChildren = function(element, skip){
		var result = [];
		var skipExclude = function(parent){
			var childs = parent.children;
			for (var i = 0; i < childs.length; i++) {
				if(skip.indexOf(childs[i].tagName) !== -1 || !childs[i].hasAttribute('part'))
					continue;

				result.push(childs[i]);
				skipExclude(childs[i]);
			}
		}
		skipExclude(element);
		return result;
	}

	for (var i = 0; i < elemList.length; i++){
		var value = values[elemList[i].id]; // Get the value reference for the ID
		if(!value) continue; // Skip the unchanged element

		var skip = elemList[i].hasAttribute('skip') ? elemList[i].attribute['skip'].value.split(' ').join('').split(',') : [];

		// Find child element that related to this ID
		var element = getRelatedChildren(elemList[i], tagName.concat(skip));

		for (var a = 0; a < element.length; a++){
			var sfpart = element[a].getAttribute('part');
			sfpart = sfpart.split(' ').join('').split(',');

			for (var z = 0; z < sfpart.length; z++) {
				if(sfpart[z].indexOf('html')!=-1){
					var pattern = sfpart[z].split('->'); // ex (*) will be (text)
					pattern = pattern.length != 1 ? pattern[1] : false;

					element[a].innerHTML = pattern ? pattern.split('*').join(value.html) : value.html;
				}

				else if(sfpart[z].indexOf('src')!=-1){
					element[a].setAttribute('src', value.src);

					// If using Blazy for loading image
					if(element[a].classList.contains('b-lazy')){
						element[a].classList.remove('b-error');
						element[a].setAttribute('data-src', value.src);
						element[a].setAttribute('src', 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=');
					}
				}

				else if(value[sfpart[z]]){ // Set attribute only
					element[a].setAttribute(sfpart[z], value[sfpart[z]]);
				}
			}
		}
	}
}