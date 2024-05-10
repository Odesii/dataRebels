const router = require('express').Router();
const { User, Item, UserItem } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const userData = await UserItem.findOne({
            where: {
                user_id: req.session.user_id
            }
        });

        if (userData) {
           return res.status(200).json(userData);
        }

        const itemData = await Item.findAll({});

        const userItemData = itemData.map((item) => UserItem.create({
            item_id: item.id,
            user_id: req.session.user_id,
            cost: item.cost,
            quantity: 0
        }))
        await Promise.all(userItemData);

        res.status(200).json(userItemData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const userItem = await UserItem.findOne({
            where: {
                item_id: req.params.id,
                user_id: req.session.user_id
            }
        });

        const userData = await User.findOne({
            where: {
                id: req.session.user_id
            }
        })

        if (userData.credits - userItem.cost < 0) {
            res.status(500).json(userData);
        }

        else {
            const userDataUpdate = await User.update(
                {
                    credits: userData.credits - userItem.cost
                },
                {
                    where: {
                        id: req.session.user_id
                    }
                }
            )

            const userItemData = await UserItem.update(
                {
                    quantity: userItem.quantity + 1,
                    cost: userItem.cost + 25
                },
                {
                    where: {
                        item_id: req.params.id,
                        user_id: req.session.user_id
                    }
                }
            );

            res.status(200).json(userItemData);
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;