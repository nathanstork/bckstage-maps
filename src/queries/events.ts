import { useQuery } from "vue-query";
import { supabase } from "@/lib/supabaseClient";

export const useEventsQuery = () =>
    useQuery("events", () => {
        return supabase.from("events").select("*");
    });
