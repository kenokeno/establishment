
let Realm = require('realm');

export const realm = new Realm({
    path: 'db.realm',
    schema: [
    ],
    schemaVersion: 1
});