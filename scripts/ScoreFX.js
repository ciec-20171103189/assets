
cc.Class({
    extends: cc.Component,

    properties: {
    	anim: {
        default: null,
        type: cc.Animation
    }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
    play: function () {
        this.anim.play('score_pop');
    }
});
