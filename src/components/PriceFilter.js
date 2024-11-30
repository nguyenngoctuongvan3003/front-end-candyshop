// src/components/PriceFilter.js
import React, { useState } from 'react';

const PriceFilter = ({ onFilter }) => {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const handleFilter = () => {
        onFilter(minPrice, maxPrice);
    };

    return (
        <div className="price-filter">
            <h4>Lọc theo giá</h4>
            <div className="d-flex">
                <input
                    type="number"
                    placeholder="Giá tối thiểu"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="form-control"
                />
                <input
                    type="number"
                    placeholder="Giá tối đa"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="form-control"
                />
                <button onClick={handleFilter} className="btn btn-outline-secondary">Lọc</button>
            </div>
        </div>
    );
};

export default PriceFilter;