import db from "../database/db";
import type { AddBookingDto } from "../dtos/bookings";

async function getBookings() {
    const bookings = await db.booking.findMany({
        orderBy: {
            bookingAt: "asc",
        },
        include: {
            Flight: true,
            Passenger: true,
        },
    });

    return bookings;
}

async function getBookingById(id: number) {
    const booking = await db.booking.findUniqueOrThrow({
        where: {
            id,
        },
        include: {
            Flight: true,
            Passenger: true,
        }
    })

    return booking;
}

async function createBooking(data: AddBookingDto) {
    return await db.booking.create({
        data,
    })
}

async function deleteBookingById(id: number) {
    return await db.booking.delete({
        where: {
            id,
        },
    });
}

export const BookingsRepository = {
    getBookings,
    getBookingById,
    createBooking,
    deleteBookingById
};
