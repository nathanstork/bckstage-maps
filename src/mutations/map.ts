import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { supabase } from "@/lib/supabaseClient";
import { uuid } from "vue-uuid";

export const useMapMutation = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation(
        async (file: File) =>
            new Promise((resolve, reject) => {
                const fileExtension = file.name.split(".").pop();

                if (!fileExtension) {
                    reject("No file extension found");
                    return;
                }

                // Add a UUID to the file name to prevent a duplicate error
                const fileName = `${file.name.replace(
                    `.${fileExtension}`,
                    ""
                )}-${uuid.v4()}.${fileExtension}`;

                supabase.storage
                    .from("maps")
                    .upload(`${id}/${fileName}`, file, {
                        cacheControl: "3600"
                    })
                    .then(() => {
                        // Get all files in event folder
                        supabase.storage
                            .from("maps")
                            .list(id)
                            .then(res => {
                                // Delete all files except for the just uploaded one
                                const filesToRemove = res.data
                                    ?.filter(f => f.name !== fileName)
                                    ?.map(f => `${id}/${f.name}`);

                                if (filesToRemove)
                                    supabase.storage
                                        .from("maps")
                                        .remove(filesToRemove)
                                        .catch(reject);
                            });
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
