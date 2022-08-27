import React, { useState } from "react";
import Swal from "sweetalert2";

class PageLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tbusername: "",
            tbpassword: "",
            tbtoken: "",
            isLoading: false,
            isError: false,
            errorMessage: "",
            isLogginDataCorrect: false,
            isTokenCorrect: false
        };
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmitToken = e => {
        e.preventDefault()

        var { tbtoken } = document.forms[0]
        var token = tbtoken.value

        const tokenreal = '0813'

        if (token === tokenreal) {
            Swal.fire({
                title: 'Success',
                text: 'Token Valid, anda akan diarahkan ke halaman ujian',
                icon: 'success',
                timer: 2000
            })

            this.setState({
                isTokenCorrect: true
            })

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Token Salah!',
            })
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            isLoading: true,
            isError: false,
            errorMessage: ""
        });
        e.preventDefault();

        console.log('send data:' + this.state.tbusername + ' ' + this.state.tbpassword)

        const data = [
            {
                username: 'rachy',
                password: 'rachy',
                role: 'student',
                authorized: true
            },
            {
                username: 'admin',
                password: 'admin',
                role: 'admin',
                authorized: false
            }
        ]

        const user = data.find(user => user.username === this.state.tbusername && user.password === this.state.tbpassword)
        if (user) {
            const authorized = user.authorized
            if(authorized) {
                if (user.role == 'student') {
                    this.state.isLogginDataCorrect = true
                    document.getElementsByClassName('welcometext')[0].innerHTML = 'Masukan token untuk melanjutkan'
                }
        
                if (user.role == 'admin') {
                    this.state.isLogginDataCorrect = true
                    document.getElementsByClassName('welcometext')[0].innerHTML = 'Selamat datang, Admin'
                }
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Tidak diizinkan',
                    icon: 'error'
                })
            }
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Password atau Username Salah',
                icon: 'error'
            })
        }
    }
    render() {
        const { username, password, isLoading, isError, errorMessage } = this.state;

        const formTokenInput = (
            <div>
                <form onSubmit={this.handleSubmitToken}>
                    <div className="form tbtokenform">
                        <input
                            type="text"
                            name="tbtoken"
                            id="tbtoken"
                            autoComplete="off"
                            value={this.state.tbtoken}
                            onChange={this.handleChange}
                            required
                        />
                        <label className="label-nama">
                            <span className="content-nama">Ketik disini</span>
                        </label>
                    </div>
                    <input
                        className="button"
                        type="submit"
                        value="Validasi"
                        id="buttonvalidate" />
                </form>
            </div>
        )

        const renderForm = (
            <div id="form-login" name="form-login">
                <form onSubmit={this.handleSubmit}>
                    <div className="form tbusernamenya">
                        <input
                            type="text"
                            name="tbusername"
                            id="tbusername"
                            autoComplete="off"
                            value={username}
                            onChange={this.handleChange}
                            required
                        />
                        <label className="label-nama">
                            <span className="content-nama">Username</span>
                        </label>
                    </div>
                    <div className="form tbpasswordnya">
                        <input
                            type="password"
                            name="tbpassword"
                            id="tbpassword"
                            autoComplete="off"
                            value={password}
                            onChange={this.handleChange}
                            required
                        />
                        <label className="label-nama">
                            <span className="content-nama">Password</span>
                        </label>
                    </div>
                    <div className="button-wrapper" style={{ marginBottom: "10px" }}>
                        <div className="button-container">
                            <input
                                className="button"
                                type="submit"
                                value="Login"
                                id="btn-login"
                            />
                        </div>
                    </div>
                </form>
            </div>
        )

        const isLogginDataCorrect = this.state.isLogginDataCorrect
        const isTokenCorrect = this.state.isTokenCorrect
        let formnya
        if(isLogginDataCorrect) {
            formnya = formTokenInput
            if(isTokenCorrect) {
                formnya = (<div>Logged In!</div>)
            } else {
                formnya = formTokenInput
            }
        } else {
            formnya = renderForm
        }

        return (
            <div>
                <div className="container" style={{ opacity: 1 }}>
                    <div className="row-fluid" style={{ paddingTop: "25vh" }}>
                        <div className="col-sm-offset-2 col-md-offset-4 col-sm-8 col-md-4 col-xs-12 login-form">
                            <div className="row-fluid">
                                <div
                                    className="col-sm-12 logo-login-form"
                                    style={{ textAlign: "center", margin: "4vh 0" }}
                                ></div>
                            </div>
                            <div className="row-fluid">
                                <div className="col-sm-12">
                                    <center>
                                        <h1 style={{ fontSize: "17px" }}>Halo!</h1>
                                        <h5 style={{ fontSize: "14px" }} className="welcometext">
                                            Silahkan masukan data login anda
                                        </h5>
                                    </center>
                                    <p className="warning"></p>
                                    {formnya}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PageLogin;
