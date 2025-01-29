"use server"

import prisma from "./prisma";

export async function updateBookmark({email, show, isBookmarked}: {email: string, show: string, isBookmarked: boolean}) {
    const bookmarks =  await getUserBookmarks({email});
    let userData;
    if (isBookmarked) {
        const filteredBookmarks = bookmarks.filter(i => i != show)
        userData = await prisma.user.update({
            where: { email },
            data: {
                bookmarks: {
                    set: filteredBookmarks,  // Add the new bookmark to the array
                },
                updatedAt: new Date()
            },
        });
    }
    else
        userData = await prisma.user.update({
            where: { email },
            data: {
                bookmarks: {
                    push:show,  // Add the new bookmark to the array
                },
                updatedAt: new Date()
            },
        });

    return userData.bookmarks
}

export async function getUserBookmarks({email}: {email: string}) {
    const result = await prisma.user.findUnique({
        where: { email },
    });

    return result?.bookmarks ?? [];
}