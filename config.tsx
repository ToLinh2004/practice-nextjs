const apiUrl = process.env.MOCKAPI_BASE_URL;
const apiGetProduct =() =>{
    return fetch(`${apiUrl}/products`)
}
const apiGetDetailProduct=(id:number)=>{
    return fetch (`${apiUrl}/products/${id}`)
}

const apiDeleteProduct = (id:number) =>{
    return fetch (`${apiUrl}/products/${id}`)
}

const apiShowProduct =() =>{
    return fetch(``)
}