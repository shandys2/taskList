const pool = require('../db');

const getAllTasks = async (req, res, next) => {

    try {
        const result = await pool.query('SELECT * FROM task');
        res.json(result.rows);
    } catch (error) {
        next(error)
    }
}

const getTask = async (req, res, next) => {
    const { id } = req.params
    try {
        const result = await pool.query('SELECT * FROM task WHERE id=$1', [id]);
        if (result.rows.length === 0) {
            res.status(404).json({
                message: "Task not found"
            })
        }
        res.json(result.rows[0]);
    } catch (error) {
        next(error)
    }
};

const createTask = async (req, res, next) => {

    try {
        const { title, description } = req.body;
        const result = await pool.query('INSERT INTO task (title, description) VALUES ($1 ,$2) RETURNING *', [title, description]);
        res.json(result.rows[0]);
    } catch (error) {
        next(error)
    }
}

const updateTask = async (req, res) => {

    try {
        const { id } = req.params
        const { title, description } = req.body;

       /* if (!Number.isInteger(id)) {
            return res.status(404).json({
                message: "Bad id, must be an integer"
            })
        }
       */
        const result = await pool.query('UPDATE task SET title =$1, description=$2 WHERE id = $3 RETURNING *', [title, description, id])
        console.log(result)
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Task not found"
            })
        }

        res.json(result.rows[0])
    } catch (error) {

    }
}

const deleteTask = async (req, res) => {

    try {
        const { id } = req.params
        const result = await pool.query('DELETE FROM task WHERE id=$1', [id]);
        console.log(result)
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Task not found"
            })
        }
        res.sendStatus(204);
    } catch (error) {
        res.json({ error: error.message })
    }
}

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}