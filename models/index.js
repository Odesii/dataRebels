const User= require('./User');
const Enemy = require('./Enemy');
const Character= require('./Character')
const Game= require('./Game')
// import Item from './Item'

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

// Game.hasMany(Item,{
//     foreignKey:'item_id'
// });

// Item.belongsTo(Game,{
//     foreignKey:'item_id'
// });

module.exports=  {User, Enemy, Character, Game}// not importing over items yet