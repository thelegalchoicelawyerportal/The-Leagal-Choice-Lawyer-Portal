const SUPABASE_URL = "https://ibzxisfangonytpknthu.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_S0YKbX1MIaBB9HxL5KoEAw_X0mymq8q";

const supabaseClient = window.supabase.createClient(
SUPABASE_URL,
SUPABASE_ANON_KEY
);

// ===============================
// Protect Admin Dashboard
// ===============================
async function protectPortal() {
try {
const { data, error } = await supabaseClient.auth.getSession();

    if (error || !data.session || !data.session.user) {
        window.location.href = "portal-login.html";
        return;
    }

    const user = data.session.user;

    const { data: profile, error: profileError } =
        await supabaseClient
            .from("Profile")
            .select("id, email, role, full_name")
            .eq("id", user.id)
            .maybeSingle();

    if (
        profileError ||
        !profile ||
        String(profile.role).toLowerCase() !== "admin"
    ) {
        await supabaseClient.auth.signOut();
        window.location.href = "portal-login.html";
        return;
    }

    // Admin verified — stay on dashboard
    console.log("Admin session verified:", user.email);

} catch (error) {
    console.error("Dashboard protection error:", error);
    window.location.href = "portal-login.html";
}

}

// ===============================
// Logout
// ===============================
async function portalLogout() {
try {
await supabaseClient.auth.signOut();
} catch (error) {
console.error("Logout error:", error);
}

window.location.href = "portal-login.html";

}

// ===============================
// Old demo login disabled
// ===============================
function portalLogin(e) {
if (e) e.preventDefault();

console.warn(
    "portalLogin() is no longer used. Supabase login is handled by portal-login.html."
);

}

// ===============================
// Old demo registration disabled
// ===============================
function registerDemo(e) {
if (e) e.preventDefault();

console.warn(
    "registerDemo() is no longer used. Supabase Authentication handles registration."
);

}
