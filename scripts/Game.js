const Player = require('Player');

var Game = cc.Class({
    extends: cc.Component,

    properties: {
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        maxStarDuration: 0,
        minStarDuration: 0,
        ground: {
            default: null,
            type: cc.Node
        },
        player: {
            default: null,
            type: Player
        },
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        scoreAudio: {
            default: null,
            type: cc.AudioClip
        },
        btnNode: {
            default: null,
            type: cc.Node
        },
        gameOverNode: {
            default: null,
            type: cc.Node
        },
    },

    onLoad: function () {
   
        this.groundY = this.ground.y + this.ground.height/2;
        this.timer = 0;
        this.starDuration = 0;
      //  this.spawnNewStar();
      //  this.score = 0;
        this.isRunning = false;
    },

    onStartGame: function () {

        this.resetScore();
      //  this.enabled = true;
        this.isRunning = true;
        this.btnNode.x = 3000;
      //  this.gameOverNode.active = false;
        
        this.player.startMoveAt(cc.v2(0, this.groundY));

        this.spawnNewStar();
    },
    
    spawnNewStar: function() {

        var newStar = cc.instantiate(this.starPrefab);
        this.node.addChild(newStar);
        newStar.setPosition(this.getNewStarPosition());
        newStar.getComponent('Star').game = this;
        this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    },

    getNewStarPosition: function () {
    	
        var randX = 0;
        var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
        var maxX = this.node.width/2;
        randX = (Math.random() - 0.5) * 2 * maxX;
        return cc.v2(randX, randY);
    },

    resetScore: function () {
        this.score = 0;
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
    },
    
    gainScore: function () {
    	
        this.score += 1;
        this.scoreDisplay.string = 'Score: ' + this.score;
        cc.audioEngine.playEffect(this.scoreAudio, false);
    },
    
    update: function (dt) {
        
    	if (!this.isRunning)
    		return;
        if (this.timer > this.starDuration) {
            this.gameOver();
            this.enabled = false;  
            return;
        }
        this.timer += dt;
    },

    gameOver: function () {
    	this.player.stopMove(); 
    	this.gameOverNode.active = true;
    	this.scheduleOnce(function(){
    		cc.director.loadScene('game');
    	},3);
       // cc.director.loadScene('game');
    }
});
