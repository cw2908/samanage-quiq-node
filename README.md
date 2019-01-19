# Samanage<>Quiq Chat integration

Receive closed chats from quiq and create them as incidents


### Installation
1) Install NodeJS 11.3.0+ (https://nodejs.org/en/download/) or `brew install node` etc
2) Install yarn `npm install -g yarn`
3) Clone this repo `git clone https://github.com/cw2908/samanage-quiq-node my-app-folder`
4) Build dependencies `cd my-app-folder && yarn`
5) Create Conversation Status Changed (Conversation Closed) Webhook in Quiq admin panel and to point to your server (ie https://the-server.com/api/samanage) See: https://developers.goquiq.com/api/docs#operation/Webhook%20-%20ConversationStatusChanged for reference


### Starting the application
Run with `yarn start`


### Tests
Run tests with `yarn test` or `yarn watch`

