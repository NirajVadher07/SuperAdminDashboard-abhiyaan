// TODO: ADD Logic to verify whether the UserToken in LocalStorage is not corrupted

const checkAuth = () => {
    if (typeof window !== "undefined") {
        const UserToken = localStorage.getItem("UserToken");
        if (UserToken) {            
            return true
        }
        else {
            return false
        }
    }
}

export default checkAuth