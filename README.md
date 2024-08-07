# random-game-picker

Simple node.JS script to fetch a random game from MobyGames, IGDB.com or RAWG.io

Moby is given more priority because it is more established, IGDB.com next as it has more relevant games for the most part. However RAWG will pop up too for the more obscure games.
Make sure you have [NodeJS](https://nodejs.org/en/) installed.

To start getting random games, do the following:

1. Run `npm install axios`
2. Run `npm install open`
3. Run `npm install weighted-random`
4. [Sign up](https://www.mobygames.com/user/register/) for a MobyGames account if you do not already have one, otherwise, login.
5. [Request] an API key from your MobyGames profile page.
6. [Sign up](https://dev.twitch.tv/login) for a Twitch account if you do not already have one, otherwise, login.
7. [Enable Two Factor](https://www.twitch.tv/settings/security) auth on your Twitch account.
8. [Register](https://dev.twitch.tv/console/apps/create) an application for your gamepicker app.
   1. OAuth Redirect URLs can just be http://localhost.
   2. Category can be `Application Integration`
9. Generate a Client Secret.
7. [Sign up](https://rawg.io/signup) for a RAWG account if you do not already have one, otherwise, login.
8. [Request](https://rawg.io/apikey) an API key from RAWG.
   1. URL can just be http://localhost.
   2. You may need to provide other PII (personally identifiable information)
10.  Open `gamepicker.bat` and change the line `cd [YOUR_PATH_HERE]` to reflect the directory where the folder was cloned to. (This is useful because you can move the batch file elsewhere, and create shortcuts to run the batch file)
11.  Open `gamepicker.js` and change the constant `mobyApiKey` to reflect the API key you requested from MobyGames. It can be found on your Profile page.
12. Open `gamepicker.js` and change the constants `twitchClientID` and `twitchClientSecret` to reflect the client ID and the client secret you generated for Twitch. These can both be found on the screen that you generated the secret.
13. While still viewing `gamepicker.js` change the constant `rawgApiKey` to reflect the API key you requested for RAWG. It can be found on the API key page after you have requested one.
14. Run `node gamepicker.js`

Your default browser will automatically open to the page on either [MobyGames](https://mobygames.com) or [IGDB](https://www.igdb.com) or [RAWG.io](https://rawg.io) for the game that was selected! **NOTE:** Be aware that RAWG is poorly
hosted and unmaintained for a long period of time. It often fails to return a result. If this happens to you, generate a game from one of the other databases and try again later.

Have fun gaming!!
