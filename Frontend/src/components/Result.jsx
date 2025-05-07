import React from 'react';

const Results = ({ data }) => {
    return (
        <div>
            <h2>Résultats :</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default Results;