import { useQuery } from "@tanstack/vue-query";
import { supabase } from "@/lib/supabaseClient";
import type { EventDto } from "@/queries/event";

export const useEventsQuery = () =>
    useQuery(["events"], async () => {
        return supabase.from("events").select("*");
        /*.then(res => {
                console.log(res.data);

                return res.data as EventDto[];
            });*/
    });
