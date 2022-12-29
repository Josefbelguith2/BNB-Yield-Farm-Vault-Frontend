# Staking Frontend Template

# Instructions

### Contracts

To access the contract instances, add the contract addresses to the `config.ts`:

```JavaScript
export const ContractAddress = {
  Token: '<-- Token Contract Address -->',
  StakingRewards: '<-- Staking Rewards Contract Address -->',
};
```

You can access the contract instances from the `instances` property of the `Contracts` class.

```JavaScript
import Contracts from 'helpers/contracts';

const contracts = Contracts.instances;
contracts.ContractName.method()
```

### Restricting Access to Chains

If you'd like to restrict access to certain chains, you can add the chain id of that chain that you would like the user to access in the following format in the `config.ts` file to the `allowedChains` array.

If the array is empty, all the chains will be available.

```JavaScript
export const allowedChains: AllowedChainConfig[] = [
  {
    id: ChainID,
    name: 'ChainName',
  },

  // more chains
];
```

### Updating the UI

Add the logo to the `assets/` directory named as `Logo.svg`.

You can customize the UI with necessary data by updating the `APP_CONFIG` object in the `config.ts` file.

```JavaScript
import logo from 'assets/Logo.svg';

export const APP_CONFIG = {
  COMPANY: {
    NAME: 'Company Name',
    LOGO: logo,
  },
  STAKING_TOKEN: '<-- Staking Token Label -->',
  REWARD_TOKEN: '<-- Reward Token Label -->',
};
```

You can update the primary color of the application by updating the `primaryColor` variable in the `variables.scss` file.

```scss
$primaryColor: #000;
```

# Available Scripts

In the project directory, you can run:

### `yarn run generate`

Generates the types for the abis added in the `src/abis/` directory. The generated types will be available in the `src/types/` directory.

### `yarn start` or `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
