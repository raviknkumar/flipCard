# Flip Card

Flip Card is a react native game built on Expo. It is a timed card memory game where user click the cards to see the image under the card and try to find the matching image underneath the other cards. Uncover two matching symbols at once to eliminate them from the game. Eliminate all cards as fast as you can to win the game.

Concepts Used: 
<ul>
<li>Stack Navigator</li>
<li>Audio</li>
<li>React Context API</li>
<li> Async Storage </li>
</ul>

## Demo

### Home screen
<image src="demo/FlipCardDemo.gif" width="200px">

<table style="border: 2px solid #ddd;  border-collapse: collapse;margin-top: 20px">
    <thead>
        <td style="text-align:center">Demo Image </td>
        <td style="text-align:center">Description </td>
    </thead>
    <tr style="border: 2px solid #ddd;">
        <td style="display:flex; flex-direction:column;margin-bottom: 10px;">
            <h2>Select category</h6>
            <image src="demo/GameCategories.jpeg" width="200px">
        </td>
        <td style="width: 60%">
            Users can select the category they want to play
        </td>
    </tr>
     <tr style="border: 2px solid #ddd;">
        <td style="display:flex; flex-direction:column;margin-bottom: 10px">
            <h2>Select category (ii)</h6>
            <image src="demo/GameCategoriesSaved.jpeg" width="200px">
        </td>
        <td>
            This shows the categories of all games already played by the users. Blue indicates it was played previously, and gray indicated unplayed
        </td>
    </tr>
     <tr style="border: 2px solid #ddd;">
        <td style="display:flex; flex-direction:column;margin-bottom: 10px">
            <h2>Select Level</h6>
            <image src="demo/Levels.jpeg" width="200px">
        </td>
        <td>
            Users can select the category the level they want to play.
            <ul>
            <li>Easy has 8 pairs of cards to be matched</li>
            <li>Medium 10 pairs of cards to be matched</li><li>Hard 12 pairs of cards to be matched. </li>
            </ul>
        </td>
    </tr>
     <tr style="border: 2px solid #ddd;">
        <td style="display:flex; flex-direction:column;margin-bottom: 10px">
            <h2>Game screen</h6>
            <image src="demo/Game.jpeg" width="200px">
        </td>
        <td>
            Easy level for category fruits, with timer running on the top left. On the top right, the user can mute or un-mute the background music. 
        </td>
    </tr>
    <tr style="border: 2px solid #ddd;">
        <td style="display:flex; flex-direction:column;margin-bottom: 10px">
            <h2>Game screen</h6>
            <image src="demo/PauseExit.jpeg" width="200px">
        </td>
        <td>
           Between the game, user can pause/resume the game or exit from there. 
        </td>
    </tr>
    <tr style="border: 2px solid #ddd;">
        <td style="display:flex; flex-direction:column;margin-bottom: 10px">
            <h2>Stats screen</h6>
            <image src="demo/Stats.jpeg" width="200px">
        </td>
        <td>
          User can see the statistics of the games that were played previously. Average time taken to solve and best time to solve is shown level wise for all the categories.
        </td>
    </tr>
    <tr style="border: 2px solid #ddd;">
        <td style="display:flex; flex-direction:column;margin-bottom: 10px">
            <h2>Stats screen</h6>
            <image src="demo/About.jpeg" width="200px">
        </td>
        <td>
          About the app.
        </td>
    </tr>
</table>


