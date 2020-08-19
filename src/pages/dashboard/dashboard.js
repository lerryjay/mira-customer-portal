import React from 'react';
import Chart from './Chart';

export default function Dashboard() {
    return (
        <div>
            <div className="row mt-3 mx-3 text-white">

                <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 mb-3">
                    <div className="p-2 card card1">
                        <i className="fas fa-user-edit fa-fw fa-2x"></i>
                        <p className="border-top text-right py-2">9.823
            <br />
                            <small>
                                Client
            </small>
                        </p>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 mb-3">
                    <div className="p-2 card cardd">
                        <i className="fas fa-check fa-fw fa-2x"></i>
                        <p className="border-top text-right py-2">9.823
            <br />
                            <small>
                                Successful
            </small>
                        </p>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 mb-3">
                    <div className="p-2 card carddd">
                        <i className="fas fa-comments fa-fw fa-2x"></i>
                        <p className="border-top text-right py-2">9.823
            <br />
                            <small>
                                Pending
            </small>
                        </p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 mb-3">
                    <div className="p-2 card cardddd">
                        <i className="fas fa-user-times fa-fw fa-2x"></i>
                        <p className="border-top text-right py-2">9.823
            <br />
                            <small>
                                Failed
            </small>
                        </p>
                    </div>
                </div>

            </div>

            <div className="row card mt-3 mx-4 justify-content-center mx-2">
                <div className="col-12 card-body shadow home-chart">
                    <div className="d-flex justify-content-between">
                        <div>
                            <h4 className="card-title mb-0">Hello World!</h4>
                            <div className="small text-muted">August 2020</div>
                        </div>
                    </div>
                    <Chart />
                </div>
            </div>

            <div id='table' className="card pt-2 my-3 mx-4 shadow px-2">
                <h6 className="h6 text-left">Ticket&nbsp;Table</h6>
                <div className="table-responsive">
                    <table id='text'
                        className="table table-hover table-bordered table-sm text-center align-middle mb-0 text-white">
                        <caption>Hello World!</caption>
                        <thead>
                            <tr>
                                <th>S/N</th>
                                <th><i className="fas fa-user-graduate"></i></th>
                                <th>Date&nbsp;&&nbsp;Time</th>
                                <th>Client&nbsp;Name</th>
                                <th>Status</th>
                            </tr>

                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td><img src="https://miratechnologiesng.com/img/icons/miraicon.png" alt=""
                                    width="30" /></td>
                                <td>2020&nbsp;-&nbsp;08&nbsp;-&nbsp;17&nbsp;/&nbsp;09:15:56</td>
                                <td>Hello&nbsp;World</td>
                                <td>
                                    <button className="btn btn-sm btn-success d-none">Approved&nbsp;<i
                                        className="fas fa-check-double"></i></button>
                                    <button className="btn btn-sm btn-danger">Cancelled&nbsp;<i
                                        className="fas fa-times"></i></button>
                                    <button className="btn btn-sm btn-warning d-none">Pending&nbsp;<i
                                        className="fas fa-comments"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td><img src="https://miratechnologiesng.com/img/icons/miraicon.png" alt=""
                                    width="30" /></td>
                                <td>2020&nbsp;-&nbsp;08&nbsp;-&nbsp;17&nbsp;/&nbsp;09:15:56</td>
                                <td>Hello&nbsp;World</td>
                                <td>
                                    <button className="btn btn-sm btn-success">Approved&nbsp;<i
                                        className="fas fa-check-double"></i></button>
                                    <button className="btn btn-sm btn-danger d-none">Cancelled&nbsp;<i
                                        className="fas fa-times"></i></button>
                                    <button className="btn btn-sm btn-warning d-none">Pending&nbsp;<i
                                        className="fas fa-comments"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td><img src="https://miratechnologiesng.com/img/icons/miraicon.png" alt=""
                                    width="30" /></td>
                                <td>2020&nbsp;-&nbsp;08&nbsp;-&nbsp;17&nbsp;/&nbsp;09:15:56</td>
                                <td>Hello&nbsp;World</td>
                                <td>
                                    <button className="btn btn-sm btn-success d-none">Approved&nbsp;<i
                                        className="fas fa-check-double"></i></button>
                                    <button className="btn btn-sm btn-danger d-none">Cancelled&nbsp;<i
                                        className="fas fa-times"></i></button>
                                    <button className="btn btn-sm btn-warning">Pending&nbsp;<i
                                        className="fas fa-comments"></i></button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
            <div className="overlay"></div>

        </div>
    )
}
