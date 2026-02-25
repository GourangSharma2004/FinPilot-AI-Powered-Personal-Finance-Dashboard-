import React, { Component } from 'react';
import { Row, Col, Input, Button, Alert, Container, Label } from "reactstrap";
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// actions
import { checkLogin, apiError } from '../../store/actions';

import withRouter from '../../components/Common/withRouter';
import finpilotLogo from "../../assets/images/finpilot-logo.svg";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { username: "admin@themesdesign.in", password: "123456" };
    }

    componentDidMount() {
        this.props.apiError("");
        document.body.classList.add("auth-body-bg");
    }

    componentWillUnmount() {
        document.body.classList.remove("auth-body-bg");
    }

    render() {
        return <LoginForm {...this.props} />;
    }
}

function LoginForm(props) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { username: "admin@themesdesign.in", password: "123456" }
    });

    const onSubmit = (values) => {
        console.log('Login attempt with:', values);
        props.checkLogin(values, props.router.navigate);
    };

    React.useEffect(() => {
        const authUser = localStorage.getItem('authUser');
        console.log('Current auth state:', authUser);
        if (authUser) {
            props.router.navigate('/dashboard');
        }
    }, []);

    return (
        <React.Fragment>
            <div>
                <Container fluid className="p-0">
                    <Row className="g-0">
                        <Col lg={4}>
                            <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                                <div className="w-100">
                                    <Row className="justify-content-center">
                                        <Col lg={9}>
                                            <div>
                                                <div className="text-center mb-4">
                                                    <Link to="/" className="d-inline-block">
                                                        <img 
                                                            src={finpilotLogo} 
                                                            alt="FinPilot" 
                                                            height="50" 
                                                            className="auth-logo"
                                                            style={{ maxWidth: '200px' }}
                                                        />
                                                    </Link>
                                                    <h4 className="font-size-18 mt-4">Welcome Back!</h4>
                                                    <p className="text-muted">Sign in to continue to finpilot.</p>
                                                </div>
                                                {props.loginError && <Alert color="danger">{props.loginError}</Alert>}
                                                <div className="p-2 mt-5">
                                                    <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
                                                        <div className="auth-form-group-custom mb-4">
                                                            <i className="ri-user-2-line auti-custom-input-icon"></i>
                                                            <Label htmlFor="username">Email</Label>
                                                            <Input
                                                                {...register("username", { required: "Email is required", pattern: { value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: "Invalid email format" } })}
                                                                type="text"
                                                                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                                                id="username"
                                                                placeholder="Enter username"
                                                            />
                                                            {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
                                                        </div>

                                                        <div className="auth-form-group-custom mb-4">
                                                            <i className="ri-lock-2-line auti-custom-input-icon"></i>
                                                            <Label htmlFor="userpassword">Password</Label>
                                                            <Input
                                                                {...register("password", { required: "Password is required" })}
                                                                type="password"
                                                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                                                id="userpassword"
                                                                placeholder="Enter password"
                                                            />
                                                            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                                                        </div>

                                                        <div className="form-check">
                                                            <Input type="checkbox" className="form-check-input" id="customControlInline" />
                                                            <Label className="form-check-label" htmlFor="customControlInline">Remember me</Label>
                                                        </div>

                                                        <div className="mt-4 text-center">
                                                            <Button color="primary" className="w-md waves-effect waves-light" type="submit">Log In</Button>
                                                        </div>

                                                        <div className="mt-4 text-center">
                                                            <Link to="/forgot-password" className="text-muted"><i className="mdi mdi-lock me-1"></i> Forgot your password?</Link>
                                                        </div>
                                                    </form>
                                                </div>

                                                <div className="mt-5 text-center">
                                                    <p>Don't have an account? <Link to="/register" className="fw-medium text-primary"> Register </Link></p>
                                                    <p>© {new Date().getFullYear()} FinPilot. Crafted with ❤️ by Gourang & Anmol</p>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                        <Col lg={8}>
                            <div className="authentication-bg">
                                <div className="bg-overlay"></div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

const mapStatetoProps = state => {
    const { loginError } = state.Login;
    return { loginError };
}

export default withRouter(connect(mapStatetoProps, { checkLogin, apiError })(Login));
