# Opening Moves

## Live Link:
[Opening Moves Live](https://openingmoves.herokuapp.com/)

## Summary:
Opening Moves is stock data visualization tool for finding trends and patterns across morning stock volatility. Users can specify input parameters and the application will render a set of matching charts. Please open the app for more detailed instructions or read on to learn more about Opening Moves!

## Table of contents:

 1. [Features](#features)
    - [Intoduction Modal](#introduction-modal)
    - [Custom Data Filters](#data-entry)
    - [Charts](#charts)
    - [Loading Modal](#loading-modal)
    - [Data Summary](data-summary)
 2. [Tech Stack](#tech-stack])
    - [Backend](#backend)
    - [Frontend](#frontend)
 4. [Upcoming Features](#upcoming-features) (coming soon!)

## Features:

### Instroduction Modal

![introduction](public/images/introduction_modal.PNG)

## Tech Stack:
### Front-End:
This app is built nearly entirely Vanilla Javascript on the frontend. There are no major frameworks or librarys supporting DOM manipulation. The only exception to this is d3.js is used to draw the shapes for the graphs.

### Back End:
This app has a very light-weight express backend which is used simply for the purposes of making api requests and filtering responses.
