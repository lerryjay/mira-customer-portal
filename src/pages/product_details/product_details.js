import React, { Component } from 'react';
import image from '../../assets/images/Accsiss.png'

class product_details extends Component {
    render() {
        return (
            <div className="container mx-auto">
                <div className="row product_details mt-4">
                    <div className="col-md-6">
                        <img src={image} className="img-fluid"  alt=""/>
                    </div>
                    <div className="col-md-6">
                        <h4 className="text-white">Accsiss eBs</h4>
                        <div className="description">
                            <p>
                            Accsiss eBs is an accounting software, designed to run in multiple locations across different states, 
                            nations and continents, with complex network and diverse platforms. 
                            This version combines the functionalities of the small business version and more.
                            </p>
                            <p>
                            Accsiss eBs is a low-cost, robust software for your business. For managing your customers,
                             receivables and payables, sales and invoicing, inventory, purchases, expenses and payments, cash-flow, accounts, 
                             financial statements. The component modules and functionalities are arranged for quick and easy accessibility; 
                            it is user friendly but has layers of accessibilites depending on user roles.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 packages">
                        <h5 className="text-white text-center">PACKAGES</h5>
                    {/* <div class="card bg-secondary">
                        <div class="card-header text-white">
                            PACKAGES
                        </div>
                    </div> */}
                    </div>
                </div>
                            <div className="row mt-3 packages">
                                <div className="col-md-4">
                                    <div className="card pkg py-4">
                                        <ul>
                                            <h5>Basic</h5>
                                            <li>Design</li>
                                            <li>Development</li>
                                            <li>Hosting</li>
                                            <li>Analytics</li>
                                            <li>Email Setup</li>
                                            <button type="button" class="btn btn-primary mt-3">Select Package</button>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card pkg py-4">
                                        <ul>
                                            <h5>Standard</h5>
                                            <li>Design</li>
                                            <li>Development</li>
                                            <li>Hosting</li>
                                            <li>Analytics</li>
                                            <li>Email Setup</li>
                                            <li>Search Engine Optimization</li>
                                            <li>Backups</li>
                                            <button type="button" class="btn btn-primary mt-3">Select Package</button>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card pkg py-4">
                                        <ul>
                                            <h5>Premium</h5>
                                            <li>Design</li>
                                            <li>Development</li>
                                            <li>Hosting</li>
                                            <li>Analytics</li>
                                            <li>Email Setup</li>
                                            <li>Search Engine Optimization</li>
                                            <li>Backups</li>
                                            <li>Live Chat</li>
                                            <li>Content Management</li>
                                            <li>Maintenance Agreement</li>
                                            <button type="button" class="btn btn-primary mt-3">Select Package</button>
                                        </ul>
                                    </div>
                                </div>
                            </div>
            
            </div>
        );
    }
}

export default product_details;