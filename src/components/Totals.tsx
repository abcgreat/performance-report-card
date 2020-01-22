import * as React from 'react';
import './Totals.scss';

export interface TotalsProps {
    user_id: number,
    impressions: number,
    conversions: number,
    revenue: number,
    onSortClick?: (sortField: string) => void;
}

class Totals extends React.Component<TotalsProps> {
    render() {
        return (
            <div className={"Totals"}>
                <div onClick={this.onImpressionsClick} className={"Totals-Impressions"} title={'Impressions'}>
                    {this.props.impressions}
                </div>
                <span className={"Label"}>
                    impressions
                </span>
                <div onClick={this.onConversionsClick} className={"Totals-Conversions"} title={'Conversions'}>
                    {this.props.conversions}
                </div>
                <span className={"Label"}>
                    conversions
                </span>

                <div onClick={this.onRevenueClick} className={"Totals-Revenue"} title={'Revenue'}>
                    ${Math.round(this.props.revenue).toLocaleString()}
                </div>
                <span className={"Label"}>
                    revenue
                </span>
            </div>
        )
    }

    private onImpressionsClick = () => {
        if (this.props.onSortClick !== undefined) {
            this.props.onSortClick('impressions');
        }
    };

    private onConversionsClick = () => {
        if (this.props.onSortClick !== undefined) {
            this.props.onSortClick('conversions');
        }
    };

    private onRevenueClick = () => {
        if (this.props.onSortClick !== undefined) {
            this.props.onSortClick('revenue');
        }
    };

}

export default Totals;