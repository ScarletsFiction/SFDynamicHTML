/*
	SFDynamicHTML
	Dynamically/Asynchronously change DOM content
	https://github.com/ScarletsFiction/SFDynamicHTML
	
	Make sure you include this header on this script
*/
'use strict';

// values = {id:{href, html, src}}
function SFDynamicHTML(tagName, values, target){
	// Add to pending element
	if(typeof tagName !== 'string'){
		var name = tagName.tagName;

		if(SFDynamicHTML.pending[name] === undefined)
			name = SFDynamicHTML.pending[name] = {};
		else name = SFDynamicHTML.pending[name];

		if(name[tagName.id] === undefined)
			name[tagName.id] = [tagName];
		else name[tagName.id].push(tagName);

		return;
	}

	function getRelatedChildren(element){
		var result = [];
		var skipExclude = function(parent){
			var childs = parent.children;
			for (var i = 0; i < childs.length; i++) {
				if(childs[i].classList.contains(SFDynamicHTML.attributes.skip))
					continue;

				if(childs[i].hasAttribute(SFDynamicHTML.attributes.part))
					result.push(childs[i]);

				skipExclude(childs[i]);
			}
		}
		skipExclude(element);
		return result;
	}

	// Check any pending element
	if(SFDynamicHTML.pending[name] !== undefined){
		var temp = SFDynamicHTML.pending[name];
		for(var id in values){
			// Apply to all element for this ID
			for (var i = 0; i < temp[id].length; i++) {
				// Find child element that need to be modified and related to this ID
				var element = getRelatedChildren(temp[id][i]);

				for (var a = 0; a < element.length; a++){
					var sfpart = element[a].getAttribute(SFDynamicHTML.attributes.part);

					// Call handler
					if(SFDynamicHTML.processing[sfpart] !== undefined)
						SFDynamicHTML.processing[sfpart](element[a], values[id]);
				}
			}

			delete temp[id];
		}

		// Skip DOM check
		if(target === null) return;
	}

	// Build query
	var query = false;
	var initial = tagName+'#';
	for(var id in values){
		if(query === false){
			query = initial + CSS.escape(id);
			continue;
		}

		query += ',' + initial + CSS.escape(id);
	}

	// DOM Check
	var elemList = (target || document).querySelectorAll(query);

	for (var i = 0; i < elemList.length; i++){
		// Get the value reference for the ID
		var value = values[elemList[i].id];

		// Find child element that need to be modified and related to this ID
		var element = getRelatedChildren(elemList[i]);

		for (var a = 0; a < element.length; a++){
			var sfpart = element[a].getAttribute(SFDynamicHTML.attributes.part);

			// Call handler
			if(SFDynamicHTML.processing[sfpart] !== undefined)
				SFDynamicHTML.processing[sfpart](element[a], value);
		}
	}
}

SFDynamicHTML.pending = {};
SFDynamicHTML.attributes = {
	skip:'sf-skip', // class
	part:'sf-part'
};

(function(){
	function imageLoaded(){
		this.classList.add('lazy-img-loaded');
		this.onerror = this.onload = null;
	}

	SFDynamicHTML.processing = {
		html:function(element, value){
			var pattern = element.getAttribute('pattern'); // ex: `*` will be `text`

			if(pattern)
				element.innerText = pattern.split('*').join(value.html);
			else element.innerText = value.html;
		},
		src:function(element, value){
			element.setAttribute('src', value.src);
		},
		lazyImg:function(element, value){
			// Lazy loading image
			element.classList.add('lazy-img');
			element.classList.remove('lazy-img-loaded');
			element.onerror = element.onload = imageLoaded;
			element.setAttribute('src', value.src);
		}
	};
})();