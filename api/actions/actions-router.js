// Write your "actions" router here!

// Express
const express = require("express");
const router = express.Router();

// Connecting to db
const Action = require("./actions-model");

// Middleware


router.get("/", async (req, res) => {
  try {
    const actions = await Action.get();
    if (actions) {
      res.status(200).json(actions);
    } else {
      res.status(500).json({
        message: "Failed to successfully GET actions",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const action = await Action.get(id);
  if (action) {
    res.status(200).json(action);
  } else {
    res.status(404).json({
      message: `An action with the id of ( ${id} ) could not be found!`,
    });
  }
});

router.post("/", (req, res) => {
  Action.insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        message: error.message
      });
    });
});

router.put('/:id', (req, res) => {
    const changes = req.body
    const { id } = req.params
    Action.update(id, changes)
        .then(action => {
            if (action) {
                res.status(300).json({
                    message: `Action with ${id} has bee updated`
                })
            } else {
                res.status(400).json({
                    message: `No action found with id of ${id}`
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Error updating status'
            })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    Action.remove(id)
        .then(action => {
            if (action > 0) {
                res.status(200).json({
                    message: `Action with id of ${id} has been removed`
                })
            }
        })
})



module.exports = router;
