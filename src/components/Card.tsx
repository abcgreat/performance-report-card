import * as React from 'react';
import Avatar from './Avatar';
import './Card.scss';
import Statistics from './Statistics';
import Totals from './Totals';

export interface CardProps {
    user_id: number,
    avatar: string,
    name: string,
    occupation: string,
    impressions: number,
    conversions: number,
    revenue: number,
    trafficDates: DailyPerformance[],
    dataRange: string,
    onSortClick?: (sortField: string) => void;
}

export interface DailyPerformance {
    date: string,
    count: number,
}

class Card extends React.Component<CardProps> {
    render() {
        return (
            <div className={"Card"}>
                <div className={"Card-Profile"}>
                    <Avatar
                        name={this.props.name}
                        avatar={this.props.avatar}
                    />

                    <div className={"Card-Profile-Detail"}>
                        <div onClick={this.onNameClick} className={"Card-Profile-Detail-Name"}>
                            {this.props.name}
                        </div>

                        <div className={"Card-Profile-Detail-Occupation"}>
                            {this.props.occupation}
                        </div>
                    </div>
                </div>

                <div className={"Card-Statistics"}>
                    <Statistics
                        user_id={this.props.user_id}
                        userStats={this.props.trafficDates}
                        dataRange={this.props.dataRange}
                    />

                    <Totals
                        user_id={this.props.user_id}
                        impressions={this.props.impressions}
                        conversions={this.props.conversions}
                        revenue={this.props.revenue}
                        onSortClick={this.SortByTotal}
                    />
                </div>
            </div>
        )
    }

    private onNameClick = () => {
        if (this.props.onSortClick !== undefined) {
            this.props.onSortClick('name');
        }
    };

    private SortByTotal = (sortField?: string): void => {
        if (sortField !== undefined && this.props.onSortClick !== undefined) {
            this.props.onSortClick(sortField);
        }
    }
}

export default Card;
