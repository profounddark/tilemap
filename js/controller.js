export class Keyboard {
    constructor () {
        this.LEFT = 37;
        this.RIGHT = 39;
        this.UP = 38;
        this.DOWN = 40;
        
        this._keys = {};
        this._commands = {};   
    }
    
    listenForEvents(keys) {
        // window.addEventListener('keydown', this._onKeyDown.bind(this));
        window.addEventListener('keydown', this._onKeyDown.bind(this));
        window.addEventListener('keyup', this._onKeyUp.bind(this));
    
        keys.forEach(function (key) {
            this._keys[key] = false;
        }.bind(this));
    }

    addCommand(key, command) {
        this._commands[key] = command;
        
    }

    setCommand(key, func, targ) {
        this._commands[key] = {command: func, target: targ};
    }

    _onKeyDown(event) {
        let keyCode = event.keyCode;
        if (keyCode in this._keys) {
            event.preventDefault();
            this._keys[keyCode] = true;
            this._commands[keyCode].command.call(this._commands[keyCode].target);
            
        }
    }

    _onKeyUp(event) {
        let keyCode = event.keyCode;
        if (keyCode in this._keys) {
            event.preventDefault();
            this._keys[keyCode] = false;
        }
    }

    isDown(keyCode) {
        if (!keyCode in this._keys) {
            throw new Error('Keycode ' + keyCode + ' is not being listened to!');
        }
        return(this._keys[keyCode]);
    }
}