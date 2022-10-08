NEXT.create('dummy', {
    canExit: false,
});
NEXT.new('dummy','div')
    .innerHTML = `Welcome to NEXT UI Framework <span style="background: #999; border-radius: 3px;">${NEXT.variables.version}</span>!`

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