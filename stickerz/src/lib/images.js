
import Pica from 'pica';

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

export async function resizeImageBlob(blob, w, h){
    return new Promise((resolve, reject)=>{
        let img = new Image();
        const pica = Pica();
        img.onload = function() {
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');

             // Calculate the new dimensions
            let ratio = Math.min(w / img.width, h / img.height);
            let newWidth = img.width * ratio;
            let newHeight = img.height * ratio;
            canvas.width = newWidth;
            canvas.height = newHeight;

            // Resize the image with Pica
            pica.resize(img, canvas)
                .then(result => pica.toBlob(result, 'image/jpeg', 0.69))
                .then(resolve);
        };
        img.src = URL.createObjectURL(blob);
    })
}
