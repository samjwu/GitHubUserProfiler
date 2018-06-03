$(document).ready(function() {
    $(".searchbar").on("keyup", function(event) {
        let githubusername = event.target.value;

        $.ajax({
            url: "https://api.github.com/users/" + githubusername,
            data: {
                client_id: "027f16318682173bc33b",
                client_secret: "e02e528a3b8439c1d441c97cd6b9a93405cd6aff"
            }
        }).done(function(githubuser) {
            $(".searchresults").html(
                `
                <div class="jumbotron">
                    <h1 class="username">${githubuser.name}</h1>
                    <p class="lead">
                        <img class="avatar profilepicture" src="${githubuser.avatar_url}">
                    </p>
                    <p class="lead">
                        <a class="btn btn-primary btn-lg" href="${githubuser.html_url}" role="button">GitHub Profile</a>
                    </p>
                </div>
                `
            );
        });
    });
});