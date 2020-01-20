import React from 'react';
import {shallow, mount} from 'enzyme';
import Card from './Card';
import Avatar from './Avatar';
import Statistics from './Statistics';
import Totals from './Totals';

describe('Card', () => {
    const mockCardProps = {
        user_id: 1,
        avatar: 'avt',
        name: 'nm',
        occupation: 'occptn',
        impressions: 3,
        conversions: 4,
        revenue: 5,
        trafficDates: [
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

    it('should render Avatar', () => {
        const wrapped = shallow(<Card {...mockCardProps} />);
        expect(wrapped.exists(Avatar)).toEqual(true);
    });

    it('should render Statistics', () => {
        const wrapped = shallow(<Card {...mockCardProps} />);
        expect(wrapped.exists(Statistics)).toEqual(true);
    });

    it('should render Totals', () => {
        const wrapped = shallow(<Card {...mockCardProps} />);
        expect(wrapped.exists(Totals)).toEqual(true);
    });

    describe('with props', () => {
        it('should render Avatar with props', () => {
            const wrapped = mount(<Card {...mockCardProps} />);

            expect(wrapped.find(Avatar).prop('avatar')).toEqual('avt');
            expect(wrapped.find(Avatar).prop('name')).toEqual('nm');
        });

        it('should render Profile Detail with props', () => {
            const wrapped = mount(<Card {...mockCardProps} />);

            expect(wrapped.find('.Card-Profile-Detail-Name').contains('nm')).toEqual(true);
            expect(wrapped.find('.Card-Profile-Detail-Occupation').contains('occptn')).toEqual(true);
        });

        it('should render Statistics with props', () => {
            const wrapped = mount(<Card {...mockCardProps} />);
            const expectedUserStats = [
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
            ];

            expect(wrapped.find(Statistics).prop('user_id')).toEqual(1);
            expect(wrapped.find(Statistics).prop('userStats')).toEqual(expectedUserStats);
            expect(wrapped.find(Statistics).prop('dataRange')).toEqual('04/03 - 04/23');
        });

        it('should render Totals with props', () => {
            const wrapped = mount(<Card {...mockCardProps} />);

            expect(wrapped.find(Totals).prop('user_id')).toEqual(1);
            expect(wrapped.find(Totals).prop('impressions')).toEqual(3);
            expect(wrapped.find(Totals).prop('conversions')).toEqual(4);
            expect(wrapped.find(Totals).prop('revenue')).toEqual(5);
        });
    });
});
