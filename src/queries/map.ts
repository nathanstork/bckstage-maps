import { useQuery } from "@tanstack/vue-query";
import { supabase } from "@/lib/supabaseClient";

export const useMapQuery = (id: string) =>
    useQuery(
        ["map", id],
        async () =>
            new Promise((resolve, reject) =>
                supabase.storage
                    .from("maps")
                    .list(id)
                    .then(res => {
                        const fileName = res.data ? res.data[0].name : null;

                        if (!fileName) {
                            reject("No file found");
                            return;
                        }

                        resolve(
                            supabase.storage.from("maps").getPublicUrl(`${id}/${fileName}`).data
                                .publicUrl
                        );
                    })
                    .catch(reject)
            )
    );
