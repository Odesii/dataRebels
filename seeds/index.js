
const {User, Enemy, Character,Game}= require ('../models') //no items yet
const sequelize=require ('../config/connection')
const userData = require ('./userData.json')
const enemyData= require ('./enemyData.json')
const characterData = require('./characterData.json')
const gameData=require('./gameData.json')
// import itemData from './itemData.json'

const seedDatabase = async () => {
    try {
      await sequelize.sync({ force: true });
  
      const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
      });
      
      const gamePromises=gameData.map(game=>Game.create({
        ...game,
        character_id: users.id,
      }));
      await Promise.all(gamePromises);
 

      const characterPromises = characterData.map(chars => Character.create({
        ...chars,
        user_id: users.id,
      }));
      await Promise.all(characterPromises);
  
      const enemyPromises = enemyData.map(enemy => Enemy.create({
        ...enemy
      }));
      await Promise.all(enemyPromises);
    } catch (error) {
      console.error('Failed to seed database:', error);
      process.exit(1);
    }
  
    console.log('Seeding successful!');
    process.exit(0);
  };
  
  seedDatabase();