const NEXT = {

    variables: {
        version: "1.5",
        objectPrefix: "NEXT-",
        titleBarSuffix: "-TITLE",
        containerSuffix: "-CONTAINER",
        logPrefix: "[NEXT Framework]",
        errorPrefix: "(ERROR)",

        isInit: false
    },

    frameworks: {
        dragElement(elmnt,header) {
            var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            header.onmousedown = dragMouseDown;
          
            function dragMouseDown(e) {
              e = e || window.event;
              e.preventDefault();
              // get the mouse cursor position at startup:
              pos3 = e.clientX;
              pos4 = e.clientY;
              document.onmouseup = closeDragElement;
              // call a function whenever the cursor moves:
              document.onmousemove = elementDrag;
            }
          
            function elementDrag(e) {
              e = e || window.event;
              e.preventDefault();
              // calculate the new cursor position:
              pos1 = pos3 - e.clientX;
              pos2 = pos4 - e.clientY;
              pos3 = e.clientX;
              pos4 = e.clientY;
              // set the element's new position:
              elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
              elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            }
          
            function closeDragElement() {
              // stop moving when mouse button is released:
              document.onmouseup = null;
              document.onmousemove = null;
            }
          }
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

        //---   Setup Main Window Container   ---//
        const container = document.createElement('div');
        container.id = this.variables.objectPrefix+windowName+this.variables.containerSuffix;
        container.className += "NEXT-Container";

        //Set Up Title Bar
        const title = document.createElement('div');
        if(options.draggable != false) {
            this.frameworks.dragElement(container, title)
        }

        title.className += "NEXT-Title NEXT-Border";
        title.innerHTML = options.title || windowName;
        title.id = this.variables.objectPrefix+windowName+this.variables.titleBarSuffix;
        title.style.width = options.width ? options.width+"px" : "250px";
        title.style.background = options.titleBackground || "#333";

        //Set Up Close Window
        const close = document.createElement('div');
        close.innerHTML = "x";
        close.className += "NEXT-Close";
        title.append(close);

        close.onclick = () => { title.remove(); };
        if (options.canExit == false) close.style.display = "none";

        //Set Up Window
        const window = document.createElement('div');
        window.style.width = options.width ? options.width+"px" : "248px";
        window.style.height = options.height ? options.height+"px" : "150px";
        window.style.background = options.background || "#555";
        window.className += "NEXT-BodyMain NEXT-Border";

        //Set Up User Window
        const userWindow = document.createElement('div');
        userWindow.id = this.variables.objectPrefix+windowName;
        
        //---   Create Layout   ---//
        container.append(title);
        container.append(window);
        window.append(userWindow)
        document.body.append(container);

        //---   Finalize   ---//
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
        const raw = document.getElementById(this.variables.objectPrefix+windowName+this.variables.containerSuffix);
        if (raw) {
            return raw;
        } else {
            return this.log("Error finding window '"+windowName+"'.", true);
        }
    },

    toggle(windowName) {
        const container = document.getElementById(this.variables.objectPrefix+windowName+this.variables.containerSuffix);
        if (container) {
            if (container.style.visibility == "visible") {
                container.style.visibility = "hidden";
                this.log("Toggle- Window Hidden: "+windowName);
            } else {
                container.style.visibility = "visible";
                this.log("Toggle- Window Shown: "+windowName);
            }
        } else {
            return this.log("Error showing window '"+windowName+"'. Window not found.", true);
        }
    },

    show(windowName) {
        const container = document.getElementById(this.variables.objectPrefix+windowName+this.variables.containerSuffix);
        if (container) {
            container.style.visibility = "visible";
            this.log("Window Shown: "+windowName);
        } else {
            return this.log("Error showing window '"+windowName+"'. Window not found.", true);
        }
    },

    hide(windowName) {
        const container = document.getElementById(this.variables.objectPrefix+windowName+this.variables.containerSuffix);
        if (container) {
            container.style.visibility = "hidden";
            this.log("Window Hidden: "+windowName);
        } else {
            return this.log("Error hiding window '"+windowName+"'. Window not found.", true);
        }
    },

    close(windowName) {
        const container = document.getElementById(this.variables.objectPrefix+windowName+this.variables.containerSuffix);
        if (container) {
            container.remove();
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
        .NEXT-Container {
            position: absolute;
            z-index: 9998;
        }

        .NEXT-Title {
            z-index: 10000;
            font-family: Arial, Helvetica, sans-serif;
            color: white;
            height: 30px;
            border-radius: 5px 5px 0 0;
            padding: 5px 0 0 10px;
            box-sizing: border-box;
            border-bottom: none !important;
            cursor: move;
        }

        .NEXT-BodyMain {
            z-index: 9999;
            border-radius: 0 0 5px 5px;
            overflow: hidden;
            border-top: none !important;
        }

        .NEXT-Close {
            font-family: Arial, Helvetica, sans-serif;
            position: absolute;
            top: 3px;
            right: 7px;
            cursor: pointer;
            color: #ff5566;
        }

        .NEXT-Border {
            border: 1px solid rgba(255, 255, 255, 0.3);
        }
        `);

        this.variables.isInit = true;
    }

}
