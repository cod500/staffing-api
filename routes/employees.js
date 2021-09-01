const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/checkAuth');
const Employee = require('../models/Employee');

router.get("/all-shifts", async (req, res, next) => {
    try {
        const employee = await Employee.find({});
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
});

router.get("/shift-details/:id", async (req, res, next) => {
    try {
        const employee = await Employee.find({ _id: req.params.id });
        console.log(employee)
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
});

router.post("/add-shift", async (req, res, next) => {
    try {
        const employee = new Employee({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            title: req.body.title,
            scheduled: req.body.scheduled.toString(),
            shift: req.body.shift
        });

        await employee.save();
        res.status(200).json({
            message: "Shift succesfully added",
        });
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
});

router.patch("/update-shift/:id", async (req, res, next) => {
    try {

        const id = req.params.id;
        const updateOps = {};

        await Employee.update({ _id: id }, { $set: req.body });
        res.status(200).json({
            message: "Shift updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            error: error
        });
    };
});

router.delete("/delete-shift/:id", async (req, res, next) => {
    try {

        const id = req.params.id;
        await Employee.remove({ _id: id });
        res.status(200).json({
            message: "Shift deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            error: error
        });
    };
});

module.exports = router;

