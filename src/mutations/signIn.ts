import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { supabase } from "@/lib/supabaseClient";
import router from "@/router";

export const useSignInMutation = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation(
        async () =>
            new Promise(async (resolve, reject) => {
                const { data, error } = await supabase.auth.signInWithOAuth({ provider: "github" });
            }),
        {
            onSuccess: async () => {
                await router.push("/events");
            }
        }
    );
};
