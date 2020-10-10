$(document).ready(function() {
    $(".searchbar").on("keyup", function(event) {
        let githubusername = event.target.value;

        $.ajax({
            url: "https://api.github.com/users/" + githubusername,
            data: {
                client_id: pubconfig.client_id,
                client_secret: pubconfig.client_secret
            }
        }).done(function(githubuser) {
            $.ajax({
                url: "https://api.github.com/users/" + githubusername + "/repos",
                data: {
                    client_id: pubconfig.client_id,
                    client_secret: pubconfig.client_secret,
                    sort: "created: asc",
                    per_page: 5
                }
            }).done(function(repositories) {
                $.each(repositories, function(index, repository) {
                    $("#repositories").append(
                        `
                        <div class="well">
                            <div class="row">
                                <div class="col-md-8"> 
                                    <strong>${repository.name}</strong>
                                    <br>
                                    <p>${repository.description}</p>
                                </div>
                                <div class="col-md-4">
                                    <span class="badge badge-pill badge-star">Stars: ${repository.stargazers_count}</span>    
                                    <span class="badge badge-pill badge-fork">Forks: ${repository.forks_count}</span>
                                    <span class="badge badge-pill badge-watch">Watchers: ${repository.watchers_count}</span>
                                    <br></br>
                                    <a href="${repository.html_url}" target="_blank" class="btn btn btn-primary">Repository Page</a>
                                </div>
                            </div>
                        </div>
                        `
                    );
                });
            });
            $(".searchresults").html(
                `
                <div class="jumbotron">
                    <div class="row">
                        <div class="col-md-3 basicinfo">
                            <h1 class="username">${githubuser.name}</h1>
                            <img class="avatar" src="${githubuser.avatar_url}">
                            <p>${githubuser.bio}</p>
                            <a class="btn btn-primary" href="${githubuser.html_url}" role="button">GitHub Profile</a>    
                        </div>
                        <div class="col-md-9">
                            <a href="${githubuser.html_url}?tab=repositories" class="badge badge-pill badge-repo">Repositories: ${githubuser.public_repos}</a>
                            <a href="https://gist.github.com/${githubuser.login}" class="badge badge-pill badge-gist">Gists: ${githubuser.public_gists}</a>
                            <a href="${githubuser.html_url}?tab=followers" class="badge badge-pill badge-follower">Followers: ${githubuser.followers}</a>
                            <a href="${githubuser.html_url}?tab=following" class="badge badge-pill badge-following">Following: ${githubuser.following}</a>
                            <table class="table table-hover">
                                <tbody>
                                    <tr class="table-primary">
                                        <th scope="row">Company:</th>
                                        <td>${githubuser.company}</td>
                                    </tr>
                                    <tr class="table-secondary">
                                        <th scope="row">Location:</th>
                                        <td>${githubuser.location}</td>
                                    </tr>
                                    <tr class="table-primary">
                                        <th scope="row">Email:</th>
                                        <td>${githubuser.email}</td>
                                    </tr>
                                    <tr class="table-secondary">
                                        <th scope="row">Website:</th>
                                        <td>${githubuser.blog}</td>
                                    </tr>
                                    <tr class="table-primary">
                                        <th scope="row">Joined GitHub:</th>
                                        <td>${githubuser.created_at}</td>
                                    </tr>
                                    <tr class="table-secondary">
                                        <th scope="row">Last Active:</th>
                                        <td>${githubuser.updated_at}</td>
                                    </tr>
                                </tbody>
                            </table> 
                        </div>
                    </div>
                </div>
                <h1 class="repositories-header">Repositories<h1>
                <div id="repositories"></div>
                `
            );
        });
    });
});