<template>
    <canvas ref="clock" width="300" height="300"></canvas>
</template>    
<script lang="ts" setup>
const x = 150;
const y = 150;
const clock = ref<HTMLCanvasElement | undefined>();
const ctx: Ref<CanvasRenderingContext2D> = ref<CanvasRenderingContext2D>() as Ref<CanvasRenderingContext2D>

onMounted(() => {
    ctx.value = clock.value?.getContext("2d") as CanvasRenderingContext2D;
    setInterval(loop, 500);
})
const loop = (): void => {
    const time = new Date();
    const h = time.getHours();
    const m = time.getMinutes();
    const s = time.getSeconds();

    ctx.value.beginPath();
    ctx.value.fillStyle = "white";
    ctx.value.arc(x, y, 140, 0, Math.PI * 2, true);
    ctx.value.fill();
    ctx.value.strokeStyle = "red";
    ctx.value.lineWidth = 10;
    ctx.value.stroke();
    drawNumber();

    drawPointer(360 * (h / 12) + (m / 60) * 30 - 90, 70, "black", 10);
    drawPointer(360 * (m / 60) + (s / 60) * 6 - 90, 100, "black", 10);
    drawPointer(360 * (s / 60) + x - 90, 120, "red", 2);
}

const drawNumber = () => {
    for (let n = 0; n < 12; n++) {
        const d = -60;
        const num = new Number(n + 1);
        const str = num.toString();
        const dd = Math.PI / 180 * (d + n * 30);
        const tx = Math.cos(dd) * 120 + 140;
        const ty = Math.sin(dd) * 120 + 160;
        ctx.value.font = "26px Verdana";
        ctx.value.fillStyle = "brown";
        ctx.value.fillText(str, tx, ty);
    }
}

const drawPointer = (deg: number, len: number, color: string, w: number) => {
    const rad = (Math.PI / 180 * deg);
    const x1 = x + Math.cos(rad) * len;
    const y1 = y + Math.sin(rad) * len;

    ctx.value.beginPath();
    ctx.value.strokeStyle = color;
    ctx.value.lineWidth = w;
    ctx.value.moveTo(x, y);
    ctx.value.lineTo(x1, y1);
    ctx.value.stroke();
}


</script>