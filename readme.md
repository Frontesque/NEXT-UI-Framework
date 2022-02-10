# NEXT UI Framework

### About
This is a simple framework aimed at making UI development easy for scripts that you inject into other web pages (ex: game cheats)

### Install
Copy the [latest version](https://raw.githubusercontent.com/Frontesque/NEXT-UI-Framework/main/latest.js) to the top of your JavaScript program

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
- background: string
- draggable: boolean (BETA 1.3 ONLY)
