import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { HTTPURL, APIKEY } from '../../common/global_constant';
import { withContext } from '../../common/context';
import image from '../../assets/images/Accsiss.png'


class clientviewproduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            fullname: '',
            products: [],
            id: '',
            loading: false
        }
    }

    componentDidMount() {
        this.getProduct();
    }

    getProduct() {
        const headers = new Headers();
        headers.append('API-KEY', APIKEY);
        fetch(HTTPURL + 'product', {
            method: 'GET',
            headers: headers
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ products: data.data })
                console.log(this.state.products)
            });
    }

    render() {
        return (
            <div className="container mx-auto row">

                <div className="container">
                    <div className="row my-2">
                        {this.state.products.map((product, i) => {
                            return (
                                <div className="col-md-3 col-lg-4 col-sm-12" key={i}>
                                    <div className="card text-center products">
                                        <img src={image} className="image_product" alt="" />
                                        <div className="card-body">
                                            <h5 className="card-title">{product.name}</h5>
                                            {/* <Link  to={{ pathname:"", search}} onClick={this.handleViewMore}> */}
                                            <Link to={() => `/product_details/${product.id}`}>
                                                <span class="badge px-3 py-2 badge-primary" value={product.id} style={{ cursor: "pointer", fontSize: 'medium' }}>View</span>
                                            </Link>
                                        </div>


                                    </div>

                                </div>



                            )
                        }
                        )}
                    </div>
    

                </div>

            </div>
        );
    }
}


export default withContext(clientviewproduct);