import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { supabase } from "@/lib/supabaseClient";
import type { UnitDto } from "@/queries/units";

export const useUnitMutation = (id: string, payload: UnitDto) => {
    const queryClient = useQueryClient();

    return useMutation(
        async () =>
            new Promise((resolve, reject) => {
                supabase
                    .from("units")
                    .update(payload)
                    .eq("id", id)
                    .then(res => {
                        if (res.error) {
                            reject(res.error);
                            return;
                        }

                        resolve(res.data);
                    });
            }),
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries(["units", payload.event_id]);
            }
        }
    );
};
