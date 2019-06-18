
cc.Class({
    extends: cc.Component,

    properties: {
    	
    	pickRadius: 0,
    },

    getPlayerDistance: function () {

        var playerPos = this.game.player.getPosition();

        var dist = this.node.position.sub(playerPos).mag();
        return dist;
    },

    onPicked: function() {
    	
        this.game.spawnNewStar();
        
        this.node.destroy();
        
        this.game.spawnNewStar();
        
        this.game.gainScore();
        
        this.node.destroy();
    },
    
    start () {

    },

    update: function (dt) {
  
        if (this.getPlayerDistance() < this.pickRadius) {
        	
            this.onPicked();
            return;
        }
    },
});
