import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

const createSupabaseClient = () => {
	if (!supabaseUrl || !supabaseKey) {
		return null;
	}
	return createClient(supabaseUrl, supabaseKey);
};

const _client = createSupabaseClient();

// Proxy that throws only when Supabase is actually used without env vars configured
export const supabase = _client ?? new Proxy(
	{},
	{
		get() {
			throw new Error(
				'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_KEY to use Supabase features.'
			);
		},
	},
);

