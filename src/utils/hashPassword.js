import bcrypt from "bcrypt"
export const hashPassword = async(password)=>{
const slatRounds = await bcrypt.genSalt(parseInt(process.env.slatRound));
 let hashedPassword = await bcrypt.hash(password,slatRounds)
 return hashedPassword
}

export const comparePassword = async(password, hashedPassword)=>{
   let compare = await bcrypt.compare(password, hashedPassword)
    return compare; 
}