# Mzawadi Loyalty Assignment

## Front End For the Mzawadi Loyalty Assignment

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) (>= 16.15.0)
- [NPM](https://www.npmjs.com/get-npm)
- [Vue](https://vuejs.org) (>= 3.4.12)
- [Git](https://git-scm.com/downloads)
- [VS Code](https://code.visualstudio.com/download) (Recommended)
- Browser (Chrome (Recommended), Firefox, Edge, Safari)
- [mzawadi-assignment-back-end](https://github.com/phanuell-365/mzawadi-assignment-back-end.git)

## Project Setup

Please ensure that you have the prerequisites installed before proceeding with the installation.

- Clone the repository

```bash
git clone https://github.com/phanuell-365/mzawadi-assignment-back-end.git
```

- Enter the project directory

```bash
cd mzawadi-assignment-front-end
```

- Install the dependencies

```bash
npm install
```

- To run the application in development mode

```bash
npm run dev
```

- To build the application for production

```bash
npm run build;
```

- To run the application in production mode

```bash
npm run preview
```

## Testing

- There are no available tests for this project at the moment.

## Launching the application

- The application will be launched on port 4173 by default when running on production mode, and 5173 while running in
  development mode. You can change the port by setting the `PORT` environment variable.
- To view the application, open your browser and navigate to `http://localhost:4173/login`
  or `http://localhost:5173/login` depending on the mode you are running the application in.

### Login Credentials

- By default, the application comes with a default user with the following credentials:

```
email: administrator@localhost.com
password: admin
username: Admin
```

- There is only a single user in the system, you can only update the user's details.
- Adding new users will be implemented in the next release.

# User Guide

## Dashboard

- The dashboard is the first page you will see when you log in to the application.
- The dashboard displays the total number of distributors, total number of consumers, and the total amount of products
  registered in the system.

## Distributors

- The distributors page displays all the distributors and their attributes added into the system.
- Hovering over a distributor will display an edit button, clicking on the edit button will open a modal where you can
  update the distributor's details.
- `Add Distributor` button will open a modal where you can add a new distributor to the system.
- `Delete` - This will be implemented in the next release.

## Consumers

- The consumers page displays all the consumers and their attributes added into the system.
- Hovering over a consumer will display an edit button, clicking on the edit button will open a modal where you can
  update
  the consumer's details.
- `Add Consumer` button will open a modal where you can add a new consumer to the system.
- `Delete` - This will be implemented in the next release.

## Products

- The products page displays all the products and their attributes added into the system.
- Hovering over a product will display an edit button, clicking on the edit button will open a modal where you can
  update
  the product's details.
- `Add Product` button will open a modal where you can add a new product to the system.
- `Delete` - This will be implemented in the next release.

## Rewards

- The rewards page displays all the rewards and awarding history for each distributor after they have capped the
  required
  sales target for a product.
- Hovering over a reward will display a view button which will open a modal displaying the reward details.
- `Delete` - This will be implemented in the next release.

## Targets

- The targets page displays all the targets for each distributor for each product.
- Hovering over a target will display an edit button, clicking on the edit button will open a modal where you can update
  the target's details.
- `Add Target` button will open a modal where you can add a new target to the system.
- `Delete` - This will be implemented in the next release.

## Points

- The points page displays all the points for each consumer for each product.
- Hovering over a point will display a view button which will open a modal displaying the point details.
- `Delete` - This will be implemented in the next release.

## Sales

- The sales page displays all the sales for each distributor for each product to a consumer.
- Hovering over a sale will display a view button which will open a modal displaying the sale details.
- `Delete` - This will be implemented in the next release.
- `Add Sale` button will open a modal where you can add a new sale to the system.

## Users

- The users page displays all the users and their attributes added into the system.
- Currently, there is only a single user in the system, you can only update the user's details.
- Hovering over a user will display an edit button, clicking on the edit button will open a modal where you can update
  the
  user's details.
- `Add User` - This will be implemented in the next release.
- `Delete` - This will be implemented in the next release.

## Side Menu

- The side menu displays the following options:
    - Dashboard
    - Distributors
    - Consumers
    - Products
    - Rewards
    - Targets
    - Points
    - Sales
    - Users
    - Toggle Dark Mode (This setting will be saved in the browser's local storage)

## Dark Mode

- The application supports dark mode, you can toggle dark mode by clicking on the toggle button in the side menu.
- The dark mode setting will be saved in the browser's local storage, so you don't have to toggle it every time you
  visit
  the application, unless you the authentication token expires.
- The dark mode setting will be applied to the entire application.

## Logout

- You can log out of the application by clicking on the logout button in the side menu.
- This will clear the authentication token from the browser's local storage, and redirect you to the login page.
- You will have to log in again to access the application.
- The dark mode setting will be reset to light mode on logout.

## Authentication

- The application uses JWT authentication, the authentication token is stored in the browser's local storage.
- The authentication token expires after 1 hour, you will have to log in again to access the application.
- The dark mode setting will be reset to light mode on logout.
- The authentication token is sent in the `Authorization` header of every request to the API.
- The authentication token is also sent in the `Authorization` header of every request to the API when the application
  is
  running in development mode or production mode.
- Clearing the browser's local storage will log you out of the application.

## API Documentation

- The API documentation will be implemented in the next release.
- The API documentation will be available at `http://localhost:4173/api-docs` when running in production mode, and
  `http://localhost:5173/api-docs` when running in development mode.

## Author

- [phanuell-365](https://github.com/phanuell-365/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
