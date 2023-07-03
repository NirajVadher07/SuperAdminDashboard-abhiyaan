// TODO: ADD Logic to verify whether the UserToken in LocalStorage is not corrupted
// import jwt from "jsonwebtoken";

const checkAuth = () => {
    try {        
        if (typeof window !== 'undefined') {
            const UserToken = localStorage.getItem('UserToken');
            if (UserToken) {
                return true;
            } else {
                return false;
            }
        }
    } catch (error) {
        console.log('JWT token verification failed:', error.message);
        return false;
    }
}

export default checkAuth