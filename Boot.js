var MyGame = {};
MyGame.Boot = function(game) {
    MyGame.GAME_WIDTH = 640;
    MyGame.GAME_HEIGHT = 1010;
};
MyGame.Boot.prototype = {
    preload: function() {
        this.load.image('loadingBar_1', 'assets/loadingBar_1.png?2');
        this.load.image('loadingBar_0', 'assets/loadingBar_0.png?2');

        this.load.image('home_bg','assets/home-bg.jpg');
        this.load.image('home_title','assets/title.png');
        this.load.image('home_pep','assets/home_pep.png');

    },
    create: function() {
        this.input.maxPointers = 1;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setScreenSize(true);
        this.state.start('Preloader');
    }
};