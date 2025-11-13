<script>
    import { StickerData } from "$lib/schema/StickerData";
    import { loadSpace, saveSpace } from "$lib/space";
    import Sticker from "$lib/Sticker.svelte";
    import { onMount } from "svelte";
    import { dataUrlFromBlob } from "$lib/dataUrlFromBlob";

    const defaultSize=100;
    const imageSize = defaultSize * 3;
    const availableColors=[
        "#FFF8D5","#E6AAD2","#D5F6FB","#D0E9C0","#F8C57C"
    ]
    const spacesize = "1000cm";

    let stickers = $state([]);
    let spacecontainer = $state();
    let spaceelem = $state();
    let imgfileinput, spacefileinput;
    let spacefilename;
    let newest=$state();

    function addSticker(colour, img=null, size=defaultSize){
        const x = (spacecontainer.scrollLeft+((spacecontainer.offsetWidth-size)/2));
        const y = (spacecontainer.scrollTop+((spacecontainer.offsetHeight-size)/2));
        const n = new StickerData({x,y,colour,size,text:'',img});
        stickers.push(n);
        newest = n;
        return n;
    }

    function handleAddButton(e){
        const colour = e.currentTarget.dataset.colour;
        addSticker(colour)
    }

    function handleAddImgButton(e){
        imgfileinput.click();
    }

    async function handleSelectImage(e){
        const chooser = e.currentTarget;
        const file = chooser.files[0];
        const colour = '#FFFFFF'
        const dUrl = await dataUrlFromBlob(file);
        const chosenSize = imageSize;
        const n = addSticker(colour, dUrl, chosenSize);
    }

    function deleteSticker(stk){
        const i = stickers.indexOf(stk);
        stickers.splice(i,1);
    }

    function handleSaveSpaceButton(e){
        const save = ($state.snapshot(stickers));
        saveSpace(save,spacefilename)
    }

    function handleLoadSpaceButton(e){
        spacefileinput.click();
    }

    async function handleLoadSpace(e){
        const chooser = e.currentTarget;
        const file = chooser.files[0];
        spacefilename=file.name;
        const space = await loadSpace(file);
        stickers = space;
    }

    function handleSpaceScroll(e){
        const tgt=e.currentTarget;
    }

    function dirtySticker(){
        newest=null;
    }

    onMount(()=>{
        spacecontainer.scrollLeft=(spaceelem.offsetWidth/2)-(spacecontainer.offsetWidth/2);
        spacecontainer.scrollTop=(spaceelem.offsetHeight/2)-(spacecontainer.offsetHeight/2);
    });
</script>
<div 
    style:height="10vh"
    style:width=95%
    style:margin=auto
    style:display=flex
    style:justify-content=center
    style:align-items=center
    >
    {#each availableColors as c }
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button
            style:width=30px
            style:height=30px
            style:background-color={c}
            data-colour="{c}"
            onclick="{handleAddButton}"
            onkeypress="{handleAddButton}"
            >&nbsp;</button>  
    {/each}
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button
        style:width=30px
        style:height=30px
        style:background-color="#FFFFFF"
        style:padding=0
        onclick="{handleAddImgButton}"
        onkeypress="{handleAddImgButton}"
        >
            <!-- svelte-ignore a11y_img_redundant_alt -->
            <img 
                style:width=28px style:height=28px 
                src="data:image/jpeg;base64,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"
                alt="add image sticky"
                />
        </button>  
    <input
        hidden 
        type="file" multiple="false" 
        onchange="{handleSelectImage}" bind:this={imgfileinput}/>
    <button onclick="{handleSaveSpaceButton}">SAVE</button>
    <button onclick="{handleLoadSpaceButton}">LOAD</button>
    <input 
        hidden 
        type="file" multiple="false" 
        onchange="{handleLoadSpace}" bind:this={spacefileinput}/>
</div>
<div 
    bind:this={spacecontainer}
    style:width=95%
    style:height="85vh"
    style:overflow=scroll 
    style:margin=auto
    onscroll="{handleSpaceScroll}"
    >
    <div
        class="dotgrid" 
        style:width={spacesize}
        style:height={spacesize} 
        style:position=relative
        bind:this={spaceelem}
        >
        {#each stickers as s,i }
            <Sticker bind:sticker={stickers[i]} deletefn={deleteSticker} changefn={dirtySticker} isnew={s==newest}></Sticker> 
        {/each}
    </div>
</div>

<style>
    button {
        margin: 0;
        border: solid black 1px;
    }
    .dotgrid {
        --dot-bg: #FAF9F6;
        --dot-color: black; /*#6F8FAF;*/
        --dot-size: 1px;
        --dot-space: 22px;
            background:
                linear-gradient(90deg, var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
                linear-gradient(var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
                var(--dot-color);
    }
</style>