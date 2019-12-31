import React from 'react';

import Course from './Course';

const App = () => {
    const courses = [
        {
            nimi: 'Half Stack -sovelluskehitys',
            osat: [
                {
                    nimi: 'Reactin perusteet',
                    tehtavia: 10,
                    id: 1,
                },
                {
                    nimi: 'Tiedonvälitys propseilla',
                    tehtavia: 7,
                    id: 2,
                },
                {
                    nimi: 'Komponenttien tila',
                    tehtavia: 14,
                    id: 3,
                },
            ],
        },
        {
            nimi: 'Node.js',
            osat: [
                {
                    nimi: 'Routing',
                    tehtavia: 3,
                    id: 1
                },
                {
                    nimi: 'Middlewares',
                    tehtavia: 7,
                    id: 2
                }
            ]
        }
    ];

    const courseRows = courses.map(course => <Course key={course.nimi} course={course} />);

    return (
        <div>
            <h1>Web dev curriculum</h1>
            {courseRows}
        </div>
    )
}

App.propTypes = {
};

export default App;
