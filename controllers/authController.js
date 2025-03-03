const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const pool=require('../database/db');
const { v4: uuidv4 }=require('uuid');

const register=async (req,res)=>{
    try{
        const id=uuidv4();
        const { username,password,role }=req.body;
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=await pool.query("INSERT INTO users (id,username,password,role) VALUES ($1,$2,$3,$4) RETURNING *",[id,username,hashedPassword,role]);
        console.log(`newUser created ${newUser.rows[0]}`);
        res.status(201).json({'message':`User is registered with username ${username}`});
    }
    catch(error){
        res.status(500).json({'error':`There was a server side error ${error.message}`});
    }
}

const login=async (req,res)=>{
    try{
        const { username,password }=req.body;
        const user=await pool.query("SELECT * FROM users WHERE username=$1",[username]);
        if(!user.rows.length)
        {
            res.status(404).json({'message':`User with username ${username} is not found`});
        }
        else
        {
            const isMatch=await bcrypt.compare(password,user.rows[0].password);
            if(!isMatch)
            {
                res.status(400).json({'message':'invalid credentials'});
            }
            else
            {
                const token=jwt.sign({id:user.rows[0].id,role:user.rows[0].role},process.env.JWT_SECRET,{expiresIn:'1h'});
                res.json({token});
            }
        }
    }
    catch(error)
    {
        res.status(500).json({'error':`There was a server side error ${error.message}`});
    }
}

module.exports={
    register,
    login
}