MyGame.Game = function(game) {

};
var counter = 6;
var socre = 0;
var _r = 0;
var bitText = '';
var nowScoreText = '';
var tY = 0;
var holdText = '';
MyGame.Game.prototype = {
    create: function() {
        this.gameBg = this.add.sprite(0, 0, 'game_bg');


        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.land = this.add.sprite(0,MyGame.GAME_HEIGHT - 181,'land');


        this.game_pep = this.add.sprite(MyGame.GAME_WIDTH/2+50,0,'game_pep');
        this.game_pep.animations.add('fly');
        this.game_pep.animations.play('fly', 10, true);
        this.game_pep.anchor.set(0.5,1);

        this.game_pep_over = this.add.sprite(MyGame.GAME_WIDTH/2-65,MyGame.GAME_HEIGHT-10,'game_pep_over');
        this.game_pep_over.anchor.set(0.5,1);
        this.game_pep_over.visible = false;

        this.physics.arcade.enable([ this.land, this.game_pep ], Phaser.Physics.ARCADE);
        this.land.body.setSize(MyGame.GAME_WIDTH, 67, 0, 124);

        this.game_pep.body.gravity.y = 0;


        this.hasStarted = false;
        this.isHitLand = false;
        /*this.startGame();*/


        this.explain = this.add.sprite(0,0,'explain');
        this.text = this.add.text(260, 400, '0', { font: "220px Arial", fill: "#ffffff", align: "center" });

        this.resTime = this.time.events.loop(Phaser.Timer.SECOND, this.readinessTime, this);
        this.time.events.stop(false);
        this.readinessTime();

        this.zhuiluoMusic = this.add.audio('zhuiluo');
        this.shacheMusic = this.add.audio('shache');
        this.luodiMusic = this.add.audio('luodi');

        var blackFade = this.add.sprite(0,0,"blackFade");
        var fadeTween = this.add.tween(blackFade);
        fadeTween.to({
            alpha:0
        },1500,Phaser.Easing.Cubic.Out,true);


    },
    update: function() {
        if(!this.hasStarted) return;
        this.physics.arcade.overlap(this.game_pep, this.land, this.hitLand, null, this);
    },
    readinessTime : function(){
        this.time.events.start();
        if(counter <=0)
        {
            this.startGame();
            this.time.events.remove(this.resTime);
        }
        else
        {
            --counter;
            this.text.setText(counter);
        }
    },
    startGame :function(){
        this.hasStarted = true;
        this.explain.destroy();
        this.text.destroy();
        this.game_pep.body.gravity.y = 500;
        this.zhuiluoMusic.play()

        if(this.hasStarted)
        {
            this.input.onDown.addOnce(this.gameEnd, this);
        }

    },
    gameEnd : function(){
        this.hasStarted = false;
        this.game_pep.body.velocity.y = 0;
        this.game_pep.body.gravity.y = 0;

        if(!this.hasStarted && !this.isHitLand)
        {
            this.zhuiluoMusic.destroy();
            this.shacheMusic.play();
            socre = Math.abs((MyGame.GAME_HEIGHT - this.game_pep.y - 74.1 + Math.random())/100).toFixed(4) ;
            console.log(socre)
            this.showResult(socre)
        }
    },
    hitLand : function(){
        this.hasStarted = false;
        this.isHitLand = true;
        this.game_pep.body.velocity.y = 0;
        this.game_pep.body.gravity.y = 0;
        this.game_pep_over.visible = true;

        console.log(socre)

        this.game_pep.kill();
        this.zhuiluoMusic.destroy();
        this.luodiMusic.play();
        this.showResult('hit')
    },
    showResult : function(socre){

        this.time.events.add(Phaser.Timer.SECOND *.5, function(){
            this.resultBox = this.add.sprite(0, 0, 'result');
            this.resultBox.alpha = 0;

            this.add.tween(this.resultBox).to( { alpha : 1  }, 300, Phaser.Easing.Linear.None, true)

            if(socre>=4)
            {
                _r = 0;
                bitText = '如此高冷怎么整！';
            }
            else if(socre<4&&socre>=1)
            {
                _r = 2;
                bitText = '还差一滴滴就能成功啦！';
            }
            else if(socre<1&&socre>0)
            {
                _r = 1;
                bitText = '喜大普奔！成功接地气！';
            }
            else if(socre == 'hit')
            {
                _r = 3;
                bitText = '吻的深沉，爱的过火！';
            }

            if(_r != 3)
            {
                this.result_pep = this.add.sprite(150, this.resultBox.height - 247 - 443, 'result-'+_r+'');
                holdText = 'HOLD住距离 '+socre+' 米';

            }
            else
            {
                this.result_pep = this.add.sprite(20, this.resultBox.height - 247 - 290, 'result-'+_r+'');
                holdText = '您坠地了，还是再来一次吧！';
            }

            this.bigText = this.add.text(this.resultBox.width / 2, 200, bitText, { font: "50px microsoft yahei", fill: "#ffffff", align: "center" });
            this.bigText.anchor.set(0.5,1);


            this.nowScoreText = this.add.text(this.resultBox.width / 2, 270, holdText, { font: "30px microsoft yahei", fill: "#afd0ff", align: "center" });
            this.nowScoreText.anchor.set(0.5,1);


            this.cc = this.add.sprite(0, this.resultBox.height - 247, 'cc');
            this.replayBtn = this.make.button(30, 845, 'replay-btn',this.replayGame,this);
            this.rankBtn2 = this.make.button(340, 845, 'rank-btn2',this.showRank,this);
            this.resultBox.addChild(this.bigText);
            this.resultBox.addChild(this.result_pep);
            this.resultBox.addChild(this.cc);
            this.resultBox.addChild(this.replayBtn);
            this.resultBox.addChild(this.rankBtn2);
        }, this);

    },
    replayGame : function(){
        this.hasStarted = false;
        this.isHitLand = false;

        this.zhuiluoMusic = this.add.audio('zhuiluo');
        this.shacheMusic = this.add.audio('shache');
        this.luodiMusic = this.add.audio('luodi');
        this.resultBox.destroy();
        this.game_pep.destroy();
        this.gameBg.destroy();
        this.land.destroy();
        this.game_pep_over.destroy();

        this.state.start('Game');
    },
    showRank : function(){

        if(!isRankShow)
        {
            this.Rank = this.add.sprite(MyGame.GAME_WIDTH/2, MyGame.GAME_HEIGHT/2, 'rank_box');
            this.rankClose = this.make.button(this.Rank.width / 2 - 30, this.Rank.height / 2 - 785, 'close-btn',this.closeRank,this);
            this.Rank.anchor.set(0.5);
            this.Rank.addChild(this.rankClose);

            this.style = { font: "30px microsoft yahei", fill: "#a75a07", align: "left" }
            this.myRankText = this.add.text(0, -255, '您的成绩'+_score+'米，当前排名第'+_useRank+'名',{ font: "22px microsoft yahei", fill: "#ffffff", align: "center" });
            this.myRankText.anchor.set(0.5);
            this.Rank.addChild(this.myRankText);
            for(var i=0;i<10;i++)
            {
                this.j_Ranking = this.add.text(-220, -165+i*55, j_rankInfo[i].j_Ranking,this.style);
                this.Rank.addChild(this.j_Ranking);
                this.j_NickName = this.add.text(-130, -165+i*55, j_rankInfo[i].j_NickName,this.style);
                this.Rank.addChild(this.j_NickName);
                this.j_score = this.add.text(80, -165+i*55, j_rankInfo[i].j_score,this.style);
                this.Rank.addChild(this.j_score);
            }
            isRankShow = true;
        }
    },
    closeRank : function(){
        this.add.tween(this.Rank).to( { alpha : 0 ,y : MyGame.GAME_HEIGHT/2 - 20 }, 500, Phaser.Easing.Linear.None, true).onComplete.add(function(){
            isRankShow = false;
            this.Rank.kill()
        },this)
    }
};

