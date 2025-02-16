import { fail, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { createStudent } from '$lib/server/db/student';
import { getDepartments } from '$lib/server/db/department';

import { formSchema } from './schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(formSchema));
	const departments = await getDepartments();

	return {
		form,
		departments
	};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, zod(formSchema));
		if (!form.valid) {
			return fail(400, {
				form,
				message: 'Invalid form inputs'
			});
		}

		if (locals.session === null || locals.user === null) {
			return fail(401, {
				form,
				message: 'Invalid session'
			});
		}

		try {
			const { index, fname, lname, department } = form.data;
			const building = locals.session.building;
			const creator = locals.user.username;
			await createStudent(index, fname, lname, department, building, creator);
		} catch (err: unknown) {
			console.debug(`Failed to create student: ${(err as Error).message}`);
			return fail(400, {
				form,
				message: 'Student already exists'
			});
		}

		return {
			form,
			message: 'Student created successfully!'
		};
	}
};
