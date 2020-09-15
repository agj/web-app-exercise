
This was a practical exercise in using some front-end web development frameworks and libraries I had no experience using previously. View it online at [agj.github.io/web-app-exercise/](https://agj.github.io/web-app-exercise/).

✒︎ Este fue un ejercicio práctico para aprender a usar algunas tecnologías de desarrollo web front-end con las que no tenía experiencia. Puedes verlo online en [agj.github.io/web-app-exercise/](https://agj.github.io/web-app-exercise/).


## Technologies used / ✒︎ Tecnologías utilizadas

- [React](https://reactjs.org/) ([create-react-app](https://create-react-app.dev/))
- [Redux](https://redux.js.org/) (+ [React Redux](https://react-redux.js.org/), [Redux Toolkit](https://redux-toolkit.js.org/))
- [React Router](https://reactrouter.com/)
- [reactstrap](https://reactstrap.github.io/) ([Bootstrap](https://getbootstrap.com/))
- [Ramda](https://ramdajs.com/)
- [vx](https://vx-demo.now.sh/)

## To build / ✒︎ Para compilar

A `.env.local` text file with an [OpenWeather](https://openweathermap.org/) API key is needed at the repository's root. Create the file with the format as below, adding the actual API key to the right of the `=` sign.

✒︎ ︎Se necesita un archivo de texto de nombre `.env.local` con la llave de la API de [OpenWeather](https://openweathermap.org/) en la raíz del repositorio. Crea el archivo con el formato que se ve abajo, añadiendo la llave a la derecha del signo `=`.

```
REACT_APP_OPENWEATHERMAP_API_KEY=
```

Afterward, run `npm run build` at the command line to make a build, or `npm start` to start a development server.

✒︎ Después puedes usar en la línea de comandos `npm run build` para compilar, o `npm start` para iniciar un servidor de desarrollo.
