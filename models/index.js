import User from './User';
import Enemy from './Enemy'
import Character from './Character'
import Game from './Game'
import Item from './Item'

User.hasOne(Character,{
    foreignKey:'user_id',
    onDelete:'CASCADE'
});

Character.belongsTo(User,{
    foreignKey:'user_id'
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

Game.hasMany(Item,{
    foreignKey:'item_id'
});

Item.belongsTo(Game,{
    foreignKey:'item_id'
});

export default {User, Enemy, Character, Item, Game}