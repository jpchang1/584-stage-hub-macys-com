import React from "react";

const p18 = (props) => {
    return(
        <div className="p-body">
            <h1 className="support-title">Analytics & Payments</h1>
            <div className="p-body col-xs-12">
                <ul className="l-decimal">
                    <li><span>Overview</span>
                        <ol type="i">
                            <li>Top Viewed Videos. The overview offers a quick snapshot of top viewed videos, helpful in seeing which of your videos are gaining the most momentum from your customers.</li>
                            <li>Top Products Sold. The overview offers a quick snapshot of the top products you have sold, helpful in seeing what products you are selling the most.</li>
                        </ol>
                    </li>
                    <li><span>Transactions & Incentive Payments</span>
                        <ol type="i">
                            <li>The Transactions Report offers a complete breakdown of all transactions you have generated.</li>
                            <li>The Transaction Report will also show the Incentive Amounts you have earned from your transactions.</li>
                            <li>You will receive your Incentive Payment from the transactions that customers generate from clicking on the links matched to your videos and photos. See below</li>
                            <li>Products returned within 10-days after purchasing will be deducted from your transactions. You will be able to monitor this in the reports</li>
                        </ol>
                    </li>
                    <li><span>Video Report</span>
                        <ol type="i">
                            <li>The Video Report provides the metrics listed in Items ii-v below, broken down by traffic source. You can filter on any of the following traffic sources:
                                <ul>
                                    <li>ALL (captures all traffic sources, including those which may not be listed below)</li>
                                    <li>FACEBOOK</li>
                                    <li>YOUTUBE</li>
                                    <li>TWITTER</li>
                                    <li>PINTEREST</li>
                                </ul>
                            </li>
                            <li>Views. Video Views that are qualified (at least 3 seconds qualifies a video view).</li>
                            <li>Referrals. A visit from a traffic source.</li>
                            <li>Viewthrough Rate (VTR). This is the percentage of the video viewed, on average, during the period measured.</li>
                            <li>Shares, Likes, and Comments. These metrics will be populated from your integration with Social Networks, which will soon be available soon on your Style Crew Account.</li>
                        </ol>
                    </li>
                    <li><span>Photo Report (Photos will be available by the end of May 2018)</span></li>
                    <li><span>Product Report</span>
                        <ol type="i">
                            <li>The Product Report provides a clear indication of all product clicks generated from your efforts, helping you understand which products are gaining traction.
                                <div className="image-container ml-40">
                                    <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/ProductReport.png"} alt="Product Report"/>
                                </div>
                            </li>
                        </ol>
                    </li>
                </ul>
            </div>
        </div>
    );
}
export default p18;