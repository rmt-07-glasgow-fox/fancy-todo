const { Todo } = require("../models");
const axios = require("axios");
const nameSplit = require("../helpers/nameSplit");

class TodoController {
  static home(req, res) {
    axios
      .get("https://icanhazdadjoke.com/", {
        headers: {
          Accept: "application/json",
        },
      })
      .then(({ data }) => {
        res.status(200).json({
          message: "Greetings!",
          joke: data.joke,
        });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static addTodo(req, res, next) {
    let { title, description, status, due_date } = req.body;

    let newTodo = {
      title,
      description,
      status,
      due_date,
      UserId: req.user.id,
    };

    Todo.create(newTodo)
      .then((added) => {
        return res.status(201).json(added);
      })
      .catch((err) => {
        next(err);
      });
  }

  static listTodo(req, res, next) {
    let joke;
    let { firstName, lastName } = nameSplit(req.user.fullName);
    let openWeather;

    const options = {
      method: "GET",
      url: "https://community-open-weather-map.p.rapidapi.com/weather",
      params: {
        q: "Jakarta, Indonesia",
        lat: "0",
        lon: "0",
        id: "2172797",
        lang: "null",
        units: "metric",
        mode: "",
      },
      headers: {
        "x-rapidapi-key": process.env.OPENWEATHER_API_KEY,
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
      },
    };

    axios
      .get(
        `http://api.icndb.com/jokes/random?escape=javascript&firstName=${firstName}&lastName=${lastName}`
      )
      .then(({ data }) => {
        joke = data.value.joke;
        return axios.request(options);
      })
      .then(({ data }) => {
        openWeather = data;
        return Todo.findAll();
      })
      .then((todoList) => {
        return res.status(200).json({
          joke,
          openWeather : {
            weather: openWeather.weather,
            main: openWeather.main,
            city: openWeather.name
          },
          todoList,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static detailTodo(req, res, next) {
    const id = +req.params.id;
    Todo.findByPk(id)
      .then((todoData) => {
        if (todoData) {
          return res.status(200).json(todoData);
        }
        next({
          name: "NotFound",
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static updateTodo(req, res, next) {
    const id = +req.params.id;
    const { title, description, status, due_date } = req.body;

    Todo.update(
      {
        title,
        description,
        status,
        due_date,
      },
      {
        where: { id },
        returning: true,
      }
    )
      .then((result) => {
        if (result) {
          return res.status(200).json(result[1]);
        } else {
          next({
            name: "NotFound",
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static changeStatusTodo(req, res, next) {
    const id = +req.params.id;
    const { status } = req.body;

    Todo.update(
      {
        status,
      },
      {
        where: { id },
        returning: true,
      }
    )
      .then((result) => {
        if (result) {
          return res.status(200).json(result[1]);
        } else {
          next({
            name: "NotFound",
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static deleteTodo(req, res, next) {
    const id = +req.params.id;

    Todo.destroy({
      where: { id },
    })
      .then((result) => {
        if (result === 1) {
          return res.status(200).json({
            message: "Todo is successfully deleted",
          });
        } else {
          next({
            name: "NotFound",
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = TodoController;
