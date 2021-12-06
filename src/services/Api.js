const getPlanets = () => (
  fetch('https://swapi-trybe.herokuapp.com/api/planets/')
    .then((res) => res.json())
    .then((res) => res.results)
);

export default getPlanets;
