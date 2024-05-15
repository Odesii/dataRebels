const User = require('./User');
const Enemy = require('./Enemy');
const Character = require('./Character')
const Game = require('./Game')
const Item = require('./Item')
const UserItem = require('./UserItem')

Character.hasMany(User, {
    foreignKey:'character_id'
});

User.belongsTo(Character, {
    foreignKey:'character_id'
});

User.hasMany(Game, {
    foreignKey:'user_id'
});

Game.belongsTo(User, {
    foreignKey:'user_id'
});

Enemy.hasMany(Game, {
    foreignKey:'enemy_id'
});

Game.belongsTo(Enemy, {
    foreignKey:'enemy_id'
});

User.belongsToMany(Item, {
    through: UserItem,
    foreignKey: 'user_id'
});

Item.belongsToMany(User, {
    through: UserItem,
    foreignKey: 'item_id'
});


module.exports=  { User, Enemy, Character, Game, Item, UserItem }// not importing over items yet