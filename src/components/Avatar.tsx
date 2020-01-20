import * as React from 'react';
import './Avatar.scss'

export interface AvatarProps {
    name: string,
    avatar: string,
}

interface AvatarState {

}

class Avatar extends React.Component<AvatarProps, AvatarState> {
    addDefaultSrc(ev: any, nameInitial: string) {
        ev.target.onerror = null;
        ev.target.src = '/images/initials/' + nameInitial.toUpperCase() + '.jpg';
    }

    render() {
        const name: string = this.props.name;
        const avatar: string = this.props.avatar;

        return (
            <div className={'Avatar'}>
                <img className={'Avatar-Icon'}
                    src={avatar}
                    onError={(ev) => {
                        this.addDefaultSrc(ev, name.substr(0, 1));
                    }}
                    title={name}
                    alt={name}
                />
            </div>
        )
    }
}

export default Avatar;