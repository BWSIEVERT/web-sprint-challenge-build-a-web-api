// Write your "projects" router here!

// Express
const express = require("express");
const router = express.Router();

// Connecting to db
const Project = require("./projects-model");

router.get('/', (req, res) => {
    Project.get()
        .then(projects => {
            if (projects) {
                res.status(200).json(projects)
            } else {
                res.status(404).json({
                    message: 'No projects found'
                })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: 'Error retrieving projects'
            })
        })
})

router.get('/:id', (req, res) => {
    Project.get(req.params.id)
        .then(project => {
            if (project) {
                res.status(200).json(project)
            } else {
                res.status(404).json({
                    message: `Project with id of ${req.params.id} not found`
                })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: 'Error retrieving project'
            })
        })
})

router.post('/', (req, res) => {
    Project.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: 'Error adding project'
            })
        })
})

router.delete('/:id', (req, res) => {
    Project.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({
                    message: `Project with id of ${req.params.id} has been removed`
                })
            } else {
                res.status(400).json({
                    message: `Project with id of ${req.params.id} could not be found`
                })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: 'Error removing the project'
            })
        })
})

router.put('/:id', (req, res) => {
    const changes = req.body
    Project.update(req.params.id, changes)
        .then(project => {
            if (project) {
                res.status(200).json(project)
            } else {
                res.status(400).json({
                    message: `Project with id of ${req.params.id} could not be found, therefore cannot be updated.`
                })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: 'Error updating project'
            })
        })
})

router.get('/:id/actions', (req, res) => {
    Project.getProjectActions(req.params.id)
        .then(project => {
            if (project) {
                res.status(200).json(project)
            } else {
                res.status(400).json({
                    message: `Project Actions with id of ${req.params.id} could not be found`
                })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: 'Error retrieving project actions'
            })
        })
})




module.exports = router