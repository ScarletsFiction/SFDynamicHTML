<a href="https://www.patreon.com/stefansarya"><img src="http://anisics.stream/assets/img/support-badge.png" height="20"></a>

[![Writed by](https://img.shields.io/badge/Writed%20by-ScarletsFiction-%231e87ff.svg)](LICENSE)
[![Software License](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)

# SFDynamicHTML
SFDynamicHTML is a library that allow you to dynamically change HTML content from client-side/browser.

This library was useful to serve web content without refresing user browser.

## Sample Usage

```
<div class="my-content">
	This <div id="{{$what}}" {{$attr1}}>is {{$what}}</div>
</div>

<script>
	var content = $('.my-content');
	content.html(''); // Clear the html

	content.append(
		SFDynamicHTML(content, {
			what:"second",
			attr1:"disabled"
		})
	);
	content.prepend(
		SFDynamicHTML(content, {
			what:"first",
			attr1:"enabled"
		})
	);
</script>
```

```
<ul class="user-list">
	<li>
		<p changeID="1" sfpart="html"></p>
		<a changeID="1" sfpart="href">
			<img changeID="1" sfpart="src"></img>
		</a>
	</li>
	<li changeID="2">
		<p sfpart="html"></p>
		<a sfpart="href">
			<img sfpart="src"></img>
		</a>
	</li>
	<li changeID="3">
		<p sfpart="html"></p>
		<a changeID="2" sfpart="href">
			<img sfpart="src"></img>
		</a>
	</li>
</ul>

<script>
	SFDynamicHTMLValue('changeID', {
		1:{
			html:"First",
			src:"https://upload.wikimedia.org/wikipedia/en/9/95/Test_image.jpg",
			href:"https://en.wikipedia.org/wiki/File:Test_image.jpg"
		},
		2:{
			html:"Second",
			src:"https://upload.wikimedia.org/wikipedia/en/9/95/Test_image.jpg",
			href:"https://en.wikipedia.org/wiki/File:Test_image.jpg"
		},
		3:{
			html:"Third"
		}
	})
</script>
```

## Contribution

If you want to help in SFDynamicHTML library
Please fork this project and edit on your repository, then make a pull request to here.

Keep the code simple and clear.

## License

SFDynamicHTML is under the MIT license.
But don't forget to put the a link to this repository.
