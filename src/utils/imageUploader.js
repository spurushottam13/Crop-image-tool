export const imageUploader = ({image, description}) => 
    new Promise((resolve, reject) => {
        fetch('https://api.imgur.com/3/image',{
            method: "POST",
            headers: {
                "Authorization" : "Client-ID 71532f80064a1b7",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                image,
                description,
            })
        })
        .then(r => r.json())
        .then(response => {
            if(response.success) resolve(response.data.id)
            else  reject(response.data.error)
        })
        .catch(reject)
    })
