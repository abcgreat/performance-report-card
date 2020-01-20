import React from 'react';
import {shallow} from 'enzyme';
import Totals from './Totals';

describe('Totals', () => {
    const mockTotals = {
        user_id: 1,
        impressions: 3,
        conversions: 4,
        revenue: 5,
    };

    it('should render Totals', () => {
        const wrapped = shallow(<Totals {...mockTotals} />);
        expect(wrapped.exists('.Totals')).toEqual(true);
    });
});
