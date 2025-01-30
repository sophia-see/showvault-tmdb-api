import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'
import BookmarkedMedias from '@/components/BookmarkedMedias';

export default async function page() {
    const session = await auth.api.getSession({headers: await headers()});

    if (!session)
        return redirect("/login")

    return (
        <div className="px-4 md:px-6">
            <Suspense>
                <BookmarkedMedias />
            </Suspense>
        </div>
    )
}

