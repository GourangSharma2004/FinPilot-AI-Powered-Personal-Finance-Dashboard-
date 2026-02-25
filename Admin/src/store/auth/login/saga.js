import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { CHECK_LOGIN, LOGOUT_USER } from './actionTypes';
import { apiError, loginUserSuccessful, logoutUserSuccess } from './actions';

// AUTH related methods
import { postLogin } from '../../../helpers/fackBackend_Helper';
import { getFirebaseBackend } from '../../../helpers/firebase_helper';

//Initilize firebase
const fireBaseBackend = getFirebaseBackend();

//If user is login then dispatch redux action's are directly from here.
function* loginUser({ payload: { user, history } }) {
    try {
        // Check for test credentials
        if (user.username === 'gourangs2004@gmail.com' && user.password === 'gourang2004') {
            console.log('Test user login detected');
            const testUser = {
                token: 'test_token_' + Math.random().toString(36).substr(2, 9),
                data: {
                    username: 'gourangs2004@gmail.com',
                    email: 'gourangs2004@gmail.com',
                    role: 'admin',
                    name: 'Gourang Sharma'
                }
            };
            console.log('Test user login successful');
            localStorage.setItem("authUser", JSON.stringify(testUser));
            yield put(loginUserSuccessful(testUser));
            history('/dashboard');
        } 
        else if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
            const response = yield call(fireBaseBackend.loginUser, user.username, user.password);
            yield put(loginUserSuccessful(response));
        }
        else {
            console.log('Initiating login process with:', { username: user.username });
            const response = yield call(postLogin, '/post-login', { username: user.username, password: user.password });
            console.log('Received login response:', { success: !!response, hasToken: !!response?.token });
            
            if (response && response.token) {
                console.log('Login successful, storing auth data');
                localStorage.setItem("authUser", JSON.stringify(response));
                yield put(loginUserSuccessful(response));
                console.log('Redirecting to dashboard');
                history('/dashboard');
            } else {
                console.error('Invalid login response structure:', response);
                throw new Error('Invalid authentication response');
            }
        }
    } catch (error) {
        console.error('Login process failed:', {
            message: error.message,
            stack: error.stack
        });
        yield put(apiError(error.message || 'Authentication failed'));
    }
}

function* logoutUser({ payload: { history } }) {
    try {
        localStorage.removeItem("authUser");

        if (process.env.REACT_APP_DEFAULTAUTH === 'firebase') {
            const response = yield call(fireBaseBackend.logout);
            yield put(logoutUserSuccess(response));
        }

        history('/login');
    } catch (error) {
        yield put(apiError(error));
    }
}

export function* watchUserLogin() {
    yield takeEvery(CHECK_LOGIN, loginUser);
}

export function* watchUserLogout() {
    yield takeEvery(LOGOUT_USER, logoutUser);
}

function* loginSaga() {
    yield all([
        fork(watchUserLogin),
        fork(watchUserLogout),
    ]);
}

export default loginSaga;