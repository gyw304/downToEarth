MyGame.MainMenu = function(game) {};

var isRankShow = false;
var isRulShow = false;
MyGame.MainMenu.prototype = {
    create: function() {
        this.add.sprite(0, 0, 'home_bg');
        this.homeTitle = this.add.sprite(MyGame.GAME_WIDTH/2, 170, 'home_title');
        this.homeTitle.anchor.set(0.5);
        this.add.tween(this.homeTitle).to({y: 180}, 1500, Phaser.Easing.Linear.None, true, 0,-1, true);

        this.homePep = this.add.sprite(MyGame.GAME_WIDTH/2, 500, 'home_pep');
        this.homePep.anchor.set(0.5);

        this.add.tween(this.homePep).to({y: 520}, 1000, Phaser.Easing.Linear.None, true, 0,-1, true);
        this.add.tween(this.homePep.scale).to( { x:.97,y:.97 }, 1000, Phaser.Easing.Linear.Out, true, 0,-1, true);

        this.startGameBtn = this.add.button(MyGame.GAME_WIDTH/2, MyGame.GAME_HEIGHT - 240,'start-btn', this.startGame, this);
        this.startGameBtn.anchor.set(0.5);

        this.rankBtn = this.add.button(MyGame.GAME_WIDTH/2, MyGame.GAME_HEIGHT - 120,'rank-btn', this.showRank, this);
        this.rankBtn.anchor.set(0.5);

        this.ruleBtn = this.add.button(MyGame.GAME_WIDTH/2, MyGame.GAME_HEIGHT - 35,'rule-btn', this.showRule, this);
        this.ruleBtn.anchor.set(0.5);




    },
    startGame: function() {

        if(!_isLogin)
        {
            document.getElementById('login').style.display = 'block';
        }
        else
        {
            this.state.start('Game');
        }

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
    showRule : function(){
        if(!isRulShow)
        {
            this.Rule = this.add.sprite(MyGame.GAME_WIDTH/2, MyGame.GAME_HEIGHT/2, 'rule_box');
            this.closeBtn = this.make.button(this.Rule.width / 2 - 30, this.Rule.height / 2 - 240, 'close-btn',this.closeRule,this);
            this.Rule.anchor.set(0.5);
            this.Rule.addChild(this.closeBtn);
            isRulShow = true;
        }

    },
    closeRule : function(){
        this.add.tween(this.Rule).to( { alpha : 0 ,y : MyGame.GAME_HEIGHT/2 - 20 }, 500, Phaser.Easing.Linear.None, true).onComplete.add(function(){
            this.Rule.kill();
            isRulShow = false;
        },this)
    },
    closeRank : function(){
        this.add.tween(this.Rank).to( { alpha : 0 ,y : MyGame.GAME_HEIGHT/2 - 20 }, 500, Phaser.Easing.Linear.None, true).onComplete.add(function(){
            this.Rank.kill();
            isRankShow = false;
        },this)
    },
    showLogin : function(){

    }
};