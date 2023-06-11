import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { supabase } from "@/lib/supabaseClient";
import type { UnitDto } from "@/queries/units";

export const useUnitMutation = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation(
        async (payload: UnitDto) =>
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
            onSuccess: async (data, variables, context) => {
                await queryClient.invalidateQueries(["units", variables.event_id]);
            }
        }
    );
};
