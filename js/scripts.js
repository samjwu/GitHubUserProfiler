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
                    <div class="row">
                        <div class="col-md-3 basicinfo">
                            <h1 class="username">${githubuser.name}</h1>
                            <img class="avatar" src="${githubuser.avatar_url}">
                            <a class="btn btn-primary" href="${githubuser.html_url}" role="button">GitHub Profile</a>    
                        </div>
                        <div class="col-md-9">
                            <span class="badge badge-pill badge-primary">Repositories: ${githubuser.public_repos}</span>
                            <span class="badge badge-pill badge-secondary">Gists: ${githubuser.public_gists}</span>
                            <span class="badge badge-pill badge-light">Followers: ${githubuser.followers}</span>
                            <span class="badge badge-pill badge-dark">Following: ${githubuser.following}</span>
                        </div>
                    </div>
                </div>
                `
            );
        });
    });
});