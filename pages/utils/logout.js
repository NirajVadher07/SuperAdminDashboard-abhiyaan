const logout = () => {
    if (typeof window !== "undefined") {        
        const UserToken = localStorage.getItem("UserToken");
        if (UserToken) {
            localStorage.removeItem("UserToken")
            return true
        }
        else {
            return false
        }
    }
}

export default logout