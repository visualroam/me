import React, {useState} from 'react';
import {hot} from 'react-hot-loader/root';
import {useForm} from "react-hook-form";
import axios from "axios";
import {useDispatch} from "react-redux";
import {setLoggedIn} from "../features/reducer"
import {setUserSession} from "../features/common";

const Login = (props) => {

    const {register, handleSubmit, watch, errors, setError} = useForm();

    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const onSubmit = data => {
        setLoading(true);
        console.log(data);
        if(!data.email) {
            setError("email", {
                type: "required",
                message: "Cant be empty"
            });
        }
        if( !data.password){
            setError("password", {
                type: "required",
                message: "Cant be empty"
            });
        }

        if(!data.email || !data.password) {
            setLoading(false);
            return
        }
        axios.post('/login', {
            email: data.email,
            password: data.password
        }).then(function (response) {
           let token = response.data.payload;
           setUserSession(token, response.data.user);
           dispatch(setLoggedIn({loggedIn: true, token: token, user: response.data.user}))
           props.toggleLoginForm()
        }).catch(function (error) {
            let res = error.response;
            console.log(error);
            if(res.status === 404) {
                setError("email", {
                    type: "not-found",
                    message: "Email not found"
                });
            } else if(res.status === 403) {
                setError("password", {
                    type: "no-match",
                    message: "Login Credentials doesnt match"
                });
            }
            setLoading(false);
        });
    };

    function formButton(loading) {
        if (loading) {
            return (<><i className="fa fa-spinner fa-spin"></i> Loading</>)
        } else {
            return (<>Login</>)
        }
    }

    return (
        <>
            <div className="container-fluid login-form">
                <div className="row justify-content-center align-items-center h-100">
                    <span className="login-form-close" id="closeMenu" style={{marginRight: "15px"}}
                          onClick={props.toggleLoginForm}><i
                        className="fa fa-times mr-2"></i>CLOSE</span>
                    <div className="col-12 col-md-6" id="login-form">
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
                                                   ref={register({})} className={"login-form-input " + (errors.email ? "is-invalid" : "")}/>
                                        </div>
                                    </div>
                                    {errors.email &&
                                        <div className="row justify-content-center mt-1">
                                            <div className="col-12 col-md-8">
                                                <span className="login-form-error"><i className="fa fa-exclamation-triangle mr-1"></i> {errors.email.message}</span>
                                            </div>
                                        </div>
                                    }
                                    <div className="row mt-4 mb-1 justify-content-center">
                                        <div className="col-12 col-md-8">
                                            <span className="login-form-label">Passwort</span>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-12 col-md-8">
                                            <input name="password" type="password" ref={register({})}
                                                   className={"login-form-input " + (errors.password ? "is-invalid" : "")}/>
                                        </div>
                                    </div>
                                    {errors.password &&
                                    <div className="row justify-content-center mt-1">
                                        <div className="col-12 col-md-8">
                                            <span className="login-form-error"><i className="fa fa-exclamation-triangle mr-1"></i> {errors.password.message}</span>
                                        </div>
                                    </div>
                                    }
                                    <div className="row mt-4">
                                        <div className="col-12 d-flex justify-content-center">
                                            <button type="submit" className="btb btn-xd">
                                                {formButton(loading)}
                                            </button>
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