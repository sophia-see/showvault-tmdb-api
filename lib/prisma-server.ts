"use server"

import prisma from "./prisma";

export async function updateBookmark({email, id, isBookmarked, media_type}: {email: string, id: string, isBookmarked: boolean, media_type?: string}) {
    let userData;
    if (isBookmarked) {
        userData = await prisma.user.update({
            where: { email },
            data: {
                bookmarks: {
                    delete: {id: id},  // Add the new bookmark to the array
                },
                updatedAt: new Date()
            },
            include: {
                bookmarks: true
            }
        });
    }
    else
        userData = await prisma.user.update({
            where: { email },
            data: {
                bookmarks: {
                    create: {
                        id: id,
                        media_type
                    },  // Add the new bookmark to the array
                },
                updatedAt: new Date()
            },
            include: {
                bookmarks: true
            }
        });

    return userData.bookmarks
}

export async function getUserBookmarks({email}: {email: string}) {
    const result = await prisma.user.findUnique({
        where: { email },
        include: {
            bookmarks: true
        }
    });

    return result?.bookmarks ?? [];
}