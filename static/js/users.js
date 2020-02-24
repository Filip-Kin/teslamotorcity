let generateUserList = () => {
    fetch('/api/user').then(res => res.json()).then(users => {
        let out = '';
        console.log(users);
        users.sort((a, b) => { return b.permissions - a.permissions; })
        for (user of users) {
            switch (user.permissions) {
                case 0: user.permissions = 'View Only'; break;
                case 1: user.permissions = 'Editor'; break;
                case 2: user.permissions = 'Admin'; break;
                case 3: user.permissions = 'Superadmin'; break;
            }
            out += `<tr><td>${user.username}</td>`;
            out += `<td>${user.permissions}</td>`;
            out += `<td><a href="addUser/${user.id}" class="btn red darken-3">Edit</a></td></tr>`;
        }
        document.getElementById('user-list').innerHTML += out;
    });
}

generateUserList();