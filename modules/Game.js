import { Node } from "../lib/Node.js";
import { Card } from "../modules/Card.js";
import { Sprite } from "../lib/Sprite.js";
import { Label } from "../lib/Label.js"

var ar = [];
function generateArr() {
    for (var i = 0; i <= 19; i++) {
        var namesrc = "./img/trucxanh" + ((i % 10) + 1) + ".jpg";
        ar.push({ src: namesrc, value: i % 10 });
    }
    return ar;
}

export class Game extends Node {

    init() {
        // this._initSize();
        this.countClick = 0;
        this.firstCard = null;
        this.secondCard = null;
        this._score = 1000;
        this._match=0;
        this._initBackground();
        this._initLabel();
        this._initShowScore();
        this._initStart();
        

      
    }

    // _initSize(){
    //     this.width = 400;
    //     this.height = 400;
    //     this.elm.style.border = "1px solid red";
    // }

    // _initCards(){    
    //     let card = new Card(0, 1);
    //     this.addChild(card);
    //     card.on("mousedown", this.onClickCard.bind(this));
    // }

    _initBackground() {
        var bg = new Sprite("./img/trucxanh_bg.jpg");
        bg.width = 1000;
        bg.height = 700;
        this.addChild(bg);
    }

    _initStart(){
        var startBtn = new Sprite("./img/startbutton.png");
        startBtn.width = 300;
        startBtn.height = 150;
        startBtn.x= 350;
        startBtn.y = 225;
        this.addChild(startBtn);
        startBtn.on("mousedown",this.playGame.bind(this));

    }

    playGame(evt){
        evt.target.style.display = 'none';
        this._initAudio();
        this._shuffleArray(generateArr())
        this._initCards();
        this._initRestart();
    }

    _initLabel() {
        let label = new Label("Arial", "50px", "Green");
        label.text = "Score:";
        this.addChild(label);
        label.x = 380;
        label.y = 50;
    }

    get score() {
        return this._score;
    }

    set score(value) {
        this._score = value;
        this.children[2].text = this._score;
    }

    _shuffleArray(ar) {
        for (let i = ar.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = ar[i];
            ar[i] = ar[j];
            ar[j] = temp;
        }
        return ar;
    }

    _initCards() {
        console.log(this._match);
        var arrX = [];
        var arrY = [];
        var index = 0;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 5; j++) {
                var card = new Card(ar[index].src, index, ar[index].value);

                card.x = 450;
                card.y = 300;
                
                this.addChild(card);

                // card.x = j * 125 + 180;
                // card.y = i * 125 + 120;

                card.elm.setAttribute("class", "main-card");
                card.elm.style.zIndex = 4*5 - (i*5 + j);


                index++;
                card.on("mousedown", this.onClickCard.bind(this));

                arrX.push(j * 125 + 200-450);
                arrY.push(i * 125 + 120-300);
            }
        }



        const timeline = gsap.timeline();
        timeline.staggerTo(".main-card", 1, {
            rotation: 360,
            y: 0,
            // cycle:{
            //   x:[200,200,200,-20,-250,-250,-250],
            //   y:[-30,85,200,185,200,85,-30]
            // }
            x: gsap.utils.wrap(arrX),
            y: gsap.utils.wrap(arrY)
        }, 0.5);



    }

    onClickCard(evt) {
        var tl1 = gsap.timeline();
        var tl2 = gsap.timeline();
        let card = evt.target.node;
        var clickSound = new Audio("./audio/clicksound.mp3");
        clickSound.play();
        // console.log(card);
        // console.log(card.index);
        this.countClick++;
        if (this.countClick === 1) {
            // this.firstCard = card.children[0];
            this.firstCard = card;
            // var firstIndex= card.index;
            this.firstCover = card.children[1];
            this.firstCard.children[0].scaleX = 0;
            tl2.to(this.firstCard.children[2], { duration: 0.2, scaleX: 0 });
            tl1.to(this.firstCover, { duration: 0.2, scaleX: 0 });
            // this.firstCard.children[2].active = false;
            tl1.to(this.firstCard.children[0], { duration: 0.5, scaleX: 1 });
            // this.firstCover.active=false;
        } else if (this.countClick === 2) {
            // compare
            // this.secondCard = card.children[0];
            this.secondCard = card;
            // var secondIndex=card.index;
            this.secondCover = card.children[1];
            // this.secondCover.active=false;
            this.secondCard.children[0].scaleX = 0;
            tl2.to(this.secondCard.children[2], { duration: 0.3, scaleX: 0 });
            tl1.to(this.secondCover, { duration: 0.3, scaleX: 0 });
            tl1.to(this.secondCard.children[0], { duration: 0.5, scaleX: 1 });
            // this.secondCard.children[2].active = false;
            if (this.firstCard.index !== this.secondCard.index) {
                setTimeout(() => {
                    if (this.firstCard.value != this.secondCard.value) {
                        // this.firstCover.active=true;
                        // this.secondCover.active=true;

                        let oldScore = this.score;
                        this.score = this.score - 100;
                        var ohsound = new Audio("./audio/oh-no.mp3");

                        this.updateScore(oldScore);
                        // this.firstCover.scaleX=1;
                        // this.secondCover.scaleX=1;
                        gsap.to(this.secondCard.children[0], { duration: 0.5, scaleX: 0 });
                        gsap.to(this.secondCover, { duration: 0.5, scaleX: 1, delay: 0.5 });
                        gsap.to(this.firstCard.children[0], { duration: 0.5, scaleX: 0 });
                        gsap.to(this.firstCover, { duration: 0.5, scaleX: 1, delay: 0.5 });
                        gsap.to(this.firstCard.children[2], { duration: 0.5, scaleX: 1, delay: 0.5 });
                        gsap.to(this.secondCard.children[2], { duration: 0.5, scaleX: 1, delay: 0.5 });
                        ohsound.play();
                    } else {
                        // this.firstCard.active=false;
                        // this.secondCard.active=false;
                        gsap.to(this.firstCard.children[0], { duration: 0.5, opacity: 0, scale: 1.5 });
                        gsap.to(this.secondCard.children[0], { duration: 0.5, opacity: 0, scale: 1.5 });

                        let oldScore = this.score;
                        this.score = this.score + 500;
                        this._match++;
                        // console.log(this._match);
                        let waowSound = new Audio("./audio/waow.mp3")
                        waowSound.play();

                        this.updateScore(oldScore);
                    }
                    this.countClick = 0;
                }, 1000)
            } else {
                // return;
                this.countClick = 1;
            }
        }
        // console.log(card);
        // console.log(this.score);
    }

    // onClickCard(index,value){

    // }

    _initShowScore() {
        let score = new Label("Arial", "50px", "Green");
        score.x = 530;
        score.y = 50;
        this.addChild(score);
        this.score = 1000;

        score.elm.setAttribute("class", "score2");


        // this.updateScore(0);



    }


    updateScore(currentScore) {
        var condition = gsap.timeline();
        condition
            .from(".score2", {
                duration: 0.5,
                ease: "none",
                innerHTML: currentScore,
                roundProps: "innerHTML",
                onComplete:()=>{
                    this._showResultStatus();
                }
            }, "<");
    }


    _showResultStatus(){
        const gameOver = new Sprite("./img/gameover.jpg");
        gameOver.active = false;
        gameOver.width = 600;
        gameOver.height=475;
        gameOver.x=200;
        gameOver.y=120;
        this.addChild(gameOver);
        // console.log(this.children);
        if (this.score <= 0) {
            gameOver.active = true;
            for (let i = 3; i < 24; i++) {
                this.children[i].active = false;
            }
        }
        const winner = new Sprite("./img/winner.jpeg");
        winner.active = false;
        winner.width = 600;
        winner.height=475;
        winner.x=200;
        winner.y=120;
        this.addChild(winner);
        if (this._match === 10) {
            winner.active = true;
            for (let i = 3; i < 24; i++) {
                this.children[i].active = false;
            }
        }
    }

    _initRestart(){
        const restart = new Sprite("./img/restart.png");
        restart.x=0;
        restart.y=0;
        restart.width=100;
        restart.height=50;
        this.addChild(restart);
        restart.on("mousedown", this.onRestartGame.bind(this));
    }

    onRestartGame(evt) {
        location.reload();
    }

    _initAudio(){
        var initMusic = new Audio("./audio/startmusic.mp3");
        initMusic.play();
    }

}






