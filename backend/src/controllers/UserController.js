const connection = require('../database/connection');
const { get } = require('../routes');

module.exports = {
    async index (req, res){
        const users = await connection('users').select('*');
    
        return res.json(users)
    },

    async create(req, res){
        const {username, password} = req.body;

        if (!username || !password){
            return res.status(409).json({error: 'Usuário/senha não permitido'});
        }

        const user = await connection('users').select("*").where({username})

        if (user.length > 0){
            return res.status(409).json({error: 'Nome de usuário já existe'});
        }

        await connection('users').insert({
            username,
            password,
            level: 0
        }).then(
            function (id) {
                return res.json({ id: id[0] });
            },
            function (error) {
                return res.json({ error });
            }
        )

    },

    async delete(req, res){
        const { id } = req.params;

        const user = await connection('users').select("*").where({id})

        if(user.length <= 0){
            return res.status(409).json({error: 'Usuário não existe'});
        }

        await connection('users').where('id', id).delete()

        return res.status(204).send();
    },

    async get(req, res){
        const { id } = req.params;

        const user = await connection('users').select("*").where({id})

        if(user.length <= 0){
            return res.status(409).json({error: 'Usuário não existe'});
        }

        return res.json(user[0]);
    },

    async authenticate(req, res){
        const {username, password} = req.body;

        const user = await connection('users').select("id", "username", "level").where({username, password})

        if(user.length <= 0){
            return res.status(409).json({error: 'Usuário/senha incorretos'});
        }

        return res.json(user[0]);

    }
}