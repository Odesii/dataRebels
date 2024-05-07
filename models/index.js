const User= require('./User');
const Enemy = require('./Enemy');
const Character= require('./Character')
const Game= require('./Game')
// import Item from './Item'


Character.hasMany(User,{
    foreignKey:'character_id'
});

User.belongsTo(Character,{
    foreignKey:'character_id'
});

Character.hasOne(Game,{
    foreignKey:'character_id'
});

Game.belongsTo(Character,{
    foreignKey:'character_id'
});

Game.hasOne(Enemy,{
    foreignKey:'game_id'
});

Enemy.belongsTo(Game,{
foreignKey:'game_id'
});

// Game.hasMany(Item,{
//     foreignKey:'item_id'
// });

// Item.belongsTo(Game,{
//     foreignKey:'item_id'
// });

module.exports=  {User, Enemy, Character,Game}// not importing over items yet