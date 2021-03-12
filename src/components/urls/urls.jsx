import React, {useEffect, useState} from 'react';
import {hot} from 'react-hot-loader/root';
import {useForm} from "react-hook-form";
import axios from "axios";
import {useSelector} from "react-redux";

const Urls = (props) => {

    const {register, handleSubmit, watch, errors, setError} = useForm();
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false)
    const [urlObj, setUrlObj] = useState(undefined)
    const onSubmit = data => {
        console.log(data);
        data["user_id"] = user._id;
        setLoading(true);
        axios.post("/url/new", data).then(function (response) {
            if(response.status === 200) {
                setUrlObj(response.data.url);
            } else {
                setUrlObj(response.data.url);
            }
        }).catch(function (error) {
            let res = error.response;
            if(res.status === 500) {
                setError("url", {
                    type: "500",
                    message: "Something went wrong!"
                })
            } else if(res.status === 400) {
                setError("url", {
                    type: "invalid",
                    message: "Invalid URL, https://example.com/abc"
                })
            }
        });
    };

    function formButton(loading) {
        if (loading) {
            return (<><i className="fa fa-spinner fa-spin"></i> Loading</>)
        } else {
            return (<>New Short Url</>)
        }
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row mt-4">
                    <div className="col-12">
                        <h1 className="header"><span className="b">URLS</span></h1>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10">
                        <div className="row justify-content-center">
                            {urlObj &&
                                <div className="col-12 col-md-6">
                                    <div className="row">
                                        <div className="col-12">
                                            <span>{urlObj.title}</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <span>{urlObj.description}</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <span>{urlObj.troll}</span>
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className="col-12 col-md-6">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row justify-content-center mt-3">
                                        <div className="col-11">
                                            <span className="label">Title*</span>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-11">
                                            <input name="title" placeholder="Shop Link"
                                                   ref={register({required: "not filled out"})} className={"login-form-input " + (errors.title ? "is-invalid" : "")}/>
                                        </div>
                                    </div>
                                    {errors.title &&
                                        <div className="row justify-content-center mt-1">
                                            <div className="col-11">
                                                <span className="login-form-error"><i className="fa fa-exclamation-triangle mr-1"></i> {errors.title.message}</span>
                                            </div>
                                        </div>
                                    }
                                    <div className="row justify-content-center mt-3">
                                        <div className="col-11">
                                            <span className="label">Description</span>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-11">
                                            <textarea name="description"
                                                   ref={register({})} className={"login-form-input text-left " + (errors.description ? "is-invalid" : "")}/>
                                        </div>
                                    </div>
                                    {errors.description &&
                                        <div className="row justify-content-center mt-1">
                                            <div className="col-11">
                                                <span className="login-form-error"><i className="fa fa-exclamation-triangle mr-1"></i> {errors.description.message}</span>
                                            </div>
                                        </div>
                                    }
                                    <div className="row justify-content-center mt-3">
                                        <div className="col-11">
                                            <span className="label">Redirect URL*</span>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-11">
                                            <input name="url" placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                                   ref={register({required: "not filled out"})} className={"login-form-input " + (errors.url ? "is-invalid" : "")}/>
                                        </div>
                                    </div>
                                    {errors.url &&
                                        <div className="row justify-content-center mt-1">
                                            <div className="col-11">
                                                <span className="login-form-error"><i className="fa fa-exclamation-triangle mr-1"></i> {errors.url.message}</span>
                                            </div>
                                        </div>
                                    }
                                    <div className="row justify-content-center mt-4">
                                        <div className="col-11">
                                            <label htmlFor={"troll"} className="check-box-container">
                                                20% troll
                                                <input name="troll" id="troll" type="checkbox"
                                                   ref={register({})} className={"login-form-input " + (errors.url ? "is-invalid" : "")}/>
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                    </div>
                                    {errors.troll &&
                                        <div className="row justify-content-center mt-1">
                                            <div className="col-11">
                                                <span className="login-form-error"><i className="fa fa-exclamation-triangle mr-1"></i> {errors.troll.message}</span>
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

export default hot(Urls);