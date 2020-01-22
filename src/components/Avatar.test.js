import React from 'react';
import {shallow} from 'enzyme';
import Avatar from './Avatar';

describe('Avatar', () => {
    const mockAvatar = {
        name: 'Charlie S. Gerardi',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brad_frost/128.jpg',
    };

    it('should render Avatar', () => {
        const wrapped = shallow(<Avatar {...mockAvatar} />);
        expect(wrapped.exists('.Avatar')).toEqual(true);
    });

    it('should render valid avatar image', () => {
        const wrapped = shallow(<Avatar {...mockAvatar} />);
        expect(wrapped.find('.Avatar-Icon').prop('src')).toEqual('https://s3.amazonaws.com/uifaces/faces/twitter/brad_frost/128.jpg');
    });
});
