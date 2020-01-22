import * as React from 'react';
import './Statistics.scss';
import {Chart, Geom} from 'bizcharts';

export interface StatisticsProps {
    user_id: number,
    userStats: DailyPerformance[],
    dataRange: string,
}

export interface DailyPerformance {
    date: string,
    count: number,
}

class Statistics extends React.Component<StatisticsProps> {
    render() {
        const userStats = this.props.userStats;

        return (
            <div className={'Statistics'} title={`Traffic: ${this.props.dataRange}`}>
                <Chart width={160} height={48} data={userStats} padding={0}>
                    <Geom
                        type="line"
                        position="date*count"
                        size={1}
                        style={{stroke: '#2c2c2c'}}
                    />
                </Chart>

                <span className={"Statistics-Legend"}>Conversions {this.props.dataRange}</span>
            </div>
        )
    }
}

export default Statistics;
