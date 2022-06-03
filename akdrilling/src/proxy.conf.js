const PROXY_CONFIG = {
    "/api/proxy": {
        "target": "http://redhat1.internal.cloudapp.net:7980/SASStoredProcess/do?_action=form,properties,execute,newwindow&_program=%2FAKD+International%2FSTP%2FSTP_GetUserSession",
        "secure": false,
        "bypass": function (req, res, proxyOptions) {
            if (req.headers.accept.indexOf("html") !== -1) {
                console.log("Skipping proxy for browser request.");
                return "/index.html";
            }
            req.headers["X-Custom-Header"] = "yes";
        }
    }
}

module.exports = PROXY_CONFIG;