import Client from '../models/client.model';

/**
 * This method for creating a client.
 */
const create = async (req, res) =>{
    
    const client = new Client(req.body);
    /**
     * if we want to load it with dummy data.
     */
    // const client = await loadClientObj();

    try{
        await client.save();
        return res.status(200).json({
            message: "Client Successfully Added."
        })
    }catch(err){
        return res.status(500).json({
            error: "error saving client."
        })
    }
}

/**
 * Load client by id posted from the client-side
 */
const clientByID = async (req, res, next, id)=>{
    try{
        let client = Client.findById(id)
        if(!client){
            return res.status("500").json({
                error: "Client not found"
            });
        }
        req.profile = client;
        next()
    }catch(error){
        return res.status("500".json({
            error: "Could not retrieve client"
        }))
    }
}

/**
 * listing all clients
 */
const list = async (req, res)=>{
    try{
        let clients = await Client.find();
        res.json(clients);
    }catch(error){
        
    }
}

const update = async (req, res)=>{
    try{
        // let client = req.profile;
        let client  = loadClientObj();

        
    }catch(err){

    }
}

const remove = async (req, res) =>{
    try{
        let client = req.profile;
        let deletedClient = await client.remove();
        res.json(deletedClient);
    }catch(err){
        return res.status(500).json({
            error: "Error deleting client"
        })
    }
}


const loadClientObj = async() =>{
    const client = new Client({
        firstName: `Name one`,
        lastName: `Last Name on`,
        userName: `test`,
        password: `123`,
        dob: new Date(),
    });

    return client;
}

export default {
    create,
    clientByID,
    list,
    update,
    remove,
}


