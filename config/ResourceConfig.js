

const CRICKET = 'Cricket';
const ANIMALS = 'Animals';
const PLAYING_CARDS = 'PlayingCards';
const SOCIAL_MEDIA = 'SocialMedia';
const CARTOONS = 'Cartoons';
const FRUITS = 'Fruits';

export const gameCategories= [CRICKET,ANIMALS, PLAYING_CARDS, SOCIAL_MEDIA, CARTOONS, FRUITS];

export const gameModes = [
    {key:1, category: CRICKET, categoryDescription:'Cricket', logo:require('./../assets/cricket/CricketCardFaceUp.png'),},
    {key:2, category: ANIMALS, categoryDescription:'Animals', logo:require('../assets/animals/AnimalCardFaceUp2.jpg')},
    {key:3, category:SOCIAL_MEDIA, categoryDescription:'Social Media', logo:require('./../assets/socialMedia/SocialMediaFaceUp.jpg')},
    {key:4, category:CARTOONS, categoryDescription:'Cartoons', logo:require('./../assets/cartoons/CartoonCardFaceUp.jpg')},
    {key:5, category:FRUITS, categoryDescription:'Fruits', logo:require('../assets/fruits/FruitsCardFaceUp.png')},
    {key:6, category: PLAYING_CARDS, categoryDescription:'Playing Cards', logo:require('./../assets/playingCards/PlayingCardDesign.jpg')},
    ];

export const cardsInformation = {
    [CRICKET] : {
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
    [ANIMALS] : {
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
            {id:12,prop: require('./../assets/animals/Fox.jpg')},
        ],
        faceUpImageUri: require('./../assets/animals/AnimalCardFaceUp2.jpg')
    },
    [PLAYING_CARDS] : {
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
        faceUpImageUri: require('./../assets/playingCards/PlayingCardDesign.jpg')
    }, 
    [SOCIAL_MEDIA]: {
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
    [CARTOONS] :{
        cardInfo: [
            {id:1,prop: require('./../assets/cartoons/TomJerry.png')},
            {id:2,prop: require('../assets/cartoons/Doraemon.png')},
            {id:3,prop: require('../assets/cartoons/Jerry.png')},
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
    [FRUITS]:{
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


// Level Info
export const LEVEL_1 = 1;
export const LEVEL_2 = 2;
export const LEVEL_3 = 3;

export const levels = [LEVEL_1, LEVEL_2, LEVEL_3];

export const levelInfo = {
    [LEVEL_1]: {
        rows: 4,
        columns: 4
    },
    [LEVEL_2]: {
        rows: 5,
        columns: 4
    },
    [LEVEL_3]: {
        rows: 6,
        columns: 4
    },
};

export const darkTheme = {
    bgColor: '#273048', // background of class
    color: '#fff', // fontColor
    elementColor: '#eee' // background of element
};

export const lightTheme =  {
    bgColor: '#fff', // background of class
    color: '#444', // fontColor
    elementColor: '#a52a2aff' // background of element
};
