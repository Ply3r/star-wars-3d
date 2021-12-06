import React, { useContext, useEffect, useState } from 'react';
import { myContext } from '../context/MyProvider';

const Filter = () => {
  const { filters, setActualPosition, setFilter, setData, planets } = useContext(myContext);
  const [name, setName] = useState('');
  const [columnFilter, setColumnFilter] = useState('rotation_period');
  const [comparisionFilter, setComparisionFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState('');
  const [columnSort, setColumnSort] = useState('name');
  const [direction, setDirection] = useState('ASC');
  const { filterByNumericValues } = filters;

  const changeName = (newName) => {
    const newFilter = {
      ...filters,
      filterByName: {
        name: newName,
      },
    };
    setFilter(newFilter);
  };

  const changeOrder = () => {
    const newFilter = {
      ...filters,
      order: {
        column: columnSort,
        sort: direction,
      },
    };
    setFilter(newFilter);
  };

  const changeNumericFilter = () => {
    const newFilter = {
      ...filters,
      filterByNumericValues: [
        ...filterByNumericValues,
        {
          column: columnFilter,
          comparison: comparisionFilter,
          value: valueFilter,
        },
      ],
    };
    setFilter(newFilter);
  };

  const changeData = () => {
    let hold = planets;

    if (filterByNumericValues.length) {
      filterByNumericValues.forEach(({ column, comparison, value }) => {
        hold = hold.filter((planet) => {
          switch (comparison) {
          case 'maior que':
            return planet[column] > value;
          case 'menor que':
            return planet[column] < value;
          case 'igual a':
            return planet[column] === value;
          default:
            return false;
          }
        });
      });
    }

    if (name) {
      hold = hold.filter(({ name: planetName }) => {
        const regex = new RegExp(name, 'i');
        return regex.test(planetName);
      });
    }

    setActualPosition(0)
    setData(hold);
  };

  const deleteNumericFilter = (column) => {
    const filtredNumericFilter = filterByNumericValues
      .filter(({ column: currColumn }) => currColumn !== column);
    const newFilter = {
      ...filters,
      filterByNumericValues: filtredNumericFilter,
    };
    setFilter(newFilter);
  };

  const renderColumns = () => {
    const removeNames = filterByNumericValues.map(({ column }) => column);
    let columnFilterKeys = [
      'rotation_period',
      'orbital_period',
      'diameter',
      'gravity',
      'surface_water',
      'population',
    ];

    if (removeNames.length) {
      columnFilterKeys = columnFilterKeys.filter((key) => !removeNames.includes(key));
    }

    columnFilterKeys = columnFilterKeys
      .map((key) => <option key={ key } value={ key }>{ key }</option>);
    return columnFilterKeys;
  };

  const currentFilters = filterByNumericValues.map(({ column, comparison, value }) => (
    <div className="curr-filter" key={ column }>
      <p>{ `${column} ${comparison} ${value}` }</p>
      <button
        type="button"
        data-testid="filter"
        onClick={ () => deleteNumericFilter(column) }
      >
        X
      </button>
    </div>
  ));

  useEffect(() => {
    changeName(name);
    changeData();
  }, [name, filterByNumericValues]);

  return (
    <>
      <div className="filters">
        <h1>Filtros</h1>
        <input
          placeholder="Filtrar por nome..."
          data-testid="name-filter"
          value={ name }
          onChange={ ({ target: { value } }) => setName(value) }
        />
        <h2>Coluna:</h2>
        <select
          data-testid="comparison-filter"
          value={ columnFilter }
          onChange={ ({ target: { value } }) => setColumnFilter(value) }
        >
          { renderColumns() }
        </select>
        <h2>Comparação:</h2>
        <select
          data-testid="column-filter"
          value={ comparisionFilter }
          onChange={ ({ target: { value } }) => setComparisionFilter(value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <h2>Valor:</h2>
        <input
          type="number"
          value={ valueFilter }
          onChange={ ({ target: { value } }) => setValueFilter(value) }
          data-testid="value-filter"
        />
        <button
          data-testid="button-filter"
          disabled={ !valueFilter }
          type="button"
          onClick={ changeNumericFilter }
        >
          Filtrar
        </button>
      </div>
      <div className="ordernate">
        <h1>Order</h1>
        <select
          data-testid="column-sort"
          value={ columnSort }
          onChange={ ({ target: { value } }) => setColumnSort(value) }
        >
          <option value="name">name</option>
          { renderColumns() }
        </select>
        <div className="flex">
          <label htmlFor="ASC">
            ASC
            <input
              onChange={ () => setDirection('ASC') }
              checked={ direction === 'ASC' }
              type="radio"
              id="ASC"
            />
          </label>
          <label htmlFor="DESC">
            DESC
            <input
              onChange={ () => setDirection('DESC') }
              checked={ direction === 'DESC' }
              type="radio"
              id="DESC"
            />
          </label>
        </div>
        <button
          onClick={ changeOrder }
          type="button"
        >
          Ordenar
        </button>
      </div>
      <div className="filters-available">
        { !!filterByNumericValues.length && currentFilters }
      </div>
    </>
  );
};

export default Filter;
