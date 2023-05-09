function resetAccessToken(res) {
    res.cookie(process.env.ACCESS_TOKEN, '', {expires: new Date()});
}

module.exports = {
    resetAccessToken
}