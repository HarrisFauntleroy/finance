<div align="center">
    <a href="">
        <img src="apps/web/public/images/logo.png?raw=true" alt="" height="140" />
    </a>
    <h5 align="center">
      Alchemical Finance
    </h5>
    <p align="center">
        <a target="_blank" href="">💵</a>
          &middot;
        <a target="_blank" href="">💷</a>
          &middot;
        <a target="_blank" href="">💴</a>
          &middot;
        <a target="_blank" href="">💶</a>
    </p>
</div>

<p align="center">
    <a href="https://github.com/HarrisFauntleroy/alchemical-finance/releases">
        <img alt="GitHub release" src="https://img.shields.io/github/package-json/v/HarrisFauntleroy/alchemical-finance?&style=for-the-badge">
    </a>
    <a href="/LICENSE.md">
        <img alt="GitHub" src="https://img.shields.io/github/license/HarrisFauntleroy/alchemical-finance?&style=for-the-badge">
    </a>
    <a href="https://github.com/HarrisFauntleroy/alchemical-finance/graphs/contributors">
        <img alt="GitHub contributors" src="https://img.shields.io/github/contributors-anon/HarrisFauntleroy/alchemical-finance?&style=for-the-badge">
    </a>
    <a href="https://github.com/HarrisFauntleroy/alchemical-finance/actions">
        <img alt="GitHub branch checks state" src="https://img.shields.io/github/checks-status/HarrisFauntleroy/alchemical-finance/main?&style=for-the-badge">
    </a>
    <a href="https://github.com/HarrisFauntleroy/alchemical-finance/issues?q=is%3Aopen+is%3Aissue">
        <img alt="GitHub issues" src="https://img.shields.io/github/issues/HarrisFauntleroy/alchemical-finance?&style=for-the-badge">
    </a>
    <a href="https://github.com/HarrisFauntleroy/alchemical-finance/issues?q=is%3Aopen+is%3Aissue">
        <img alt="GitHub issues" src="https://img.shields.io/github/last-commit/HarrisFauntleroy/alchemical-finance?&style=for-the-badge">
    </a>
    </a>
    <a href="https://github.com/HarrisFauntleroy/alchemical-finance/issues?q=is%3Aopen+is%3Aissue">
        <img alt="GitHub issues" src="https://img.shields.io/github/commit-activity/w/HarrisFauntleroy/alchemical-finance?&style=for-the-badge">
    </a>
</p>

<!-- PROJECT_DESCRIPTION -->

Welcome to Alchemical Finance - a personal finance management and tracking
platform. We aim to provide an all-encompassing tool to track, manage and
visualize your financial portfolio.

Master your finances with the power of data and simplicity!

<!-- PROJECT_SCREENSHOT -->

<!-- <img src="" alt="Alchemical Finance" title="Alchemical Finance" width="750"/> -->

---

## Table of Contents ⚙️

1. [Features](#features-💫)
2. [Roadmap](#roadmap-🗺️)
3. [Local Development](#local-development-💻)
4. [Contributing](#contributing-🤝)
5. [License](#license-⚖️)
6. [Disclaimer](#disclaimer-🚨)

## Features 💫

- TODO

## Roadmap 🗺️

The following is a tentative roadmap of project development:

1. **Phase 1: Core Features** 🚧  
   Currently under development is the foundation of the website, which includes
   user account creation and management, manual input account tracking, robust
   security features, and a test coverage suite of 100%.

2. **Phase 2: Bank Integration**  
   This phase involves introducing bank APIs to automate transaction and balance
   tracking, with the initial focus on integrating the Up Bank API.

3. **Phase 3: Cryptocurrency Integration**  
   In this phase, selected cryptocurrencies will be integrated, with features
   for crypto wallet integration and automated transaction and balance tracking.

4. **Phase 4: Budgeting Tools**  
   The fourth phase will see the development of budget management features,
   including budget creation and management, expense tracking against the set
   budget, and visual representation of budgets using graphs, pie-charts, etc.

5. **Phase 5: Market Analysis**  
   Lastly, market analysis features will be incorporated, including integration
   of market data feeds, development of market analysis tools for trends and
   forecasts, as well as user-friendly visualization of market data.

_[See the open issues for a list of proposed features (and known issues).](http://github.com/HarrisFauntleroy/alchemical-finance/issues)_

## Local Development 🛠️

Here's how you can set up harrisfauntleroy.com in your local dev environment:

**Installation**

```zsh
# Install dependencies with yarn
yarn install
```

```zsh
# Start development servers (web, api, db, storybook)
yarn dev
```

_Please refer to the package.json for additional details and scripts._

## Trunk-Based Development and Git Hooks

This repository adopts a **Trunk-Based Development** approach to encourage:

- Short-lived branches or direct trunk modifications
- Frequent merges
- High collaboration among developers

### Automated Git Hooks

To maintain code quality, we've set up automated Git hooks that perform the
following tasks before any `git push` operation:

- **Linting**: Enforces a consistent code style across the codebase.
- **Formatting**: Applies standardized code formatting.
- **Testing**: Executes all unit tests to catch regressions and errors at an
  early stage.
- **Building**: Compiles the code and bundles all assets to ensure everything is
  set up correctly.

This automation helps keep our codebase clean, stable, and error-free.

## Contributing 🤝

If you'd like to contribute, please see our
[contribution guidelines](CONTRIBUTING.md) for more information.

## License ⚖️

This software is distributed under the terms of the MIT License. You can see the
full license [here](LICENSE).

## Disclaimer 🚨

This software is currently a work in progress and considered in the ALPHA phase.
As we continue to update and improve, please expect features to evolve and APIs
to change. We appreciate your patience and value your feedback! 🙌
