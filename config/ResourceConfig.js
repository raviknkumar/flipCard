const ANIMALS = 'animals';

export const gameModes = [
    {key:1, category:'Cricket', categoryDescription:'Cricket', logo:''},
    {key:2, category: 'Animals', categoryDescription:'Animals', logo:''},
    {key:3, category:'PlayingCards', categoryDescription:'Playing Cards', logo:''},
    {key:4, category:'SocialMedia', categoryDescription:'Social Media', logo:''},
    {key:5, category:'Cartoons', categoryDescription:'Cartoons', logo:''},
    {key:6, category:'Fruits', categoryDescription:'Fruits', logo:''}];

export const cardsInformation = {
    'Cricket' : {
        cardInfo: [
            {id:1,prop: require('./../assets/cricket/Dhoni.png')},
            {id:2,prop: require('./../assets/cricket/Rohith.png')},
            {id:3,prop: require('./../assets/cricket/Kohli.png')},
            {id:4,prop: require('./../assets/cricket/Sehwag.png')},
            {id:5,prop: require('./../assets/cricket/Raina.png')},
            {id:6,prop: require('./../assets/cricket/Yuvraj.png')},
            {id:7,prop: require('./../assets/cricket/Pant.png')},
            {id:8,prop: require('./../assets/cricket/Sachin.png')},
            {id:9,prop: require('./../assets/cricket/Bumrah.png')},
            {id:10,prop: require('./../assets/cricket/Harbhajan.png')},
            {id:11,prop: require('./../assets/cricket/Ganguly.png')},
            {id:12,prop: require('./../assets/cricket/Gambhir.png')},
        ],
        faceUpImageUri: require('./../assets/cricket/CricketCardFaceUp.png'),
    },
    'Animals' : {
        cardInfo: [
            {id:1,prop: require('./../assets/animals/Lion.jpg')},
            {id:2,prop: require('./../assets/animals/Tiger.jpg')},
            {id:3,prop: require('./../assets/animals/Cheetah.jpg')},
            {id:4,prop: require('./../assets/animals/Cat.jpg')},
            {id:5,prop: require('./../assets/animals/Monkey.jpg')},
            {id:6,prop: require('./../assets/animals/Deer.jpg')},
            {id:7,prop: require('./../assets/animals/Giraffe.jpg')},
            {id:8,prop: require('./../assets/animals/Panda.jpg')},
            {id:9,prop: require('./../assets/animals/Elephant.jpg')},
            {id:10,prop: require('./../assets/animals/Rat.jpg')},
            {id:11,prop: require('./../assets/animals/Kangaroo.jpg')},
            {id:12,prop: require('./../assets/animals/Panda.jpg')},
        ]
    },
    'PlayingCards' : {
        cardInfo: [
            {id:1,prop: require('./../assets/playingCards/KingClub.png')},
            {id:2,prop: require('./../assets/playingCards/KingHeart.png')},
            {id:3,prop: require('./../assets/playingCards/JackHeart.png')},
            {id:4,prop: require('./../assets/playingCards/JackClub.png')},
            {id:5,prop: require('./../assets/playingCards/QueenClub.png')},
            {id:6,prop: require('./../assets/playingCards/QueenHeart.png')},
            {id:7,prop: require('./../assets/playingCards/KingDiamond.png')},
            {id:8,prop: require('./../assets/playingCards/KingSpade.png')},
            {id:9,prop: require('./../assets/playingCards/JackDiamond.png')},
            {id:10,prop: require('./../assets/playingCards/JackSpade.png')},
            {id:11,prop: require('./../assets/playingCards/QueenDiamond.png')},
            {id:12,prop: require('./../assets/playingCards/QueenSpade.png')},
        ],
        faceUpImageUri: require('./../assets/playingCards/PlayingCardDesign.png')
    }, 
    'SocialMedia': {
        cardInfo: [
            {id:1,prop: require('./../assets/socialMedia/Facebook.png')},
            {id:2,prop: require('./../assets/socialMedia/WhatsApp.jpg')},
            {id:3,prop: require('./../assets/socialMedia/Youtube.jpg')},
            {id:4,prop: require('./../assets/socialMedia/Skype.jpg')},
            {id:5,prop: require('./../assets/socialMedia/Instagram.jpg')},
            {id:6,prop: require('./../assets/socialMedia/FacebookMessenger.png')},
            {id:7,prop: require('./../assets/socialMedia/Googleplus.jpg')},
            {id:8,prop: require('./../assets/socialMedia/Linkedin.jpg')},
            {id:9,prop: require('./../assets/socialMedia/Snapchat.jpg')},
            {id:10,prop: require('./../assets/socialMedia/Telegram.jpg')},
            {id:11,prop: require('./../assets/socialMedia/Pinterest.jpg')},
            {id:12,prop: require('./../assets/socialMedia/Viber.jpg')},
        ],
        faceUpImageUri: require('./../assets/socialMedia/SocialMediaFaceUp.jpg')
    }, 
    'Cartoons' :{
        cardInfo: [
            {id:1,prop: require('./../assets/cartoons/TomJerry.png')},
            {id:2,prop: require('../assets/cartoons/Doraemon.png')},
            {id:3,prop: require('../assets/cartoons/Jerry.jpeg')},
            {id:4,prop: require('./../assets/cartoons/MickeyMouse.jpeg')},
            {id:5,prop: require('./../assets/cartoons/MotuPatlu.jpg')},
            {id:6,prop: require('./../assets/cartoons/ShinChan.png')},
            {id:7,prop: require('./../assets/cartoons/ChotaBheem.jpg')},
            {id:8,prop: require('./../assets/cartoons/Pickachu.png')},
            {id:9,prop: require('./../assets/cartoons/Nobita.png')},
            {id:10,prop: require('./../assets/cartoons/MrBean.png')},
            {id:11,prop: require('./../assets/cartoons/Minnie.png')},
            {id:12,prop: require('./../assets/cartoons/ThreePowerGirls.jpeg')},
        ],
        faceUpImageUri: require('./../assets/cartoons/CartoonCardFaceUp.jpg')
    },
    'Fruits':{
        cardInfo: [
            {id:1,prop: require('./../assets/fruits/Apple.jpg')},
            {id:2,prop: require('../assets/fruits/Banana.jpg')},
            {id:3,prop: require('../assets/fruits/Papaya.jpg')},
            {id:4,prop: require('./../assets/fruits/PineApple.jpg')},
            {id:5,prop: require('./../assets/fruits/Pomegranate.jpg')},
            {id:6,prop: require('./../assets/fruits/WaterMelon.jpg')},
            {id:7,prop: require('./../assets/fruits/Mango.jpg')},
            {id:8,prop: require('./../assets/fruits/Grapes.jpg')},
            {id:9,prop: require('./../assets/fruits/Orange.jpg')},
            {id:10,prop: require('./../assets/fruits/Kiwi.jpg')},
            {id:11,prop: require('./../assets/fruits/Plum.jpg')},
            {id:12,prop: require('./../assets/fruits/Raspberry.jpg')},
        ],
        faceUpImageUri: require('../assets/fruits/FruitsCardFaceUp.png')
    }
};

export const levelInfo = {
    1:{
        rows:4,
        columns:4
    },
    2:{
        rows:5,
        columns:4
    },
    3:{
        rows:6,
        columns:4
    },
}