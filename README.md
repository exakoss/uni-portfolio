![alt logo text](https://github.com/exakoss/x-portfolio/blob/main/assets/xportfolio256.png?raw=true)
X PORTFOLIO MOBILE
***Totally mobile, free and decentralized***

**Functionality**:

-Portfolio
    Allows you to create or import an Ethereum wallet.
    Displays ERC-20 and ERC-721 tokens.
    Powers Synthetix Trading.

-Trading
    Trade derivatives with infinite liquidity -- powered by the Synthetix protocol.
    Get a list of all synths and their quotes. 
    Clicking on a synth takes you to a separate screen with more data and trading options.

-Search
    Search through ERC-20 tokens by a ticker or name.
    Powered by Uniswap V2's subgraph.
    Displays a list of basic data for the tokens that fit the search criteria.
    Each token is clickable and takes you to a separate screen with more detailed token data.
    Allows you to add tokens into Watchlist.

-Watchlist
    Customized list of ERC-20 tokens that have been added from the Search.
    Saves the list of tokens to the device memory.

**Technical specs**:
    Frontend -- React Native, Expo, React Navigation, Redux
    API -- Graphql, Apollo client, Alchemy(setting up ethers.js + testnet data)
    Ethereum -- ethers.js, TheGraph, @synthetixio/js, synthetix-data(powered by TheGraph)
    
**Roadmap**:
    Add search of ERC-20 tokens by name -- Q2 2021 
    Sorting options for both synth and ERC-20 lists  -- Q2 2021
    Price chart (line and candlestick) for every token -- Q2 2021
    Add an image for every token -- Q2 2021
    Rework fetching synth data with GraphQL or @synthetixio/data(once it is out) -- Q2 2021
    Upgrade Portfolio to display more sophisticated analytics -- Q2 2021
    Hire a UI/UX expert to enhance app's interface -- Q2 2021
    Add support for all synthetix markets and options -- Q2 2021
    Add support for synthetix staking -- Q2 2021
    Build a smartcontract that will use Chainlink data to mint a NFT and
    send it to a created wallet as an incentive -- Q3 2021

**Installation and start**
    0) Install or update expo cli with ```npm install expo-cli```
    1)Download the repository and cd into it
    2) Run ```npm install``` to download the  dependencies
    3) Create a *.env* file in the root folder and add a variable ```ALCHEMY_MAINNET_KEY=yourApiKey```  with your api link
    You can get a free Ethereum API key from [Alchemy](https://www.alchemyapi.io/) or [Infura](https://infura.io/)
    4) (Optional) Add ```ALCHEMY_KOVAN_KEY=yourKovanApiKey``` and ```ALCHEMY_RINKEBY_KEY=yourRinkebyApiKey``` in the same fashion
    if you want to connect to the one of the test networks
    5) Run ```expo start``` to deploy a dev expo cli server
    6) Download an expo app on your device and scan the QR code to open the app, or use one of the emulator options
