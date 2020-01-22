import * as React from 'react';
import './Dashboard.scss';
import Card from './Card';
import Users from '../data/users.json';
import Logs from '../data/logs.json';

export interface DashboardProps {
}

export interface DashboardState {
    userLogs: UserLogs[],
    sortedBy: string,
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
            <div className={'Dashboard'}>
                <div className={'Dashboard-Controller'}>
                    <div className={'Dashboard-Controller-SortButtons'}>
                        <button
                            className={this.state.sortedBy === 'name' ?
                                'Dashboard-Controller-SortButtons-Name-Clicked' : 'Dashboard-Controller-SortButtons-Name'}
                            title={'Sort by Name'} onClick={this.onNameClick}>
                            Name
                        </button>
                        <button
                            className={this.state.sortedBy === 'impressions' ?
                                'Dashboard-Controller-SortButtons-Impressions-Clicked' : 'Dashboard-Controller-SortButtons-Impressions'}
                            title={'Sort by Impressions'}
                            onClick={this.onImpressionsClick}>
                            Impressions
                        </button>
                        <button
                            className={this.state.sortedBy === 'conversions' ?
                                'Dashboard-Controller-SortButtons-Conversions-Clicked' : 'Dashboard-Controller-SortButtons-Conversions'}
                            title={'Sort by Conversions'}
                            onClick={this.onConversionsClick}>
                            Conversions
                        </button>
                        <button
                            className={this.state.sortedBy === 'revenue' ?
                                'Dashboard-Controller-SortButtons-Revenue-Clicked' : 'Dashboard-Controller-SortButtons-Revenue'}
                            title={'Sort by Revenue'}
                            onClick={this.onRevenueClick}>
                            Revenue
                        </button>
                    </div>
                </div>

                <div className={'Dashboard-Cards'}>
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

    FirstCharacterUpperCase(str: string): string {
        return str.charAt(0).toUpperCase() + str.substring(1);
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
                );
            }
        );

        return {
            userLogs:
                userLogs.sort((a, b) => {
                    return a.name < b.name ? -1 : 1;
                }),
            sortedBy: 'name',
        };
    }

    private SortByFieldName = (sortField: string): void => {
        let userLogs: UserLogs[];

        switch (sortField) {
            case 'impressions':
                userLogs =
                    this.state.userLogs.sort((a, b) => {
                        return a.impressions - b.impressions;
                    });
                break;

            case 'conversions':
                userLogs =
                    this.state.userLogs.sort((a, b) => {
                        return a.conversions - b.conversions;
                    });
                break;

            case 'revenue':
                userLogs =
                    this.state.userLogs.sort((a, b) => {
                        return a.revenue - b.revenue;
                    });
                break;

            case 'name':
            default:
                userLogs =
                    this.state.userLogs.sort((a, b) => {
                        return a.name < b.name ? -1 : 1;
                    });
                break;
        }

        this.setState({
            userLogs,
            sortedBy: sortField,
        });
    };

    private onNameClick = () => {
        this.setState({sortedBy: 'name'});
        this.SortByFieldName('name');
    };

    private onImpressionsClick = () => {
        this.setState({sortedBy: 'impressions'});
        this.SortByFieldName('impressions');
    };

    private onConversionsClick = () => {
        this.setState({sortedBy: 'conversions'});
        this.SortByFieldName('conversions');
    };

    private onRevenueClick = () => {
        this.setState({sortedBy: 'revenue'});
        this.SortByFieldName('revenue');
    };
}

export default Dashboard;
