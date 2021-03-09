import React from 'react';
import {hot} from 'react-hot-loader/root';
import {useForm} from "react-hook-form";

const Login = (props) => {

    const {register, handleSubmit, watch, errors} = useForm();
    const onSubmit = data => console.log(data);

    return (
        <>
            <div className="container-fluid login-form">
                <div className="row justify-content-center align-items-center h-100">
                    <span className="login-form-close" id="closeMenu" style={{marginRight: "15px"}} onClick={props.toggleLoginForm}><i
                        className="fa fa-times mr-2"></i>CLOSE</span>
                    <div className="col-12 col-md-6">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-8">
                                <h1 className="login-form-header text-center">Login</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row mt-4 mb-1 justify-content-center">
                                        <div className="col-12 col-md-8">
                                            <span className="login-form-label">Email</span>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-12 col-md-8">
                                            <input name="email" placeholder="max.mustermann@example.com"
                                                   ref={register({required: true})} className="login-form-input"/>
                                        </div>
                                    </div>
                                    <div className="row mt-4 mb-1 justify-content-center">
                                        <div className="col-12 col-md-8">
                                            <span className="login-form-label">Passwort</span>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-12 col-md-8">
                                            <input name="password" type="password" ref={register({required: true})}
                                                   className="login-form-input"/>
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-12 d-flex justify-content-center">
                                            <input type="submit" className="btb btn-xd" value="Login"/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default hot(Login);