
const { User, Enemy, Character, Game, Item, UserItem }= require ('../models') //no items yet
const sequelize = require ('../config/connection');
const enemyData = require ('./enemyData.json');
const characterData = require('./characterData.json');
const gameData = require('./gameData.json');
const itemData = require('./itemData.json');
const userItemData = require('./userItemData.json');

const seedDatabase = async () => {
    try {
      await sequelize.sync({ force: true });
  
      
      const gamePromises=gameData.map(async (game) => await Game.create({
        ...game,
      }));
      await Promise.all(gamePromises);
 

      const characterPromises = characterData.map(async (chars) => await Character.create({
        ...chars,
      }));
      await Promise.all(characterPromises);
  
      const enemyPromises = enemyData.map(async (enemy) => await Enemy.create({
        ...enemy
      }));
      await Promise.all(enemyPromises);

      const itemPromises = itemData.map(async (item) => await Item.create({
        ...item
      }));
      await Promise.all(itemPromises);

      const userItemPromises = userItemData.map(async (userItem) => await UserItem.create({
        ...userItem
      }));
      await Promise.all(userItemPromises);
    } catch (error) {
      console.error('Failed to seed database:', error);
      process.exit(1);
    }
  
    console.log('Seeding successful!');
    process.exit(0);
  };
  
  seedDatabase();