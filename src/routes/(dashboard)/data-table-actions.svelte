<script lang="ts">
	import { ArrowLeftRight } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input';

	let { id, type }: { id: number; type: string } = $props();
</script>

<form method="POST" action="?/togglestate" class="w-full" use:enhance>
	<Input type="hidden" name="type" value={type} />
	<Button variant="outline" type="submit" name="id" value={id} class="w-full">
		<ArrowLeftRight /> <span class="hidden sm:block">Toggle State</span>
	</Button>
</form>
