
cc.Class({
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
            type: cc.Node
        },
        
        scoreDisplay: {
        default: null,
        type: cc.Label
        },
    },

    onLoad: function () {

        this.groundY = this.ground.y + this.ground.height/2;

        this.spawnNewStar();
        
        this.score = 0;
    },

    spawnNewStar: function() {
    	
        var newStar = cc.instantiate(this.starPrefab);

        this.node.addChild(newStar);
  
        newStar.setPosition(this.getNewStarPosition());
        
        newStar.getComponent('Star').game = this;
    },

    getNewStarPosition: function () {
        var randX = 0;

        var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight;

        var maxX = this.node.width;
        randX = Math.random() * maxX;

        return cc.v2(randX, randY);
    },
    
    start () {

    },

    gainScore: function () {
        this.score += 1;

        this.scoreDisplay.string = 'Score: ' + this.score;
    },
});
