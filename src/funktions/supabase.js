import { createClient } from "@supabase/supabase-js";


const supabaseUrl = "https://vyyxrceiddwhjwjqouic.supabase.co";


const API_ID = 33636065
const API_HASH = "406449a4c93cf71327634463d306c1dc"
const SUPABASE_KEY = "sb_secret_HryZYFeM02bioSylsK0AbA_ue-SXhDa";
const supabase = createClient(supabaseUrl, SUPABASE_KEY)


async function getDataAll(table) {
    try {
        const { data, error } = await supabase
            .from(table)
            .select("*")
        if (error) {
            console.error("Get xatolik:", error.message || error);
            return null;
        }

        if (!data) {
            console.warn("table topilmadi", table);
            return null;
        }

        return data;
    } catch (err) {
        console.error("Unexpected error:", err);
        return null;
    }
}
async function getUser(user_id) {
    try {
        const { data, error } = await supabase.from("Users1").select("*").eq("user_id", user_id).select().single();
        if (error) {
            console.error("Get xatolik:", error.message)
            return null
        }
        return data
    } catch (e) {
        console.log(e)
    }
}
async function addSession(user_id, session_number, session_sring, session_two_step_veryfy) {
    try {
        const { data, error } = await supabase
            .from("user_sesions")
            .upsert(
                { user_id, session_number, session_sring, session_two_step_veryfy },
                { onConflict: "session_number" } // primary key yoki unique ustun
            )
            .select()
            .single();

        if (error) {
            console.error("addSession (upsert) xatolik:", error.message);
            return null;
        }

        return data;
    } catch (err) {
        console.error("Unexpected error:", err);
        return null;
    }
}


console.log(await addSession('36437482', '+998944646412', '43hgdhsd87ds6f7ds87sgsd5ds6g7dsg567ds5f76dsf7ds4fd5s4d', '0310'));
console.log(await addSession('36437487', '+998944646412', '43hgdhsd87ds6f7ds87sgsd5ds6g7dsg567ds5f76dsf7ds4fd5s4d', '0310'));

export { getDataAll, addSession, getUser, API_HASH, API_ID }
