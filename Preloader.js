MyGame.Preloader = function(game){
};
MyGame.Preloader.prototype = {
    preload: function() {

        this.add.sprite(0, 0, 'home_bg');

        this.loadBar = this.add.group();
        this.loadBar.create(0,0,'loadingBar_0');
        this.preloadBar = this.loadBar.create(4,4,'loadingBar_1');
        this.load.setPreloadSprite(this.preloadBar);
        this.loadBar.x = MyGame.GAME_WIDTH/2 - 226;
        this.loadBar.y = MyGame.GAME_HEIGHT/2 + 300;


        this.homeTitle = this.add.sprite(MyGame.GAME_WIDTH/2, 170, 'home_title');
        this.homeTitle.anchor.set(0.5);
        this.add.tween(this.homeTitle).to({y: 180}, 1500, Phaser.Easing.Linear.None, true, 0,-1, true);

        this.homePep = this.add.sprite(MyGame.GAME_WIDTH/2, 500, 'home_pep');
        this.homePep.anchor.set(0.5);

        this.add.tween(this.homePep).to({y: 520}, 1000, Phaser.Easing.Linear.None, true, 0,-1, true);
        this.add.tween(this.homePep.scale).to( { x:.97,y:.97 }, 1000, Phaser.Easing.Linear.Out, true, 0,-1, true);

        this.load.image('game_pep_over','assets/game_pep_over.png');
        this.load.image('start-btn','assets/start-btn.png');
        this.load.image('rank-btn','assets/rank-btn.png');
        this.load.image('rule-btn','assets/rule-btn.png');
        this.load.image('game_bg','assets/game-bg.jpg');
        this.load.image('blackFade','assets/blackFade.gif');
        this.load.image('explain','assets/explain.png');
        this.load.image('rule_box','assets/rule_box.png');
        this.load.image('close-btn','assets/close-btn.png');

        this.load.image('rank_box','assets/rank-box.png?2');

        this.load.spritesheet('game_pep','assets/game_pep.png',380,192,2);

        this.load.image('land','assets/land.png');

        this.load.image('result','assets/result.png');
        this.load.image('result-0','assets/result-0.png');
        this.load.image('result-1','assets/result-1.png');
        this.load.image('result-2','assets/result-2.png');
        this.load.image('result-3','assets/result-3.png');
        this.load.image('cc','assets/cc.png');
        this.load.image('replay-btn','assets/replay-btn.png');
        this.load.image('rank-btn2','assets/rank-btn2.png');

        this.load.audio('zhuiluo', 'assets/zhuiluo.mp3');
        this.load.audio('shache', 'assets/shache.mp3');
        this.load.audio('luodi', 'assets/luodi.mp3');

    },
    create: function() {
        this.state.start('MainMenu');
    }
};