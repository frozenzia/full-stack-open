import React from 'react';

import Otsikko from './Otsikko';
import Statistic from './Statistic';
import strings from './strings';

const Statistics = ({ feedback }) => {

    const totAnswers = (Object.values(feedback)).reduce((accum, val) => accum + val, 0);
    const average = parseFloat(((feedback.good*1 - feedback.bad*1) / totAnswers).toFixed(1));
    const percentPositive = parseFloat(((feedback.good / totAnswers) * 100).toFixed(1));

    let stats = strings.misc.noValuesYet;
    if (totAnswers > 0) stats = (
        <div>
            <Statistic label={strings.labels.good} stat={feedback.good} />
            <Statistic label={strings.labels.neutral} stat={feedback.neutral} />
            <Statistic label={strings.labels.bad} stat={feedback.bad} />
            <Statistic
                label={strings.labels.total}
                stat={totAnswers}
            />
            <Statistic label={strings.labels.avg} stat={average} />
            <Statistic label={strings.labels.positive} stat={`${percentPositive} %`} />
        </div>
    );

    return (
        <div>
            <Otsikko text={strings.headers.stats} />
            {stats}
        </div>
    );
};

export default Statistics;

// <p>{labels.good} {this.state.good}</p>
// <p>{labels.neutral} {this.state.neutral}</p>
// <p>{labels.bad} {this.state.bad}</p>
// <p>keskiarvo {totAnswers > 0 ? average : noValuesYet}</p>
// <p>positiivisia {totAnswers > 0 ? `${percentPositive} %` : noValuesYet}</p>