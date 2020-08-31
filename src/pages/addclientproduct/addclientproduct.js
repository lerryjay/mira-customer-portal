import React, { Component } from 'react'
import { HTTPURL } from '../../common/global_constant';
import {withContext} from '../../common/context';

class AddClientProduct extends Component {
    constructor(props){
        super(props);
        this.state = { 
            ...this.props, 
            clientid : '', 
            productid: '',
            modules: '',
            cost:'',
            errormessage: '',
            loading: false,
            successmessage: '',
        };
    }
    
    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value,errormessage : '' });
    }

    handleSubmit = async e => {
        e.preventDefault()
        this.setState({loading : true});
        setTimeout(() => {
            this.setState({loading : false});
            this.setState({successmessage: 'Added Successfully!'})
            setTimeout(() =>{
                this.setState({successmessage: false});

                // let data = document.getElementById("addclientproduct")

                // const headers = new Headers();
                // headers.append('API-KEY','97899c-7d0420-1273f0-901d29-84e2f8');
                // let form = new FormData(data);
                // fetch(HTTPURL + 'clients/addproduct', {
                //     method: 'POST',
                //     body: form,
                //     headers: headers
                // })
                // .then(response => response.json())
                // .then(json => {
                // console.log(json);
                // return json;
                // });
                
                //  console.log('submitting')
                //  this.setState({productid: '', modules: '', cost: ''})
            }, 5000);
        }, 3000);
    
    }

    render() {
        return (

            <div className="container mx-auto row">
            {/* Success Message */}
            { this.state.successmessage ? 
                <div className="alert alert-success" role="alert" style={{position:'fixed', top: '70px' , right: '10px', zIndex:'4'}}>
                    <span className="mt-3">{this.state.successmessage}</span>
                    <button type="button" class="close ml-4" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                :   <span></span>
            }

                <div className="col-md-8 offset-2 mb-3 mt-4" id="profile">
                 {/* Error Message */}
                { this.state.errormessage != null && this.state.errormessage.length > 0 ? 
                    <div className="alert alert-warning" role="alert">
                        {this.state.errormessage}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    :   <span></span>
                }

                    <form onSubmit={this.handleSubmit} id="addclientproduct"> 
                    
                            <div className="card">
                                <div className="card-header bg-medium font-weight-bold text-dark">
                                    ADD CLIENT PRODUCT
                    </div>
                    
                                <div className="card-body">

                            <div className="row">
                                <div className="col-md-12">
                                </div>
                            </div>
                                <div className="row">

                                <div className="col-md-12 mb-1">
                                        <div className="form-group">
                                            <input type="text" className="form-control form-control-sm" name="userid"
                                                id="userid" placeholder="Client ID" 
                                                value={this.state.clientid} required
                                                onChange={this.handleInputChange}/>
                                        </div>
                                    </div>

                                    <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <select onChange={this.handleInputChange} name="type" id="type" className=" form-control form-select form-select-sm">
                                                    <option value="" selected disabled>--Select&nbsp;Product&nbsp;Name--</option>
                                                    <option value="Accissebs">Accissebs</option>
                                                    <option value="SYSBANKER EE">SYSBANKER EE</option>
                                                    <option value="Mira HPro">Mira HPro</option>
                                                </select>
                                            </div>
                                        </div>

                                    <div className="col-md-12 mb-1">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Product Name</label>
                                            <input type="text" className="form-control form-control-sm" name="name"
                                                id="name" placeholder="Product ID" 
                                                value={this.state.productid}
                                                onChange={this.handleInputChange}/>
                                        </div>
                                    </div>

                                    <div className="col-md-12 mb-1">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Cost</label>
                                            <input type="text" className="form-control form-control-sm" name="name"
                                                id="name" placeholder="Cost" 
                                                value={this.state.cost}
                                                onChange={this.handleInputChange}/>
                                        </div>
                                    </div>
                                    
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Modules</label>
                                            <textarea type="text" className="form-control form-control-sm" name="description"
                                                id="description" placeholder="Modules"
                                                value={this.state.modules}
                                                onChange={this.handleInputChange} />
                                        </div>
                                    </div>

                                </div>


                            </div>

                            <div className="card-footer">
                                <div className="float-right">

                                     {this.state.loading ? 
                                <button type="submit" className="btn btn-sm bg-btn">
                                    <div className="spinner-border text-secondary" role="status" id="loader">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </button>
                                : <button type="submit" className="btn btn-sm btn-primary px-3 py-2">
                                    <i className="fas fa-folder-open mr-2"></i>
                                        Save
                                    </button>
                                }

                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}
export default withContext(AddClientProduct);
