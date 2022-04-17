# NEXT UI Framework

### About
This is a simple framework aimed at making UI development easy for scripts that you inject into other web pages (ex: game cheats)

### Install
Copy the [latest version](https://raw.githubusercontent.com/Frontesque/NEXT-UI-Framework/main/latest.js) to the top of your JavaScript program

You can also automatically load the script with this code:
```js
(function(t,e){let a=t.createElement("script");a.type="text/javascript",a.onload=function(){
    // NUXT is injected here
},a.src="https://frontesque.github.io/NEXT-UI-Framework/latest.js",t.getElementsByTagName("head")[0].appendChild(a)})(document);
```

### Example
```js
NEXT.create('dummy', {
	canExit: false,
});
NEXT.new('dummy','p').innerHTML = "Welcome to the NEXT UI Framework!"

const mainWindow = NEXT.create('main', {
	title: 'NEXT Framework Example',
	width: 350,
	height: 225,
	canExit: true,
});
mainWindow.style.padding = "0.5em";

const toggleButton = NEXT.new('main','button');
toggleButton.innerHTML = "Click To Toggle Window Visibility";
toggleButton.onclick = () => {
    NEXT.toggle('dummy');
}
```

## Documentation
### NEXT.create
- title: string
- canExit: boolean
- width: integer
- height: integer
- background: string (HEX)
- titleBackground: string (HEX)
- draggable: boolean (BETA 1.3 ONLY)
