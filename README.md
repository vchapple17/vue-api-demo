# Vue / API Demo App


## Composition

This app is based on template created by Vite.js, using `yarn create vite` and selecting Vue and Typescript.


## Getting Started

Install yarn dependencies: `yarn install`.

Run `yarn dev` to start the dev server for this app.


### Status

Began 2/4/2025 - setup initial vite project. Added Game selection interface and proof of concept for drawing cards with API

2/5/2025 - Refactored setup to use piles and show interaction of drawing cards from a pile.

2/6/2025 - Document and tweaks to style


### Refactorings

* Make API calls more resilient by adding param validation and error handling.
* Save the pile information from the API directly, possibly moving into the deck or deck api composables. Then save a separate reactive or computed value for the game piles, if needed.
* Review if it is worth saving the img srcs so they do not need to be fetched repeatedly.
* Fix styling of the game board (currently does not play nice with different screen sizes)


### Potential Features
* Add a view to show a 'hand' that shows X cards face up and spread out like a 'poker' hand.
* Add a War game to flip cards and move the winning cards to the bottom of the winner's pile.
* Add Drag and Drop functionality for cards

