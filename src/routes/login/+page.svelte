<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import { Input } from '$lib/components/ui/input/index.js';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import { formSchema } from './schema';
	import LogoLight from '$lib/assets/images/light.svg';
	import LogoDark from '$lib/assets/images/dark.svg';
	import { page } from '$app/stores';

	let { data, form: actionData } = $props();

	const form = superForm(data.form, {
		validators: zodClient(formSchema),
		onUpdated: ({ form: f }) => {
			if (actionData?.message === undefined) return;
			const msg = actionData.message;
			if (f.valid && $page.status === 200) {
				toast.success(msg);
			} else {
				toast.error(msg);
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<div class="flex h-screen w-full items-center justify-center px-4">
	<form method="POST" class="flex w-full items-center justify-center px-4 pt-4" use:enhance>
		<Card.Root class="mx-auto w-full max-w-sm portrait:border-0">
			<Card.Header class="flex-col items-center">
				<img class="hidden size-20 dark:block sm:pb-3" src={LogoLight} alt="Logo light" />
				<img class="block size-20 dark:hidden sm:pb-3" src={LogoDark} alt="Logo dark" />
				<Card.Title class="text-2xl">Login</Card.Title>
				<Card.Description class="hidden text-center xsm:block"
					>Enter your credentials to login to the dashboard.</Card.Description
				>
			</Card.Header>
			<Card.Content class="grid gap-4">
				<Form.Field {form} name="username">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Username</Form.Label>
							<Input {...props} bind:value={$formData.username} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="password">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Password</Form.Label>
							<Input type="password" {...props} bind:value={$formData.password} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="building">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Building</Form.Label>
							<Select.Root type="single" bind:value={$formData.building} name={props.name}>
								<Select.Trigger {...props}>
									{$formData.building ?? 'Select Building'}
								</Select.Trigger>
								<Select.Content>
									{#each data.buildings as building (building.id)}
										<Select.Item value={building.name} label={building.name} />
									{/each}
								</Select.Content>
							</Select.Root>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Button type="submit">Submit</Form.Button>
			</Card.Content>
			<Card.Footer>
				<p class="w-full px-2 text-center text-sm text-muted-foreground">
					This software is licensed under the <a
						href="https://raw.githubusercontent.com/aleksasiriski/indexomator/refs/heads/main/LICENSE"
						class="underline underline-offset-4 hover:text-primary"
					>
						MIT
					</a> License.
				</p>
			</Card.Footer>
		</Card.Root>
	</form>
</div>
