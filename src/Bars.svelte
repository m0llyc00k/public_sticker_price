<script>
  /** LayerCake <Svg> child. Ghost = sticker (light); fill = cost after aid (dark).
   *  Keyed by stable id so bars keep identity and slide when the sort changes.
   *  Emphasis is derived from each school's net price, so it survives re-sorting. */
  import { getContext } from "svelte";

  export let dropped = false;   // false = bars at sticker; true = bars at net
  export let emphAll = false;   // draw every bar dark
  export let mode = null;       // "band" | "below" | "above" | null
  export let bandLo = 20000;
  export let bandHi = 29000;

  const { data, xScale, yScale } = getContext("LayerCake");
  $: bw = $xScale.bandwidth();
  $: y0 = $yScale(0);
</script>

<g class="bars">
  {#each $data as d (d.id)}
    {@const x = $xScale(d.i)}
    {@const stickerY = $yScale(d.s)}
    {@const fillTopY = dropped ? $yScale(d.net) : stickerY}
    {@const emph =
      emphAll ||
      (mode === "band"  && d.net >= bandLo && d.net <= bandHi) ||
      (mode === "below" && d.net < bandLo) ||
      (mode === "above" && d.net > bandHi)}

    <rect class="ghost" width={bw}
          style="x:{x}px; y:{stickerY}px; height:{y0 - stickerY}px" />
    <rect class="fill" width={bw}
          style="x:{x}px; y:{fillTopY}px; height:{y0 - fillTopY}px; opacity:{emph ? 1 : 0}" />
  {/each}
</g>

<style>
  .ghost { fill: rgba(0, 122, 88, 0.16); }
  .fill { fill:#007a58; stroke:#007a58; stroke-width:.25; shape-rendering:geometricPrecision; }
  /* x = slide to new slot on re-sort; y/height = the aid drop; opacity = emphasis */
/* in Bars.svelte */
.ghost, .fill { transition: x .6s cubic-bezier(.4,0,.2,1), y .32s ease-out, height .32s ease-out, opacity .32s; }
  @media (prefers-reduced-motion: reduce) {
    .ghost, .fill { transition: none; }  /* snap instead of slide */
  }
</style>