const logoutController = {};

logoutController.logout = async (req, res) =>{
    //Limpiar las cookies
    res.clearCookie("authToken")

    return res.json({message : "Session closed"})
}

export default logoutController;