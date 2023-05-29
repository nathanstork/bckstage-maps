import { useQuery } from "@tanstack/vue-query";
import { supabase } from "@/lib/supabaseClient";

export const useEventQuery = (id: string) =>
    useQuery(["event", id], () => {
        return supabase.from("events").select("*").eq("id", id).single();
    });
