import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { supabase } from "@/lib/supabaseClient";

export const useMapMutation = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation(
        async (file: File) =>
            new Promise((resolve, reject) => {
                supabase.storage
                    .from("maps")
                    .upload(`${id}/${file.name}`, file, {
                        cacheControl: "3600"
                    })
                    .catch(reject);
            }),
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries(["map", id]);
            }
        }
    );
};
