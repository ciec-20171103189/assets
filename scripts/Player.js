
cc.Class({
	extends: cc.Component,

    properties: {

        jumpHeight: 0,

        jumpDuration: 0,

        maxMoveSpeed: 0,

        accel: 0,
        
        jumpAudio: {
        default: null,
        type: cc.AudioClip
    },
    },
    setJumpAction: function () {

        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());

        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());

        var callback = cc.callFunc(this.playJumpSound, this);
        
        var squash = cc.scaleTo(this.squashDuration, 1, 0.6);
        var stretch = cc.scaleTo(this.squashDuration, 1, 1.2);
        var scaleBack = cc.scaleTo(this.squashDuration, 1, 1);
        
        return cc.repeatForever(cc.sequence(squash,stretch,jumpUp,squashBack, jumpDown, callback));
    },
    
    playJumpSound: function () {
    	
        cc.audioEngine.playEffect(this.jumpAudio, false);
    },
    
    onKeyDown (event) {
    	
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = true;
                break;
            case cc.macro.KEY.d:
                this.accRight = true;
                break;
        }
    },

    onKeyUp (event) {

        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = false;
                break;
            case cc.macro.KEY.d:
                this.accRight = false;
                break;
        }
    },

    onLoad: function () {
    	
        this.jumpAction = this.setJumpAction();
        
        this.node.runAction(this.jumpAction);
        
        this.accLeft = false;
        this.accRight = false;
 
        this.xSpeed = 0;
        
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    
    onDestroy () {
 
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    
    start () {

    },

    
    update: function (dt) {

        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }
        if ( Math.abs(this.xSpeed) > this.maxMoveSpeed ) {

            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        this.node.x += this.xSpeed * dt;
        
        this.xScreenWidethHalf = this.node.parent.width/2;
        var xNodeX = this.node.x;
        if(Math.abs(xNodeX)>this.xScreenWidethHalf){
        	this.node.x = this.xScreenWidthHalf*xNodeX/Math.abs(xNodeX);
        	this.xSpeed = 0;
        }
    },
});
