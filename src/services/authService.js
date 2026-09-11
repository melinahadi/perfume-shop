import { supabase } from "../lib/supabase";

// =====================================================
// REGISTER
// =====================================================

export async function signUp({ email, password }) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        throw error;
    }

    // اگر Supabase با ثبت‌نام Session ساخته باشد،
    // کاربر همین الان لاگین شده است.
    if (data.session) {
        return data;
    }

    // اگر Session برنگشته بود، یک بار
    // به صورت خودکار Login را امتحان می‌کنیم.
    const { data: loginData, error: loginError } =
    await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (loginError) {
        throw new Error(
            "Account was created, but automatic sign-in failed. Please make sure Confirm Email is disabled in Supabase.",
        );
    }

    return loginData;
}

// =====================================================
// LOGIN
// =====================================================

export async function signIn({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw error;
    }

    return data;
}

// =====================================================
// LOGOUT
// =====================================================

export async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw error;
    }
}

// =====================================================
// CURRENT USER
// =====================================================

export async function getCurrentUser() {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return user;
}