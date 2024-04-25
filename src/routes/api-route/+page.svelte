<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;

	let offline = false;

    const handleConnection = () => {
        if (navigator.onLine) {
            offline = false;
        } else {
            offline = true;
        }
    };

    $: console.log(data);

	onMount(() => {
		const interval = setInterval(async () => {
			await invalidateAll();
		}, 1000);

		window.addEventListener('online', handleConnection);
        window.addEventListener('offline', handleConnection);

		return () => {
			clearInterval(interval);
            window.removeEventListener('online', handleConnection);
            window.removeEventListener('offline', handleConnection);
		};
	});
</script>

<h1>Welcome to the SvelteKit service worker demo!</h1>

{#if offline}
    <p class="offline">
        You are OFFLINE!
    </p>
{/if}

<p>
	The last time as of being online is <strong>{data.date}</strong>.
</p>

<style>
    p.offline {
        color: red;
    }
</style>
