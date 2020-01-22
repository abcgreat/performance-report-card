import * as React from 'react';
import './Dashboard.scss';
import Card from './Card';
import toast from "toasted-notes";
import "toasted-notes/src/styles.css";
import Users from '../data/users.json';
import Logs from '../data/logs.json';

export interface DashboardProps {

}

export interface DashboardState {
    userLogs: UserLogs[],
    sortedBy?: string,
}

export interface UserLogs {
    user_id: number,
    avatar: string,
    name: string,
    occupation: string,
    impressions: number,
    conversions: number,
    revenue: number,
    trafficDates: DailyPerformance[],
    dataRange: string,
}

export interface UserStats {
    user_id: number,
    date: string,
}

export interface DailyPerformance {
    date: string,
    count: number,
}

class Dashboard extends React.Component<DashboardProps, DashboardState> {
    constructor(props: DashboardProps) {
        super(props);

        this.state = this.getUserLogData();
    }

    render() {
        return (
            <div className={"Dashboard"}>
                {this.optionalMessage()}

                <div className={"Dashboard-Cards"}>
                    {this.state.userLogs.map((usersDetail, index) => {
                            return (
                                <Card
                                    key={index}
                                    user_id={usersDetail.user_id}
                                    avatar={usersDetail.avatar}
                                    name={usersDetail.name}
                                    occupation={usersDetail.occupation}
                                    impressions={usersDetail.impressions}
                                    conversions={usersDetail.conversions}
                                    revenue={usersDetail.revenue}
                                    trafficDates={usersDetail.trafficDates}
                                    dataRange={usersDetail.dataRange}
                                    onSortClick={this.SortByFieldName}
                                />
                            )
                        }
                    )}
                </div>
            </div>
        );
    }

    private optionalMessage() {
        if (this.state.sortedBy !== undefined) {
            const sortedBy = this.state.sortedBy.charAt(0).toUpperCase() + this.state.sortedBy.substring(1);
            toast.notify(`Sorted by: ${sortedBy}`);
        }
    }

    private getUserLogData(): DashboardState {
        let userStats: UserStats[] = [];

        // @ts-ignore
        Logs.forEach((item: any) => {
            userStats.push(
                {
                    user_id: item.user_id,
                    date: item.time.substring(0, 10),
                }
            );
        });

        let userLogs: UserLogs[] = [];

        Users.forEach((item) => {
                let allTrafficDates: string[] = [];

                userStats.forEach((d) => {
                    if (d.user_id === item.id) {
                        allTrafficDates.push(d.date);
                    }
                });

                let uniqueDates = allTrafficDates.filter(function (item, index) {
                    return allTrafficDates.indexOf(item) >= index;
                });

                uniqueDates = uniqueDates.sort((a, b) => a < b ? -1 : 1);
                let dailyCounts: DailyPerformance[] = [];

                uniqueDates.forEach((item) => {
                    dailyCounts.push(
                        {
                            date: `${item}`,
                            count: allTrafficDates.filter((t) => {
                                return t === item;
                            }).length,
                        }
                    );
                });

                const startDate = new Date(uniqueDates[0]);
                const endDate = new Date(uniqueDates[uniqueDates.length - 1]);

                userLogs.push(
                    {
                        user_id: item.id,
                        avatar: item.avatar,
                        name: item.name,
                        occupation: item.occupation,
                        impressions:
                        // @ts-ignore
                        Logs.filter(function (d) {
                            return d.user_id === item.id && d.type === 'impression';
                        }).length,

                        conversions:
                        // @ts-ignore
                        Logs.filter(function (d) {
                            return d.user_id === item.id && d.type === 'conversion';
                        }).length,
                        revenue:
                        // @ts-ignore
                            Logs.filter(function (d) {
                                return d.user_id === item.id;
                            }).reduce(function (accumulator: number, log: any) {
                                return accumulator + log.revenue;
                            }, 0),
                        trafficDates: dailyCounts,
                        dataRange: `${startDate.getMonth() + 1}/${startDate.getDate()} - ${endDate.getMonth() + 1}/${endDate.getDate()}`,
                    }
                )
            }
        );

        return {
            userLogs
        };
    }

    private SortByFieldName = (sortField?: string): void => {
        if (sortField !== undefined) {
            this.setState(
                {sortedBy: sortField}
            )

            switch (sortField) {
                case 'name':
                    this.setState({
                        userLogs:
                            this.state.userLogs.sort((a, b) => {
                                return a.name < b.name ? -1 : 1;
                            })
                    });
                    break;

                case 'impressions':
                    this.setState({
                        userLogs:
                            this.state.userLogs.sort((a, b) => {
                                return a.impressions - b.impressions;
                            })
                    });
                    break;

                case 'conversions':
                    this.setState({
                        userLogs:
                            this.state.userLogs.sort((a, b) => {
                                return a.conversions - b.conversions;
                            })
                    });
                    break;

                case 'revenue':
                    this.setState({
                        userLogs:
                            this.state.userLogs.sort((a, b) => {
                                return a.revenue - b.revenue;
                            })
                    });
                    break;

                default:
                    break;
            }
        }
    }
}

export default Dashboard;
