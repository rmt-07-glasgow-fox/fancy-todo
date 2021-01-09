const { Todo } = require('../models');
const axios = require('axios');

class TodoController {
    static async getAll(req, res, next) {
        try {
            const data = await Todo.findAll({
                where: { userId: req.user.id },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                order: [
                    ['status', 'asc'],
                    ['title', 'asc']
                ]
            })
            return res.status(200).json({
                status: 'success',
                data
            })
        } catch (err) {
            return next(err)
        }
    }

    static async getAllMovie(req, res, next) {
        try {
            let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_KEY}&language=en-US&query=${req.query.search}`
            const movie = await axios.get(url);

            return res.status(200).json(movie.data)
        } catch (error) {
            next(error)
        }
    }

    static async get(req, res, next) {
        try {
            const data = await Todo.findByPk(+req.params.id, {
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            });

            if (!data) return next({ name: 'notFound' })

            return res.status(200).json({
                status: 'success',
                data
            })
        } catch (err) {
            return next(err)
        }
    }

    static async store(req, res, next) {
        try {
            const { title, description, status, due_date, movieId } = req.body;
            const movieName = await TodoController.findMovie(movieId);

            const input = { title, description, status, due_date, movieId, movieName, userId: req.user.id };
            const data = await Todo.create(input);

            return res.status(201).json({
                status: 'success',
                data
            })

        } catch (err) {
            return next(err)
        }
    }

    static async update(req, res, next) {
        try {
            const id = req.params.id;
            const { title, description, status, due_date, movieId } = req.body;
            const movieName = await TodoController.findMovie(movieId);

            const input = { title, description, status, due_date, movieId, movieName };

            const data = await Todo.findByPk(id, {
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            });

            if (!data) return next({ name: 'notFound' })

            await Todo.update(input, { where: { id } })
            await data.reload();

            return res.status(200).json({
                status: 'success',
                message: 'todo updated successfully',
                data
            })

        } catch (err) {
            return next(err)
        }
    }

    static async updateStatus(req, res, next) {
        try {
            const id = req.params.id
            const { status } = req.body;
            const input = { status };
            const data = await Todo.findByPk(id, {
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            })

            if (!data) return next({ name: 'notFound' })

            await Todo.update(input, { where: { id } })
            await data.reload();


            return res.status(200).json({
                status: 'success',
                message: 'todo updated successfully',
                data
            })
        } catch (err) {
            return next(err)
        }
    }

    static async destroy(req, res) {
        try {
            const data = await Todo.findByPk(+req.params.id);

            if (!data) return next({ name: 'notFound' })

            data.destroy();

            return res.status(200).json({
                status: 'success',
                message: 'todo successfully deleted'
            })

        } catch (err) {
            return next(err)
        }
    }

    static async findMovie(movieId) {
        try {
            const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.MOVIE_KEY}&language=en-US`
            const movie = await axios.get(url);
            return movie.data.title
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TodoController;