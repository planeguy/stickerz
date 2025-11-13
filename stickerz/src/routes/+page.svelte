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
    let fileinput;

    function addSticker(x,y,colour){
        stickers.push(new StickerData({x,y,colour,size:defaultSize,text:'new'}))  
    }

    function handleAddButton(e){
        const newNoteX = (spacecontainer.scrollLeft+((spacecontainer.offsetWidth-defaultSize)/2));
        const newNoteY = (spacecontainer.scrollTop+((spacecontainer.offsetHeight-defaultSize)/2));
        const colour=e.currentTarget.dataset.colour;
        console.log(colour);
        addSticker(newNoteX, newNoteY, colour)
    }

    function deleteSticker(stk){
        const i = stickers.indexOf(stk);
        stickers.splice(i,1);
    }

    function handleSaveSpace(e){
        const save = ($state.snapshot(stickers));
        saveSpace(save,fileinput.files[0]?.name)
    }

    async function handleLoadSpace(e){
        const chooser = e.currentTarget;
        const file = chooser.files[0]
        const space = await loadSpace(file);
        stickers = space;
    }

    function handleSpaceScroll(e){
        const tgt=e.currentTarget;
    }

    onMount(()=>{
        spacecontainer.scrollLeft=(spaceelem.offsetWidth/2)-(spacecontainer.offsetWidth/2);
        spacecontainer.scrollTop=(spaceelem.offsetHeight/2)-(spacecontainer.offsetHeight/2);
        console.log(spacecontainer.scrollLeft, spacecontainer.scrollTop);
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
     <input type="file" multiple="false" onchange="{handleLoadSpace}" bind:this={fileinput}/>
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
            <Sticker bind:sticker={stickers[i]} deletefn={deleteSticker} ></Sticker> 
        {/each}
    </div>
</div>

<style>
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