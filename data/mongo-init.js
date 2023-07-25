db.createUser(
    {
        user: "usrTemplate",
        pwd: "123456",
        roles: [
            {
                role: "readWrite",
                db: "template"
            }
        ]
    }
);