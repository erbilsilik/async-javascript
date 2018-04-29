window.onload = () => {

// Javascipt promises help us to organize this callbacks!
// A promise represenet the action that hasn't finish yet but will do at the some point

    function get(url) {
        return new Promise(function(resolve, reject) {
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", url, true);
            xhttp.onload = () => {
                if (xhttp.status == 200) {
                    resolve(JSON.parse(xhttp.response));
                } else {
                    reject(xhttp.statusText);
                }
            };
            xhttp.onerror = () => {
                reject(xhttp.statusText);
            };
            xhttp.send()
        });
    }

// Promise is a placeholder that will something happeb in the future.

    var promise = get("data/tweets.json"); // This returns a promise
    promise.then(function(tweets) {
        console.log(tweets);
        return get("data/friends.json");
    }).then(function(friends) {
        console.log(friends);
        return get("data/videos.json")
    }).then(function(videos){
        console.log(videos);
    }).catch(function(error) {
        console.log(error);
    });

/*
This is a small version with Jquery

 $.get("data/tweets.json").then(function(tweets) {
    console.log(tweets);
    return $.get("data/friends.json");
}).then(function(friends) {
    console.log(friends);
    return $.get("data/videos.json");
}).then(function(videos) {
    console.log(videos);
})

*/
}
