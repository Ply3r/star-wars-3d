import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import response from '../testData';

export const myContext = createContext();

const INITIAL_STATE = {
  planets: [],
  filters: {
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
    order: {
      column: 'name',
      sort: 'ASC',
    },
  },
};

const MyProvider = ({ children }) => {
  const [header, setHeader] = useState(INITIAL_STATE);
  const [data, setData] = useState([]);
  const [actualPosition, setActualPosition] = useState(0)

  const updatePlanets = () => {
    const planets = response.results;
    const newHeader = {
      ...header,
      planets,
    };
    setHeader(newHeader);
    setData(planets);
  };

  const setFilter = (filters) => {
    const newFilter = {
      ...header,
      filters,
    };
    setHeader(newFilter);
  };

  useEffect(updatePlanets, []);

  const { filters, planets } = header;

  const value = {
    data,
    planets,
    actualPosition,
    header,
    filters,
    setActualPosition,
    setFilter,
    setData,
  };

  return (
    <myContext.Provider value={ value }>
      { children }
    </myContext.Provider>
  );
};

export default MyProvider;

MyProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
