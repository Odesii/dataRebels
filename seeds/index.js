
const {Enemy, Character, Game, Item}= require ('../models') //no items yet
const sequelize = require ('../config/connection');
const enemyData = require ('./enemyData.json');
const characterData = require('./characterData.json');
const gameData = require('./gameData.json');
const itemData = require('./itemData.json');

const seedDatabase = async () => {
    try {
      await sequelize.sync({ force: true });
  
      
      // const gamePromises=gameData.map(async (game) => await Game.create({
      //   ...game,
      // }));
      // await Promise.all(gamePromises);
      
      await Game.bulkCreate(gameData);

      // const characterPromises = characterData.map(async (chars) => await Character.create({
      //   ...chars,
      // }));
      // await Promise.all(characterPromises);
  
      await Character.bulkCreate(characterData); 

      // const enemyPromises = enemyData.map(async (enemy) => await Enemy.create({
      //   ...enemy
      // }));
      // await Promise.all(enemyPromises);

      await Enemy.bulkCreate(enemyData);

      // const itemPromises = itemData.map(async (item) => await Item.create({
      //   ...item
      // }));
      // await Promise.all(itemPromises);

      await Item.bulkCreate(itemData); 

    } catch (error) {
      console.error('Failed to seed database:', error);
      process.exit(1);
    }
  
    console.log('Seeding successful!');
    process.exit(0);
  };
  
  seedDatabase();