# Survey Challenge

This project is intended to help a survey company to make a new quiz form that rewards users with ERC-20 tokens for participating in the survey.

The project was created with [Create React App](https://github.com/facebook/create-react-app) by [Lucas Del Rio](https://github.com/lucasjdelri0).

## Solution

### Connection

You can connect to the dApp through any MetaMask account.\
Once connected, the application detects if you are on Ropsten, and displays a button to automatically switch networks if you are not.

> NOTES:
>
> - You need to have the [MetaMask](https://metamask.io/download/) extension installed with one configured account at least.
> - Every time you switch networks, the page is going to reload due to MetaMask recommendations. See more in [MetaMask Docs](https://docs.metamask.io/guide/ethereum-provider.html#chainchanged).
> - If you change your active MetaMask account, the page will be reloaded, and you will have to connect that account if you have not done so previously.

### Tokens

Users can see both rETH and QUIZ balances at any time in the header section.\
Balances are updated after each successful transaction (i.e. survey submission).

> NOTES:
>
> - This application was developed to use Ropsten Testnet (rETH as native token)
> - If you need rETH to transact and try the app, here is a [Faucet](https://faucet.egorfine.com/) you can use. Just put you address and claim for the tokens.

### Surveys

Users can take daily surveys and submit their answers to earn QUIZ.\
Each question will be available for the number of seconds indicated in the lifetimeSeconds property.\
Once the survey is finished, the user can see an overview of all his answers to send them to the validator contract, earning QUIZ as a reward.

> NOTES:
>
> - The daily surveys are randomly loaded from the `survey-sample.json` file as the challenge suggests.
> - You can add more surveys, questions, or options by modifying the `survey-sample.json` file.
> - The validator contract rewards 1 QUIZ for each survey submission.
> - The validator contract has a cooldown period of 3600 seconds to receive new submissions and provide rewards from and to the same account.

### Routes

A single path is used due to the complexity of maintaining a dynamic path registry and protecting those paths to ensure a sequential access.

### State Management

Due to the decision to use a single path, it was not necessary to make use of a library for state management.\
The components local state allows us to keep in memory the answers to each question, which will then be sent to the validating contract.\
A simple but scalable solution is proposed, which is not affected by the number of questions or options included in the survey.

### Environment Variables

No environment variables are required since the validator contract [QUIZ](https://ropsten.etherscan.io/address/0x74f0b668ea3053052deaa5eedd1815f579f0ee03) is already deployed in the Ropsten network.\
Knowing its address in the Ropsten network and its ABI we can already create an instance of it to read and write from and to it.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn lint`

Instructs ESLint to identify and try to fix as many issues as possible in .js, .jsx, .ts, and .tsx files.

### `yarn format:check`

Check if your files are formatted to the intended Prettier config, and get a list of the unformatted files, if any.

### `yarn format:write`

Format all your files to the intended Prettier config.

> NOTES:
>
> - Use .eslintignore and .prettierignore to ignore files that should not be analyzed and/or formatted

## Vercel Deployment

You can access a production deployment in [Vercel](http://survey-company-challenge.vercel.app/) for a quick testing.

## Resources

[Survey Contract Repo](https://github.com/rather-labs/blockchain-challenge-utils)

[Survey Sample](https://github.com/rather-labs/blockchain-challenge-utils/blob/main/survey-sample.json)

[$QUIZ Token in Ropsten](https://ropsten.etherscan.io/address/0x74f0b668ea3053052deaa5eedd1815f579f0ee03)

[$QUIZ Token ABI](https://ropsten.etherscan.io/address/0x74f0b668ea3053052deaa5eedd1815f579f0ee03#code)

[MetaMask API Reference](https://docs.metamask.io/guide/ethereum-provider.html#methods)

[Ethers.js Docs](https://docs.ethers.io/v5/)

[Ethereum RPC Errors](https://github.com/MetaMask/eth-rpc-errors)

[AntDesing Docs](https://ant.design/docs/react/introduce)

[AntDesing Components](https://ant.design/components/overview/)

[ESLint Rules](https://eslint.org/docs/latest/rules/)

[Prettier Options](https://prettier.io/docs/en/options.html)
