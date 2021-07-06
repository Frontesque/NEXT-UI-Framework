const NEXT = {

    variables: {
        "version": "1.0",
        "objectPrefix": "NEXT-",
        "titleBarSuffix": "-TITLE",
        "logPrefix": "[NEXT Framework]",
        "errorPrefix": "(ERROR)"
    },

    frameworks: {
        dragElement: function(e){function n(e){e=e||window.event,e.preventDefault(),d=e.clientX,m=e.clientY,document.onmouseup=o,document.onmousemove=t}function t(n){n=n||window.event,n.preventDefault(),u=d-n.clientX,l=m-n.clientY,d=n.clientX,m=n.clientY,e.style.top=e.offsetTop-l+"px",e.style.left=e.offsetLeft-u+"px"}function o(){document.onmouseup=null,document.onmousemove=null}var u=0,l=0,d=0,m=0;document.getElementById(e.id+"header")?document.getElementById(e.id+"header").onmousedown=n:e.onmousedown=n}
    },

    log: function(text, err) {
        if (err === true) {
            console.error(this.variables.logPrefix, this.variables.errorPrefix, text);
        } else {
            console.info(this.variables.logPrefix, text);
        }
    },

    create: function(windowName,width,height) {
        //Set Up Title Bar
        const title = document.createElement('div');
        title.style.zIndex = "1000";
        title.style.position = "absolute";
        title.innerHTML = windowName
        title.style['font-family'] = "Arial, Helvetica, sans-serif";
        title.style.color = "white";
        title.id = this.variables.objectPrefix+windowName+this.variables.titleBarSuffix;
        title.style.width = width ? width+"px" : "250px";
        title.style.height = "20px";
        title.style.background = "#333";
        title.style.borderRadius = "5px 5px 0 0";
        title.style.boxShadow = "0 0 5px black";
        this.frameworks.dragElement(title)

        //Set Up Close Window
        const close = document.createElement('div');
        close.innerHTML = "x";
        close.style['font-family'] = "Arial, Helvetica, sans-serif";
        close.style.position = "absolute";
        close.style.top = "-1px"
        close.style.right = "5px"
        close.style.cursor = "pointer";
        close.style.color = "#ff5566";
        title.append(close);

        close.onclick = function() {
            title.remove();
        }

        //Set Up Window
        const window = document.createElement('div');
        title.style.zIndex = "999";
        window.style.width = width ? width+"px" : "250px";
        window.style.height = height ? height+"px" : "150px";
        window.style.background = "#555";
        window.style.borderRadius = "0 0 5px 5px";
        window.style.boxShadow = "0 0 5px black";
        window.style.overflow = "hidden";
        title.append(window)

        //Set Up User Window
        const userWindow = document.createElement('div');
        window.id = this.variables.objectPrefix+windowName;
        window.append(userWindow)

        document.body.append(title)
        this.log("Created Window: "+windowName);
    },

    new: function(windowName, objectType) {
        const object = document.createElement(objectType);
        this.get(windowName).append(object);
        return object;
    },

    get: function(windowName) {
        const window = document.getElementById(this.variables.objectPrefix+windowName);
        if (window) {
            return window;
        } else {
            return this.log("Error finding window '"+windowName+"'.", true);
        }
    },

    close: function(windowName) {
        const windowTitle = document.getElementById(this.variables.objectPrefix+windowName+this.variables.titleBarSuffix);
        if (windowTitle) {
            windowTitle.remove();
            this.log("Closed Window: "+windowName);
        } else {
            return this.log("Error closing window '"+windowName+"'. Window not found.", true);
        }
    },

}
