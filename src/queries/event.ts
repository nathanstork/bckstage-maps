import { useQuery } from "@tanstack/vue-query";
import { supabase } from "@/lib/supabaseClient";

export interface EventDto {
    id: string;
    created_at: string;
    created_by: string;
    name: string;
    map: string | null;
    starts_at: Date;
    ends_at: Date;
}

export const useEventQuery = (id: string) =>
    useQuery(["event", id], async () => {
        return supabase
            .from("events")
            .select("*")
            .eq("id", id)
            .single()
            .then(res => res.data as EventDto);
    });
