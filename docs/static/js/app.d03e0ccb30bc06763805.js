webpackJsonp([0],[function(A,t,r){var e=r(8)(r(3),r(9),null,null,null);A.exports=e.exports},,function(A,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=r(1),i=r(0),s=r.n(i);e.a.config.productionTip=!1,new e.a({el:"#app",template:"<App/>",components:{App:s.a}})},function(A,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=r(4),i=(r.n(e),{MIN:130,MAX:250});t.default={name:"app",data:function(){return{wrapBg:void 0,headTitle:void 0,headBird:void 0,startBtn:void 0,grassLand1:void 0,grassLand2:void 0,num1:void 0,num2:void 0,num3:void 0,bird:void 0,birdArr:["../static/img/bird0.png","../static/img/bird1.png"],upBirdArr:["url(../static/img/up_bird0.png)","url(../static/img/up_bird1.png)"],downBirdArr:["url(../static/img/down_bird0.png)","url(../static/img/down_bird1.png)"],pipeUrl:{upMod:"url(../static/img/up_mod.png)",upPipe:"url(../static/img/up_pipe.png)",downMod:"url(../static/img/down_mod.png)",downPipe:"url(../static/img/down_pipe.png)"},scoreImgUrl:["url(../static/img/0.jpg)","url(../static/img/1.jpg)","url(../static/img/2.jpg)","url(../static/img/3.jpg)","url(../static/img/4.jpg)","url(../static/img/5.jpg)","url(../static/img/6.jpg)","url(../static/img/7.jpg)","url(../static/img/8.jpg)","url(../static/img/9.jpg)"],blocksArr:[],blockDistance:void 0,birdArrIndex:0,fallSpeed:0,score:0,started:!1,gameOver:!1,titleShakeTimer:void 0,landTimer:void 0,flyTimer:void 0,wingTimer:void 0}},mounted:function(){this.wrapBg=this.$refs.wrapBg,this.headTitle=this.$refs.headTitle,this.headBird=this.$refs.headBird,this.startBtn=this.$refs.startBtn,this.grassLand1=this.$refs.grassLand1,this.grassLand2=this.$refs.grassLand2,this.num1=this.$refs.num1,this.num2=this.$refs.num2,this.num3=this.$refs.num3,this.bird=this.$refs.bird,this.init()},methods:{init:function(){this.blockDistance=this.randomNum(i.MIN,i.MAX),this.titleShake(),this.landMove()},titleShake:function(){var A=this,t=3;this.titleShakeTimer=setInterval(function(){t*=-1,A.headTitle.style.top=A.headTitle.offsetTop+t+"px",A.birdArrIndex=A.birdArrIndex>=1?0:1},200)},start:function(){this.started=!0,clearInterval(this.titleShakeTimer),this.birdFly(),this.birdWing(),this.blocksArr.push(this.createBlock())},landMove:function(){var A=this;this.landTimer=setInterval(function(){if(A.grassLand1.offsetLeft<=-343&&(A.grassLand1.style.left="343px"),A.grassLand2.offsetLeft<=-343&&(A.grassLand2.style.left="343px"),A.grassLand1.style.left=A.grassLand1.offsetLeft-3+"px",A.grassLand2.style.left=A.grassLand2.offsetLeft-3+"px",A.blocksArr.length){for(var t=0;t<A.blocksArr.length;t++){A.moveBlock(A.blocksArr[t]);var r=A.rectangleCrashExamine(A.blocksArr[t].downDivWrap,A.bird),e=A.rectangleCrashExamine(A.blocksArr[t].upDivWrap,A.bird),s=A.bird.offsetTop>=390;(r||e||s)&&(clearInterval(A.landTimer),A.fallSpeed=0,A.gameOver=!0)}A.blocksArr[A.blocksArr.length-1].downDivWrap.offsetLeft<450-A.blockDistance&&(A.blockDistance=A.randomNum(i.MIN,i.MAX),A.blocksArr.push(A.createBlock())),-12===A.blocksArr[0].downDivWrap.offsetLeft&&(A.score++,A.num1.style.backgroundImage=A.scoreImgUrl[parseInt(A.score/100)],A.num2.style.backgroundImage=A.scoreImgUrl[parseInt(A.score/10)%10],A.num3.style.backgroundImage=A.scoreImgUrl[A.score%10]),A.blocksArr[0].downDivWrap.offsetLeft<-50&&(A.wrapBg.removeChild(A.blocksArr[0].downDivWrap),A.wrapBg.removeChild(A.blocksArr[0].upDivWrap),A.blocksArr.shift())}},30)},birdJump:function(){this.started&&(this.fallSpeed=-8)},birdFly:function(){var A=this;this.flyTimer=setInterval(function(){A.bird.style.top=A.bird.offsetTop+A.fallSpeed+++"px",A.bird.offsetTop<0&&(A.fallSpeed=2),A.bird.offsetTop>=395&&(A.fallSpeed=0,clearInterval(A.flyTimer),clearInterval(A.wingTimer)),A.fallSpeed>12&&(A.fallSpeed=12)},40)},birdWing:function(){var A=this,t=0,r=0;this.wingTimer=setInterval(function(){A.fallSpeed>0&&(A.bird.style.backgroundImage=A.downBirdArr[t++],2===t&&(t=0)),A.fallSpeed<0&&(A.bird.style.backgroundImage=A.upBirdArr[r++],2===r&&(r=0))},120)},randomNum:function(A,t){return parseInt(Math.random()*(t-A+1)+A)},rectangleCrashExamine:function(A,t){var r=A.offsetLeft,e=A.offsetLeft+A.offsetWidth,i=A.offsetTop,s=A.offsetTop+A.offsetHeight,a=t.offsetLeft,d=t.offsetLeft+t.offsetWidth,n=t.offsetTop,o=t.offsetTop+t.offsetHeight;return!(r>d||e<a||i>o||s<n)},createDiv:function(A,t,r,e,i){var s=document.createElement("div");return s.style.width="62px",s.style.height=t,s.style.position=r,s.style.left=e,s.style.top=i,s.style.backgroundImage=A,s},createBlock:function(){var A=this.randomNum(0,150),t=this.randomNum(150,160),r={upDivWrap:null,downDivWrap:null,downHeight:A,gapHeight:t,upHeight:312-A-t},e=this.createDiv(this.pipeUrl.upMod,r.upHeight+"px"),i=this.createDiv(this.pipeUrl.upPipe,"60px");r.upDivWrap=this.createDiv(null,null,"absolute","450px"),r.upDivWrap.appendChild(e),r.upDivWrap.appendChild(i);var s=this.createDiv(this.pipeUrl.downPipe,"60px"),a=this.createDiv(this.pipeUrl.downMod,r.downHeight+"px");return r.downDivWrap=this.createDiv(null,null,"absolute","450px",363-r.downHeight+"px"),r.downDivWrap.appendChild(s),r.downDivWrap.appendChild(a),this.wrapBg.appendChild(r.upDivWrap),this.wrapBg.appendChild(r.downDivWrap),r},moveBlock:function(A){A.upDivWrap.style.left=A.upDivWrap.offsetLeft-3+"px",A.downDivWrap.style.left=A.downDivWrap.offsetLeft-3+"px"},retry:function(){var A=this;this.blocksArr.forEach(function(t){A.wrapBg.removeChild(t.downDivWrap),A.wrapBg.removeChild(t.upDivWrap)}),this.blocksArr=[],this.score=0,this.gameOver=!1,this.started=!1,this.bird.style.top="200px",this.bird.style.background="url(../../static/img/bird0.png) no-repeat",this.titleShake(),this.landMove()}}}},function(A,t){},function(A,t){A.exports="data:image/jpeg;base64,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"},function(A,t){A.exports="data:image/jpeg;base64,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"},function(A,t){A.exports="data:image/jpeg;base64,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"},,function(A,t,r){A.exports={render:function(){var A=this,t=A.$createElement,e=A._self._c||t;return e("div",{ref:"wrapBg",attrs:{id:"wrapBg"},on:{click:A.birdJump}},[e("div",{directives:[{name:"show",rawName:"v-show",value:!A.started,expression:"!started"}],ref:"headTitle",attrs:{id:"headTitle"}},[e("img",{ref:"headBird",attrs:{id:"headBird",src:A.birdArr[A.birdArrIndex],alt:"小鸟"}})]),A._v(" "),e("button",{directives:[{name:"show",rawName:"v-show",value:!A.started,expression:"!started"}],ref:"startBtn",attrs:{id:"startBtn"},on:{click:A.start}}),A._v(" "),e("div",{ref:"grassLand1",attrs:{id:"grassLand1"}}),A._v(" "),e("div",{ref:"grassLand2",attrs:{id:"grassLand2"}}),A._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:A.started,expression:"started"}],attrs:{id:"score"}},[e("div",{ref:"num1",attrs:{id:"num1"}}),A._v(" "),e("div",{ref:"num2",attrs:{id:"num2"}}),A._v(" "),e("div",{ref:"num3",attrs:{id:"num3"}})]),A._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:A.gameOver,expression:"gameOver"}],attrs:{id:"gameOver"}},[e("img",{attrs:{src:r(5),alt:"game over"}}),A._v(" "),e("img",{attrs:{src:r(6),alt:"message"}}),A._v(" "),e("img",{attrs:{src:r(7),alt:"ok"},on:{click:A.retry}})]),A._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:A.started,expression:"started"}],ref:"bird",attrs:{id:"bird"}})])},staticRenderFns:[]}}],[2]);
//# sourceMappingURL=app.d03e0ccb30bc06763805.js.map