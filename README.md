# quick-marquee

## example

https://shoji-kumanote.github.io/quick-marquee/

## install

- copy `dist/quick-marquee.min.js` into your projects.

## usage

```html
<html>
<head>
<script src="/path/to/quick-marquee.min.js" defer></script>
<script src="script.js" defer></script>
<link rel="stylesheet" href="style.css">
<body>

<div class="container">
  <div>item</div>
  <div>item</div>
  <div>item</div>
  <div>item</div>
</div>

</body>
</html>
```

```css
/* style.css */

.container {
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
}

.container > * {
  flex-shrink: 0;
}
```

```javascript
/* script.js */

new QuickMarquee(".container", {
  pixelsPerFrame: 0.5,
}).start();
```
