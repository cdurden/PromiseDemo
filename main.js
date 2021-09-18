function createIoElmt(name, onSuccess, onFailure) {
    const container = document.createElement("div");
    container.style =
        "border: 1px solid black; float: left; margin: 10px; padding: 10px;";
    const heading = document.createElement("h1");
    heading.innerHTML = name;
    container.appendChild(heading);
    const successButton = document.createElement("button");
    successButton.innerHTML = "Success";
    successButton.addEventListener("click", onSuccess);
    container.appendChild(successButton);
    const failureButton = document.createElement("button");
    failureButton.innerHTML = "Failure";
    failureButton.addEventListener("click", onFailure);
    container.appendChild(failureButton);
    return container;
}
function createIoPromiseWidget(name) {
    return new Promise(function (resolve, reject) {
        function wrap(func) {
            return function (...args) {
                ioElmt.querySelectorAll("button").forEach(function (button) {
                    button.setAttribute("disabled", true);
                });
                func(...args);
            };
        }
        const ioContainer = document.getElementById("io");
        const ioElmt = createIoElmt(name, wrap(resolve), wrap(reject));
        ioContainer.appendChild(ioElmt);
    });
}
document.addEventListener("DOMContentLoaded", function () {
    createIoPromiseWidget("io1")
        .then(function () {
            return createIoPromiseWidget("io2");
        })
        .then(function () {
            return createIoPromiseWidget("io3");
        });
});
