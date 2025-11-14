<script>
    import { StickerData } from "$lib/schema/StickerData";
    import { loadSpace, saveSpace } from "$lib/space";
    import Sticker from "$lib/Sticker.svelte";
    import { onMount } from "svelte";

    const defaultSize=100;
    const availableColors=[
        "#FFF8D5","#E6AAD2","#D5F6FB","#D0E9C0","#F8C57C"
    ]
    const spacesize = "1000cm";

    let stickers = $state([]);
    let spacecontainer = $state();
    let spaceelem = $state();

    let spacefileinput, spacefilename;
    let newest=$state();

    function addSticker(x,y,colour){
        newest = new StickerData({x,y,colour,size:defaultSize,text:'new'});
        stickers.push(newest);
    }

    function handleAddButton(e){
        const newNoteX = (spacecontainer.scrollLeft+((spacecontainer.offsetWidth-defaultSize)/2));
        const newNoteY = (spacecontainer.scrollTop+((spacecontainer.offsetHeight-defaultSize)/2));
        const colour = e.currentTarget.dataset.colour;
        addSticker(newNoteX, newNoteY, colour)
    }

    function deleteSticker(stk){
        const i = stickers.indexOf(stk);
        stickers.splice(i,1);
    }

    function handleSaveSpace(e){
        const save = ($state.snapshot(stickers));
        saveSpace(save,spacefilename)
    }

    function handleLoadSpaceButton(e){
        spacefileinput.click();
    }
    async function handleLoadSpace(e){
        const chooser = e.currentTarget;
        const file = chooser.files[0]
        const space = await loadSpace(file);
        stickers = space;
        spacefilename=file.name;
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

        document.addEventListener('keydown',(e)=>{
            if(e.ctrlKey && e.key=='s'){
                e.preventDefault(); e.stopPropagation();
                handleSaveSpace();
            }
        })
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
     <button onclick="{handleSaveSpace}">SAVE</button>
     <button onclick="{handleLoadSpaceButton}">LOAD</button>
     <input 
        hidden
        type="file" multiple="false"
        onchange="{handleLoadSpace}" 
        bind:this={spacefileinput}/>
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
