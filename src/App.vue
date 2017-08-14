<template>
    <div id="wrapBg" ref="wrapBg" @click="birdJump">  <!--游戏背景-->
        <div id="headTitle" v-show="!started" ref="headTitle"> <!--开始标题-->
            <img id="headBird" ref="headBird" :src="birdArr[birdArrIndex]" alt="小鸟"/> <!--标题中的小鸟-->
        </div>
        <button id="startBtn" v-show="!started" ref="startBtn" @click="start"></button> <!--开始按钮-->
        <div id="grassLand1" ref="grassLand1"></div> <!--草地1-->
        <div id="grassLand2" ref="grassLand2"></div> <!--草地2-->
        <div v-show="started" id="score">
            <div id="num1" ref="num1"></div>
            <div id="num2" ref="num2"></div>
            <div id="num3" ref="num3"></div>
        </div>
        <div v-show="gameOver" id="gameOver">
            <img src="../static/img/game_over.jpg" alt="game over"/>
            <img src="../static/img/message.jpg" alt="message"/>
            <img src="../static/img/ok.jpg" alt="ok" @click="retry"/>
        </div>
        <div v-show="started" id="bird" ref="bird"></div>
    </div>
</template>

<script>
    import './css/index.css';
    
    const BLOCK_START_POSITION = 450;
    const BLOCK_DISTANCE_RANGE = {
        MIN: 130,
        MAX: 250
    };
    const PIPE_WIDTH = 62;
    const GAME_WIDTH = 343;
    const GAME_HEIGHT = 480;
    export default {
        name: 'app',
        data() {
            return {
                wrapBg: undefined,
                headTitle: undefined,
                headBird: undefined,
                startBtn: undefined,
                grassLand1: undefined,
                grassLand2: undefined,
                num1: undefined,
                num2: undefined,
                num3: undefined,
                bird: undefined,
                birdArr: ['../static/img/bird0.png', '../static/img/bird1.png'],
                upBirdArr: ['url(../static/img/up_bird0.png)', 'url(../static/img/up_bird1.png)'],
                downBirdArr: ['url(../static/img/down_bird0.png)', 'url(../static/img/down_bird1.png)'],
                pipeUrl: {
                    upMod: 'url(../static/img/up_mod.png)',
                    upPipe: 'url(../static/img/up_pipe.png)',
                    downMod: 'url(../static/img/down_mod.png)',
                    downPipe: 'url(../static/img/down_pipe.png)',
                },
                scoreImgUrl: [
                    'url(../static/img/0.jpg)',
                    'url(../static/img/1.jpg)',
                    'url(../static/img/2.jpg)',
                    'url(../static/img/3.jpg)',
                    'url(../static/img/4.jpg)',
                    'url(../static/img/5.jpg)',
                    'url(../static/img/6.jpg)',
                    'url(../static/img/7.jpg)',
                    'url(../static/img/8.jpg)',
                    'url(../static/img/9.jpg)',
                ],
                blocksArr: [],
                blockDistance: undefined,
                birdArrIndex: 0,
                fallSpeed: 0,
                score: 0,
                started: false,
                gameOver: false,
                titleShakeTimer: undefined,
                landTimer: undefined,
                flyTimer: undefined,
                wingTimer: undefined,
            }
        },
        mounted() {
            this.wrapBg = this.$refs.wrapBg;
            this.headTitle = this.$refs.headTitle;
            this.headBird = this.$refs.headBird;
            this.startBtn = this.$refs.startBtn;
            this.grassLand1 = this.$refs.grassLand1;
            this.grassLand2 = this.$refs.grassLand2;
            this.num1 = this.$refs.num1;
            this.num2 = this.$refs.num2;
            this.num3 = this.$refs.num3;
            this.bird = this.$refs.bird;
            this.init();
        },
        methods: {
            init() {
                this.blockDistance = this.randomNum(BLOCK_DISTANCE_RANGE.MIN, BLOCK_DISTANCE_RANGE.MAX);
                this.titleShake();
                this.landMove();
            },
            titleShake() {
                let amp = 3;
                this.titleShakeTimer = setInterval(() => {
                    amp *= -1;
                    this.headTitle.style.top = this.headTitle.offsetTop + amp + 'px';
                    this.birdArrIndex = this.birdArrIndex >= 1 ? 0 : 1;
                }, 200);
            },
            start() {
                this.started = true;
                clearInterval(this.titleShakeTimer);
                this.birdFly();
                this.birdWing();
                this.blocksArr.push(this.createBlock());
            },
            landMove() {
                this.landTimer = setInterval(() => {
                    if (this.grassLand1.offsetLeft <= -GAME_WIDTH) {
                        this.grassLand1.style.left = GAME_WIDTH + 'px';
                    }
                    if (this.grassLand2.offsetLeft <= -GAME_WIDTH) {
                        this.grassLand2.style.left = GAME_WIDTH + 'px';
                    }
                    this.grassLand1.style.left = this.grassLand1.offsetLeft - 3 + 'px';
                    this.grassLand2.style.left = this.grassLand2.offsetLeft - 3 + 'px';
                    if (this.blocksArr.length) {
                        for (let i = 0; i < this.blocksArr.length; i++) {
                            this.moveBlock(this.blocksArr[i]);
                            const x = this.rectangleCrashExamine(this.blocksArr[i].downDivWrap, this.bird);
                            const y = this.rectangleCrashExamine(this.blocksArr[i].upDivWrap, this.bird);
                            const z = this.bird.offsetTop >= 390;
                            if (x || y || z) {
                                clearInterval(this.landTimer);//清除landTimer定时器
                                this.fallSpeed = 0; //小鸟下落
                                this.gameOver = true;
                            }
                        }
                        if (this.blocksArr[this.blocksArr.length - 1].downDivWrap.offsetLeft < (BLOCK_START_POSITION - this.blockDistance)) {
                            this.blockDistance = this.randomNum(BLOCK_DISTANCE_RANGE.MIN, BLOCK_DISTANCE_RANGE.MAX);
                            this.blocksArr.push(this.createBlock());
                        }
                        if (this.blocksArr[0].downDivWrap.offsetLeft === -12) {
                            this.score++;//积分面板
                            this.num1.style.backgroundImage = this.scoreImgUrl[parseInt(this.score / 100)];
                            this.num2.style.backgroundImage = this.scoreImgUrl[parseInt(this.score / 10) % 10];
                            this.num3.style.backgroundImage = this.scoreImgUrl[this.score % 10];
                        }
                        if (this.blocksArr[0].downDivWrap.offsetLeft < -50) {
                            this.wrapBg.removeChild(this.blocksArr[0].downDivWrap);
                            this.wrapBg.removeChild(this.blocksArr[0].upDivWrap);
                            this.blocksArr.shift();
                        }
                    }
                }, 30);
            },
            birdJump() {
                if (this.started) {
                    this.fallSpeed = -8;
                }
            },
            birdFly() {
                this.flyTimer = setInterval(() => {
                    this.bird.style.top = this.bird.offsetTop + this.fallSpeed++ + 'px';
                    if (this.bird.offsetTop < 0) {
                        this.fallSpeed = 2; //这里用于控制小鸟不要飞出界面
                    }
                    if (this.bird.offsetTop >= 395) {
                        this.fallSpeed = 0;
                        clearInterval(this.flyTimer); //一旦飞到地面，清除定时器
                        clearInterval(this.wingTimer); //清除翅膀摆动定时器
                    }
                    if (this.fallSpeed > 12) {
                        this.fallSpeed = 12;  //鸟的最大下落速度控制在12
                    }
                }, 40);
            },
            birdWing() {
                let i = 0, j = 0;
                this.wingTimer = setInterval(() => {
                    if (this.fallSpeed > 0) {
                        this.bird.style.backgroundImage = this.downBirdArr[i++];
                        if (i === 2) {i = 0}
                    }
                    if (this.fallSpeed < 0) {
                        this.bird.style.backgroundImage = this.upBirdArr[j++];
                        if (j === 2) {j = 0}
                    }
                }, 120);//逐帧动画，小鸟煽动翅膀
            },
            randomNum(min, max) {
                return parseInt(Math.random() * (max - min + 1) + min);
            },
            //两个矩形元素之间的碰撞检测
            rectangleCrashExamine(obj1, obj2) {
                const obj1Left = obj1.offsetLeft;
                const obj1Width = obj1.offsetLeft + obj1.offsetWidth;
                const obj1Top = obj1.offsetTop;
                const obj1Height = obj1.offsetTop + obj1.offsetHeight;
                
                const obj2Left = obj2.offsetLeft;
                const obj2Width = obj2.offsetLeft + obj2.offsetWidth;
                const obj2Top = obj2.offsetTop;
                const obj2Height = obj2.offsetTop + obj2.offsetHeight;
                
                return !(obj1Left > obj2Width || obj1Width < obj2Left || obj1Top > obj2Height || obj1Height < obj2Top);
            },
            createDiv(url, height, positionType, left, top) {
                const newDiv = document.createElement('div');
                newDiv.style.width = PIPE_WIDTH + 'px';
                newDiv.style.height = height;
                newDiv.style.position = positionType;
                newDiv.style.left = left;
                newDiv.style.top = top;
                newDiv.style.backgroundImage = url;  //"url(/img/0.jpg)"
                return newDiv;
            },
            createBlock() {
                const downHeight = this.randomNum(0, 150);
                const gapHeight = this.randomNum(150, 160);
                const block = {
                    upDivWrap: null,
                    downDivWrap: null,
                    downHeight,//随机生成0-150之间的数，用于控制下管道的高度
                    gapHeight,// 管道中间间隙宽度，通过调节大小，可以的控制游戏难度
                    upHeight: 312 - downHeight - gapHeight
                };
                const upDiv1 = this.createDiv(this.pipeUrl.upMod, block.upHeight + 'px');
                const upDiv2 = this.createDiv(this.pipeUrl.upPipe, '60px');
                block.upDivWrap = this.createDiv(null, null, 'absolute', BLOCK_START_POSITION + 'px');
                block.upDivWrap.appendChild(upDiv1);
                block.upDivWrap.appendChild(upDiv2);//生成上方管道
                
                const downDiv1 = this.createDiv(this.pipeUrl.downPipe, '60px');
                const downDiv2 = this.createDiv(this.pipeUrl.downMod, block.downHeight + 'px');
                block.downDivWrap = this.createDiv(null, null, 'absolute', BLOCK_START_POSITION + 'px', 363 - block.downHeight + 'px');
                block.downDivWrap.appendChild(downDiv1);
                block.downDivWrap.appendChild(downDiv2); //生成下方的管道
                
                this.wrapBg.appendChild(block.upDivWrap);
                this.wrapBg.appendChild(block.downDivWrap);
                return block;
            },
            moveBlock(block) {//控制管道移动的方法
                block.upDivWrap.style.left = block.upDivWrap.offsetLeft - 3 + 'px';
                block.downDivWrap.style.left = block.downDivWrap.offsetLeft - 3 + 'px';
            },
            retry() {
                this.blocksArr.forEach((block) => {
                    this.wrapBg.removeChild(block.downDivWrap);
                    this.wrapBg.removeChild(block.upDivWrap);
                });
                this.blocksArr = [];
                this.score = 0;
                this.gameOver = false;
                this.started = false;
                this.bird.style.top='200px';
                this.bird.style.background = 'url(../../static/img/bird0.png) no-repeat';
                this.titleShake();
                this.landMove();
            }
        }
    }
</script>
