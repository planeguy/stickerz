<script>
import { draggable } from "@neodrag/svelte";
import textFit from "textfit"; 

let {sticker=$bindable(), deletefn} = $props();

const sizeUnit = "px"

function handleDelete(e){
    deletefn(sticker);
}

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
    style:position=absolute
    style:overflow=hidden
    >
        <textarea
            style:wrap=soft
            style:width="{sticker.size}{sizeUnit}"
            style:height="{sticker.size}{sizeUnit}"
            style:background-color={sticker.colour}
            bind:value={sticker.text}
            style:resize=none style:border=none style:outline=none
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
