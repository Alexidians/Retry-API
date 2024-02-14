async function AutoRetryPromise(func, maxRetries, ...params) {
    return new Promise((resolve, reject) => {
        let retries = 0;

        function attempt() {
            func(...params)
                .then(resolve)
                .catch(error => {
                    retries++;
                    if (retries < maxRetries) {
                        attempt();
                    } else {
                        reject(error);
                    }
                });
        }

        attempt();
    });
}

async function AutoRetryError(func, maxRetries, ...params) {
    return new Promise((resolve, reject) => {
        let retries = 0;

        function attempt() {
            try {
               var val = func(...params)
               resolve(val)
            } catch (error) {
                retries++;
                if (retries < maxRetries) {
                    attempt();
                } else {
                    reject(error);
                }
            }
        }

        attempt();
    });
}

async function AutoRetryLoadExtension(name) {
    return new Promise((resolve, reject) => {
        fetch("https://alexidians.github.io/Retry-API/Extension-mapping/browser-js.json")
         .then(response => {
           return await response.json();
         })
         .then(extensions => {
           var elem = document.createElement("script")
           elem.src = extensions[name]
           document.body.appendChild(elem)
         })
         .catch(err => {
           reject(err)
         })
    });
}
