const NEXT = {

    variables: {
        version: "1.4",
        objectPrefix: "NEXT-",
        titleBarSuffix: "-TITLE",
        logPrefix: "[NEXT Framework]",
        errorPrefix: "(ERROR)",

        isInit: false
    },

    frameworks: {
        dragElement: function(e){function n(e){e=e||window.event,e.preventDefault(),d=e.clientX,m=e.clientY,document.onmouseup=o,document.onmousemove=t}function t(n){n=n||window.event,n.preventDefault(),u=d-n.clientX,l=m-n.clientY,d=n.clientX,m=n.clientY,e.style.top=e.offsetTop-l+"px",e.style.left=e.offsetLeft-u+"px"}function o(){document.onmouseup=null,document.onmousemove=null}var u=0,l=0,d=0,m=0;document.getElementById(e.id+"header")?document.getElementById(e.id+"header").onmousedown=n:e.onmousedown=n}
    },

    log(text, err) {
        if (err === true) {
            console.error(this.variables.logPrefix, this.variables.errorPrefix, text);
        } else {
            console.info(this.variables.logPrefix, text);
        }
    },

    create(windowName, options) {

        this.init();

        //Set Up Title Bar
        const title = document.createElement('div');
        if(options.draggable != false) {
            this.frameworks.dragElement(title)
        }

        title.className += "NUXT-Title NUXT-Border";
        title.innerHTML = options.title || windowName;
        title.id = this.variables.objectPrefix+windowName+this.variables.titleBarSuffix;
        title.style.width = options.width ? options.width+"px" : "250px";
        title.style.background = options.titleBackground || "#333";

        //Set Up Close Window
        const close = document.createElement('div');
        close.innerHTML = "x";
        close.className += "NUXT-Close";
        title.append(close);

        close.onclick = function() {
            title.remove();
        }
        if (options.canExit == false) {
            close.style.display = "none";
        }

        //Set Up Window
        const window = document.createElement('div');
        window.style.width = options.width ? options.width+"px" : "248px";
        window.style.height = options.height ? options.height+"px" : "150px";
        window.style.background = options.background || "#555";
        window.className += "NUXT-BodyMain NUXT-Border";
        title.append(window)

        //Set Up User Window
        const userWindow = document.createElement('div');
        userWindow.id = this.variables.objectPrefix+windowName;
        window.append(userWindow)

        document.body.append(title)
        this.log("Created Window: "+windowName);
        return userWindow;
    },

    new(windowName, objectType) {
        const object = document.createElement(objectType);
        this.get(windowName).append(object);
        return object;
    },

    get(windowName) {
        const window = document.getElementById(this.variables.objectPrefix+windowName);
        if (window) {
            return window;
        } else {
            return this.log("Error finding window '"+windowName+"'.", true);
        }
    },
    
    getRaw(windowName) {
        const raw = document.getElementById(this.variables.objectPrefix+windowName+this.variables.titleBarSuffix);
        if (raw) {
            return raw;
        } else {
            return this.log("Error finding window '"+windowName+"'.", true);
        }
    },

    toggle(windowName) {
        const windowTitle = document.getElementById(this.variables.objectPrefix+windowName+this.variables.titleBarSuffix);
        if (windowTitle) {
            if (windowTitle.style.visibility == "visible") {
                windowTitle.style.visibility = "hidden";
                this.log("Toggle- Window Hidden: "+windowName);
            } else {
                windowTitle.style.visibility = "visible";
                this.log("Toggle- Window Shown: "+windowName);
            }
        } else {
            return this.log("Error showing window '"+windowName+"'. Window not found.", true);
        }
    },

    show(windowName) {
        const windowTitle = document.getElementById(this.variables.objectPrefix+windowName+this.variables.titleBarSuffix);
        if (windowTitle) {
            windowTitle.style.visibility = "visible";
            this.log("Window Shown: "+windowName);
        } else {
            return this.log("Error showing window '"+windowName+"'. Window not found.", true);
        }
    },

    hide(windowName) {
        const windowTitle = document.getElementById(this.variables.objectPrefix+windowName+this.variables.titleBarSuffix);
        if (windowTitle) {
            windowTitle.style.visibility = "hidden";
            this.log("Window Hidden: "+windowName);
        } else {
            return this.log("Error hiding window '"+windowName+"'. Window not found.", true);
        }
    },

    close(windowName) {
        const windowTitle = document.getElementById(this.variables.objectPrefix+windowName+this.variables.titleBarSuffix);
        if (windowTitle) {
            windowTitle.remove();
            this.log("Closed Window: "+windowName);
        } else {
            return this.log("Error closing window '"+windowName+"'. Window not found.", true);
        }
    },
    
    css(style) {
        var styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = style;
        document.head.appendChild(styleSheet);
        return styleSheet;
    },

    init() {
        if (this.variables.isInit == true) return;
        //---   Create Dependant CSS   ---//
        this.css(`
        .NUXT-Title {
            z-index: 1000;
            position: absolute;
            font-family: Arial, Helvetica, sans-serif;
            color: white;
            height: 30px;
            border-radius: 5px 5px 0 0;
            padding: 5px 0 0 10px;
            box-sizing: border-box;
            border-bottom: none !important;
        }

        .NUXT-BodyMain {
            transform: translate(-11px, 4px);
            z-index: 999;
            border-radius: 0 0 5px 5px;
            overflow: hidden;
            border-top: none !important;
        }

        .NUXT-Close {
            font-family: Arial, Helvetica, sans-serif;
            position: absolute;
            top: 3px;
            right: 7px;
            cursor: pointer;
            color: #ff5566;
        }

        .NUXT-Border {
            border: 1px solid rgba(255, 255, 255, 0.3);
        }
        `);

        this.variables.isInit = true;
    }

}
