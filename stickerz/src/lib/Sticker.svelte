<script>
import { onMount } from "svelte";
import { draggable } from "@neodrag/svelte";
import textFit from "textfit"; 

let {sticker=$bindable(), deletefn, isnew, changefn} = $props();
const sizeUnit = "px"

let ta;

function handleDelete(e){
    deletefn(sticker);
}

function handleTextChange(e){
    changefn();
}

onMount(()=>{
    if(isnew && ta){
        ta.focus();
        ta.select();
    }
});
</script>


<div 
    use:draggable={
        {
            position:{x:sticker.x,y:sticker.y},
            onDrag:({offsetX,offsetY}) => {
                sticker.x=offsetX; sticker.y=offsetY;
            }
        }
    }
    style:width="{sticker.size}{sizeUnit}"
    style:height="{sticker.size}{sizeUnit}"
    style:background-color={sticker.colour}
    style:background-image=url({sticker.img})
    style:background-repeat=no-repeat
    style:background-size= cover
    style:background-position= center;
    style:position=absolute
    style:overflow=hidden
    >
        <textarea
            style:wrap=soft
            style:top=0 style:left=0
            style:width="{sticker.size}{sizeUnit}"
            style:height="{sticker.size}{sizeUnit}"
            style:background-color=rgba(0,0,0,0)
            style:position=absolute
            bind:value={sticker.text}
            bind:this={ta}
            style:resize=none style:border=none style:outline=none
            onchange={handleTextChange}
            >
        </textarea> 
        {#if deletefn}
            
        <button onclick={handleDelete}
        style:position=absolute
        style:width=25 style:height=25
        style:right=0
        style:bottom=0 
        >&#x1F5D1;</button>
        {/if}
</div>
