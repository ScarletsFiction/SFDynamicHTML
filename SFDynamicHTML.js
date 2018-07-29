/*
	ScarletsFiction Dynamic HTML Library v1.0
	Dynamically change content of a html
	https://github.com/ScarletsFiction/SFIntercom
	
	Make sure you include this header on this script
*/

// html can be jQuery, DOM, or string
// ex <div {{$what}}>is {{$what}}</div>
// data = {what:value}
function SFDynamicHTML(html, data){
	var pattern = /{{(.*?)}}/g;

	if(html.constructor == HTMLDivElement)
		html = html.outerHTML;
	else if(html.jquery)
		html = html.html();

	return html.replace(pattern, function(whole, group){
		return data[group];
	});
}

// values = {ids:{href, html, src}}
function SFDynamicHTMLValue(attrName, values){
	var elemList = document.querySelectorAll('['+attrName+']');

	var getRelatedChildren = function(element){
		var result = [];
		var skipExclude = function(parent){
			var childs = parent.children;
			for (var i = 0; i < childs.length; i++) {
				if(childs[i].hasAttribute(attrName)){
					continue;
				}
				else if(childs[i].hasAttribute('sfpart')){
					result.push(childs[i]);
				}
				skipExclude(childs[i]);
			}
		}
		skipExclude(element);
		return result;
	}

	for (var i = 0; i < elemList.length; i++){
		var value = values[elemList[i].getAttribute(attrName)]; // Get the value reference for the ID
		if(!value) continue; // Skip the unchanged element

		var element = [elemList[i]];

		// Find child element that related to this ID
		var childs = getRelatedChildren(element[0]);
		element = element.concat(childs); // Merge it

		for (var a = 0; a < element.length; a++){
			var sfpart = element[a].getAttribute('sfpart');
			if(!sfpart) continue; // Dynamic part not found
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
						Blazy();
					}
				}

				else if(value[sfpart[z]]){ // Set attribute only
					element[a].setAttribute(sfpart[z], value[sfpart[z]]);
				}
			}
		}
	}
}
