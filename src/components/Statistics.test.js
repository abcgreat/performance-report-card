import React from 'react';
import {shallow} from 'enzyme';
import Statistics from './Statistics';

describe('Statistics', () => {
    const mockStatistics = {
        user_id: 1,
        userStats: [
            {
                date: '2019-04-03',
                count: 4,
            },
            {
                date: '2019-04-13',
                count: 7,
            },
            {
                date: '2019-04-23',
                count: 2,
            },
        ],
        dataRange: '04/03 - 04/23',
    };

    it('should render Statistics', () => {
        const wrapped = shallow(<Statistics {...mockStatistics} />);
        expect(wrapped.exists('.Statistics')).toEqual(true);
    });
});
