export default interface User {
    id:number,
    name:string,
    email:string,
    adresse:string,
    phone:string,
    job:string,
    department:string,
    image?: File;
    created_at:string
}