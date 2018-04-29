window.onload = () => {

    // Synchronous callback example

    function callback(val) {
        console.log(val);
    }

    var fruits = ['apple', 'banana', 'pear'];

    fruits.forEach(callback);
    console.log('done');

    // Asynchronous => Can start now and finish later.
    //
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
}
