import React from 'react';
import {shallow, mount} from 'enzyme';
import Dashboard from './Dashboard';
import Card from './Card';

describe('Dashboard', () => {
    it('should render cards', () => {
        const wrapped = shallow(<Dashboard/>);
        expect(wrapped.exists(Card)).toEqual(true);

        expect(wrapped.exists('.Dashboard')).toEqual(true);
        expect(wrapped.exists('.Dashboard-Controller')).toEqual(true);
        expect(wrapped.exists('.Dashboard-Controller-SortButtons')).toEqual(true);
        expect(wrapped.find('.Dashboard-Controller-SortButtons').children().length).toEqual(4);

        expect(wrapped.find('.Dashboard-Controller-SortButtons-Name').contains('Name')).toEqual(true);
        expect(wrapped.find('.Dashboard-Controller-SortButtons-Impressions').contains('Impressions')).toEqual(true);
        expect(wrapped.find('.Dashboard-Controller-SortButtons-Conversions').contains('Conversions')).toEqual(true);
        expect(wrapped.find('.Dashboard-Controller-SortButtons-Revenue').contains('Revenue')).toEqual(true);
    });

    it('should render list of cards', () => {
        const wrapped = mount(<Dashboard/>);
        const cards = wrapped.find(Card);

        expect(cards.length > 0).toEqual(true);
    });

    it('should sort by name', () => {
        const wrapped = mount(<Dashboard/>);

        expect(wrapped.find(Card).length > 0).toEqual(true);

        const firstCard = wrapped.find(Card).at(0);
        const clickableName = firstCard.find('.Card-Profile-Detail-Name');

        expect(clickableName.contains('Aaron E. Poynton')).toEqual(true);
        clickableName.simulate('click');

        const retriedFirstCard = wrapped.find(Card).at(0);
        const retriedClickableName = retriedFirstCard.find('.Card-Profile-Detail-Name');

        expect(retriedClickableName.contains('Aaron E. Poynton')).toEqual(true);
    });

    it('should sort by impressions', () => {
        const wrapped = mount(<Dashboard/>);

        expect(wrapped.find(Card).length > 0).toEqual(true);

        const firstCard = wrapped.find(Card).at(0);
        const clickableImpressions = firstCard.find('.Totals-Impressions');

        expect(clickableImpressions.contains(887)).toEqual(true);
        clickableImpressions.simulate('click');

        const retriedFirstCard = wrapped.find(Card).at(0);
        const retriedClickableImpressions = retriedFirstCard.find('.Totals-Impressions');

        expect(retriedClickableImpressions.contains(838)).toEqual(true);
    });

    it('should sort by conversions', () => {
        const wrapped = mount(<Dashboard/>);

        expect(wrapped.find(Card).length > 0).toEqual(true);

        const firstCard = wrapped.find(Card).at(0);
        const clickableConversions = firstCard.find('.Totals-Conversions');

        expect(clickableConversions.contains(328)).toEqual(true);
        clickableConversions.simulate('click');

        const retriedFirstCard = wrapped.find(Card).at(0);
        const retriedClickableConversions = retriedFirstCard.find('.Totals-Conversions');

        expect(retriedClickableConversions.contains(255)).toEqual(true);
    });

    it('should sort by revenue', () => {
        const wrapped = mount(<Dashboard/>);

        expect(wrapped.find(Card).length > 0).toEqual(true);

        const firstCard = wrapped.find(Card).at(0);
        const clickableRevenue = firstCard.find('.Totals-Revenue');

        expect(clickableRevenue.contains('15,665')).toEqual(true);
        clickableRevenue.simulate('click');

        const retriedFirstCard = wrapped.find(Card).at(0);
        const retriedClickableRevenue = retriedFirstCard.find('.Totals-Revenue');

        expect(retriedClickableRevenue.contains('12,684')).toEqual(true);
    });
});
