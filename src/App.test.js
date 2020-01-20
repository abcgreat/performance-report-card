import React from 'react';
import {shallow} from 'enzyme';
import App from './App';
import Dashboard from './components/Dashboard';

describe('App', () => {
    it('should render Dashboard', () => {
        const wrapped = shallow(<App/>);
        expect(wrapped.exists(Dashboard)).toEqual(true);
    });
});
