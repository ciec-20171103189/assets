
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
        }
    },

    start () {

    },

});
