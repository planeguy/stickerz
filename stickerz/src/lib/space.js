const validspaceversions=[
    "0.1.0"
]

const currentversion=validspaceversions[0];

export class Space {
    constructor({meta,stickers}){
        if(!meta || !validspaceversions.includes(meta.spaceversion)) throw new Error(`invalid space`)
        this.meta = meta;
        this.stickers=stickers??[];
    }
}

export async function loadSpace(file){
    const spacetext = await file.text();
    const space = JSON.parse(spacetext);
    return space;
}

export function saveSpace(space, spacename='stickers.json'){
    const blob = new Blob([JSON.stringify(space)], {type:`application/json`});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href=url;
    a.download=`${spacename}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}