export async function dataUrlFromBlob(blob){
    return new Promise((resolve, reject)=>{
        try{
            const reader = new FileReader();
            reader.addEventListener('load', (e)=>{
                resolve(e.target.result);
            })
            reader.readAsDataURL(blob);
        } catch(ee) {
            console.log('rejected', ee)
            reject(ee);
        }
    });
}