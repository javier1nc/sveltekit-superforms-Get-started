import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { schema } from './schema.js';

export const load = async () => {
    
    /*
    //Prisma
    const user = db.users.findUnique({
        where: { id: params.id }
    });
    
    if (!user) error(404, 'Not found');
    
    const form = await superValidate(user, zod(schema));
    */
    
    
    const form = await superValidate(zod(schema));

    // Always return { form } in load functions
    return { form };
};

export const actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod(schema));
        console.log(form);

        if (!form.valid) {
            // Again, return { form } and things will just work.
            return fail(400, { form });
        }

        // TODO: Do something with the validated form.data

        return message(form, 'Form posted successfully!');
    }
};
