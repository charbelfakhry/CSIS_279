const {MongoClient} = require("mongodb");
const uri = "mongodb://localhost:27017/mydb";

exports.updateCustomer = async (req, res) =>{
    const {_id, name, phone, email, address} = req.body;
    const client = new MongoClient(uri);
    try{
        let newCustomer = {
            name: name,
            phone: phone,
            email: email,
            address: address,
        }
        updateCustomer(client, _id, newCustomer);
    }catch(error){

    }finally{
        await client.close();
    }
}
exports.getCustomers = async (req, res) => {
    const client = new MongoClient(uri);
    try{
        await client.connect();
        const customers = client.db("mydb").collection("customer").find({});
        const results = await customers.toArray();
        res.status(200).send(results);

    }catch(error){
       console.log(error);
       res.status(500).send({msg: "error retrieving customers."});
    }finally{
        await client.close();
    }

}

const seedCusotmerData = async() =>{
    for (let i = 0; i < 10; i++) {
        const client = new MongoClient(uri);
        try {
            await client.connect();
            let customer = {
                name: `cust ${i}`,
                phone: `1111`,
                email: `cust${i}@email.com`,
                address: {
                    city: "Beirut",
                    country: "Lebanon",
                }
            }
            await createCustomer(client, customer);
        } catch (error) {
            console.log(error);
        } finally {
            await client.close();
        }
    }
}


const createCustomer = async (client, newCustomer) => {
    const result = await client.db("mydb").collection("customer").insertOne(newCustomer);
    console.log(`new customer was created with the following id: ${result.insertedId}`);
}

const updateCustomer = async (client, customerId, updatedCustomer) =>{
    const result = await client.db("mydb").collection("customer").updateOne({_id: customerId}, {$set: updateCustomer});
    console.log(`customer was updated: ${result.matchedCount}`);
}


