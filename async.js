window.functions = [];
window.ready = function(functionObject){
  this.functions.push(functionObject);
}

window.onload = function() {
  this.functions.map(function(functionObject) {
    functionObject();
  });
}

window.ready(function() {
    // Synchronous callback example

    function callback(val) {
        console.log(val);
    }

    var fruits = ['apple', 'banana', 'pear'];

    fruits.forEach(callback);
    console.log('done');

    // Asynchronous => Can start now and finish later.
    // This is an asynchronous callback example
    // Vanilla javascript Ajax Request

    var http = new XMLHttpRequest();

    http.onreadystatechange = () => {
        if (http.readyState == 4 && http.status == 200) {
            console.log(JSON.parse(http.response));
        }
    }

    http.open("GET", "data/musics.json", true);
    http.send();
    console.log("Vanilla javascript AJAX request");

    /* ends

    READY STATES

    0 - request not initialized
    1 - request has been set up
    2 - request has been sent
    3 - request is in process
    4 - request is complete

    */

    // What if we want to grab tweets.json then friends.json and finally videos.json file?

    function handleError(jqXHR, textStatus, error) {
        console.log(error);
    }
    $.ajax({
        type: "GET",
        url: "data/sports.json",
        success: (data) => {
            console.log(data);
            $.ajax({
                type: "GET",
                url: "data/books.json",
                success: (data) => {
                    console.log(data);
                    $.ajax({
                        type: "GET",
                        url: "data/musics.json",
                        success: (data) => {
                            console.log(data);
                        },
                        error: handleError
                    })
                },
                error: handleError
            })
        },
        error: handleError
    })
});

window.ready(function() {
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
});

window.ready(function() {
    /* Basic example

    function* gen() {
        var x = yield 10;
        console.log(x);
    }

    var myGen = gen();
    console.log(myGen.next());
    console.log(myGen.next(10)); // now it is done!

    */

    genWrap(function*() {

        var tweets = yield $.get("data/tweets.json");
        console.log(tweets);
        var friends = yield $.get("data/friends.json");
        console.log(friends);
        var videos = yield $.get("data/videos.json");
        console.log(videos);
    });

    function genWrap(generator) {

        var gen = generator();

        function handle(yielded) {
            if (!yielded.done) {
                yielded.value.then(function(data){
                    return handle(gen.next(data));
                })
            }
        }

        return handle(gen.next());
    }
});
