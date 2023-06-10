import { useQuery } from "@tanstack/vue-query";
import { supabase } from "@/lib/supabaseClient";

export interface UnitDto {
    id: string;
    created_at: string;
    event_id: string;
    name: string;
    x: number;
    y: number;
    type: UnitType;
}

export enum UnitType {
    CIRCLE = "circle",
    SQUARE = "square",
    TRIANGLE = "triangle",
    POLYGON = "polygon"
}

export const useUnitsQuery = (id: string) =>
    useQuery(["units", id], async () => {
        return supabase
            .from("units")
            .select("*")
            .eq("event_id", id)
            .then(res => res.data as UnitDto[]);
    });
