const briefings = angular.module('login')


briefings.factory('briefingsFactory', ($http) => ({
  // getOnInit: (callback, callback2) => {
  //   //updates user table
  //   $http({
  //     method: 'GET',
  //     url: '/getProfile'
  //   }).then(function successCallback(response) {
  //     callback(response.data)
  //   }, function errorCallback(response) {
  //     console.log(response)
  //   })
  //   //gets userName from server
  //   $http({
  //     method: 'GET',
  //     url: '/getAgentName'
  //   }).then(function successCallback(response) {
  //     console.log(response)
  //     callback2(response.data)
  //   }, function errorCallback(response) {
  //     console.log(response)
  //   })
  // },
}));





briefings.controller('briefingsCtrl', ($scope, briefingsFactory) => {
  $scope.hey ='hey';
  $scope.articles = [
    {
      "source": {
        "id": null,
        "name": "Escapistmagazine.com"
      },
      "author": "Adam Jensen",
      "title": "Has anyone tried to buy a new graphics card lately?",
      "description": "hanselthecaretaker: I suppose I'll have to either bite the bullet or wait for the insanity to end, or at least die down a bit. If you don't want to spend a lot of money, you can get a comparable older model like the Nvidia GTX 970 or AMD R9 290/390. They pref…",
      "url": "http://www.escapistmagazine.com/forums/read/9.1032493-Has-anyone-tried-to-buy-a-new-graphics-card-lately?utm_source=rss&utm_medium=rss&utm_campaign=forums_threads#24181523",
      "urlToImage": "//cdn.themis-media.com/media/global/images/library/deriv/911/911511.jpg",
      "publishedAt": "2017-12-28T21:03:06Z"
    },
    {
      "source": {
        "id": null,
        "name": "Digitaltrends.com"
      },
      "author": "Jayce Wagner",
      "title": "Amid investment frenzy, South Korea bans anonymous cryptocurrency accounts",
      "description": "The South Korean government enacted regulations which will require all cryptocurrency accounts to be associated with real identities. The move comes amid the investment frenzy we've seen in the past few months. The post Amid investment frenzy, South Korea ban…",
      "url": "https://www.digitaltrends.com/computing/south-korea-bans-anon-cryptocurrency/",
      "urlToImage": "https://icdn3.digitaltrends.com/image/bitcoin-on-computer-3-1200x630-c-ar1.91.jpg",
      "publishedAt": "2017-12-28T20:57:05Z"
    },
    {
      "source": {
        "id": null,
        "name": "Slashgear.com"
      },
      "author": "Brittany A. Roston",
      "title": "Can Bitcoin survive the loss of anonymity?",
      "description": "Early on, the most appealing thing about bitcoin was its anonymity, making it the payment of choice for online black markets. The appeal has since broadened, though anonymity remains a key factor for many cryptocurrency users…and it could be anonymity, or the…",
      "url": "https://www.slashgear.com/can-bitcoin-survive-the-loss-of-anonymity-28513090/",
      "urlToImage": "https://c.slashgear.com/wp-content/uploads/2017/12/bitcoin-2643160_1280.jpg",
      "publishedAt": "2017-12-28T20:49:55Z"
    },
    {
      "source": {
        "id": null,
        "name": "Seekingalpha.com"
      },
      "author": "Small Cap Master",
      "title": "The Euphoric High Of Bitcoin: Digital Power's Single Press Release, 650% Gain, And Inevitable Fall From Grace",
      "description": "Digital Power Corp. is up 650% amid speculation that they plan to become a Bitcoin mining juggernaut. Announcement comes at a peculiar time when the company is",
      "url": "https://seekingalpha.com/article/4134306-euphoric-high-bitcoin-digital-powers-single-press-release-650-percent-gain-inevitable-fall",
      "urlToImage": "https://static2.seekingalpha.com/images/marketing_images/fair_use_logos_products/sacl_bitcoin_bitcoin.jpeg",
      "publishedAt": "2017-12-28T20:38:19Z"
    },
    {
      "source": {
        "id": null,
        "name": "Nypost.com"
      },
      "author": "Carleton English",
      "title": "Bitcoin slumps again, this time amid South Korea crackdown",
      "description": "Bitcoin is giving the Winklevoss twins a wild ride — again. The nine-year old cryptocurrency — whose staggering rally this year recently made billionaires out of the Harvard-educated twins — tumbled as much as 10 percent after South Korea’s government warned …",
      "url": "https://nypost.com/2017/12/28/bitcoin-slumps-again-this-time-amid-south-korea-crackdown/",
      "urlToImage": "https://thenypost.files.wordpress.com/2017/12/bitcoin-falls-korean-crackdown.jpg?quality=90&strip=all&w=1200",
      "publishedAt": "2017-12-28T20:36:23Z"
    },
    {
      "source": {
        "id": null,
        "name": "Valuewalk.com"
      },
      "author": "The Foundation for Economic Education",
      "title": "11 Essential Practices To Keep Your Bitcoin Safe",
      "description": "The recent explosion in the price of Bitcoin and other cryptocurrencies has inspired me to start a new hobby: helping people recover lost Bitcoin wallets.    [timeless] [caption id=\"attachment_2020100\" align=\"aligncenter\" width=\"1280\"] MichaelWuensch / Pixaba…",
      "url": "http://www.valuewalk.com/2017/12/11-essential-practices-to-keep-your-bitcoin-safe/",
      "urlToImage": "http://www.valuewalk.com/wp-content/uploads/2017/12/bitcoin_cash_1513890118.jpg",
      "publishedAt": "2017-12-28T20:31:59Z"
    }]
});