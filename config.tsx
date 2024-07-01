const baseUrl = process.env.MOCKAPI_BASE_URL;
const apiGetDetailProduct=(id:number)=>{
    return fetch (`${baseUrl}/${id}`)
}

const apiDeleteProduct = (id:number) =>{
    return fetch (`${baseUrl}/products/${id}`)
}

const apiShowProduct =() =>{
    return fetch(`${baseUrl}/products`)
}
const apiUpdateProduct =(id:number,dataUpload:any) =>{
    return fetch(`${baseUrl}/products/${id}`,
        {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataUpload),
          }
    )
}

export {apiDeleteProduct,apiGetDetailProduct,apiShowProduct,apiUpdateProduct}