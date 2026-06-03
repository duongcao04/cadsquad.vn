import { createFileRoute } from '@tanstack/react-router'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/lib/supabase'

export const Route = createFileRoute('/login')({
    component: LoginPage,
})

function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-sm border border-gray-200">
                <h1 className="text-2xl font-bold text-center mb-6">
                    Admin Login
                </h1>
                <Auth
                    supabaseClient={supabase}
                    appearance={{ theme: ThemeSupa }}
                    providers={[]}
                    redirectTo={`${window.location.origin}/admin`}
                />
            </div>
        </div>
    )
}
