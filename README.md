<a href="https://www.patreon.com/stefansarya"><img src="http://anisics.stream/assets/img/support-badge.png" height="20"></a>

[![Written by](https://img.shields.io/badge/Written%20by-ScarletsFiction-%231e87ff.svg)](LICENSE)
[![Software License](https://img.shields.io/badge/License-MIT-brightgreen.svg)](LICENSE)

# SFDynamicHTML
SFDynamicHTML is a library that allow you to dynamically load HTML content from client-side/browser.

This library was useful to lazily change DOM content.

## Sample Usage

```html
<div class="user-list">
    <user id="1">
        <a part="href">
            <img part="src">
            <span part="html"></span>
        </a>
    </user>

    <user id="2">
        <a part="href">
            <img part="src">
            <span part="html"></span>
        </a>
    </user>

    <user id="1">
        <a part="href">Visit first user</a>
    </user>
</div>

<script>
    SFDynamicHTML('user', {
        1:{
            html:"First",
            src:"https://upload.wikimedia.org/wikipedia/en/9/95/Test_image.jpg",
            href:"https://en.wikipedia.org/wiki/File:Test_image.jpg"
        },
        2:{
            html:"Second",
            src:"https://upload.wikimedia.org/wikipedia/en/9/95/Test_image.jpg",
            href:"https://en.wikipedia.org/wiki/File:Test_image.jpg"
        }
    }, document.querySelector('.user-list') || false)
</script>
```

## Contribution

If you want to help in SFDynamicHTML library
Please fork this project and edit on your repository, then make a pull request to here.

Keep the code simple and clear.

## License

SFDynamicHTML is under the MIT license.
But don't forget to put the a link to this repository.
