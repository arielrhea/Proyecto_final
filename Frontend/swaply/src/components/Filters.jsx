import React from 'react';

const Filters = ({ categories, onFilter }) => {
    return (
        <div>
            {categories.map((category) => (
                <button key={category.ID} onClick={() => onFilter(category.ID)}>
                    {category.Nombre}
                </button>
            ))}
        </div>
    );
};

export default Filters;
