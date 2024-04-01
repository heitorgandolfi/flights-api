import type { AddBookingDto } from "../dtos/bookings";
import { BookingsRepository } from "../repositories/bookings";

async function getAll() {
    const bookings = await BookingsRepository.getBookings();

    return bookings;
}

async function getById(id: number) {
    const booking = await BookingsRepository.getBookingById(id);

    return booking;
}

async function create(data: AddBookingDto) {
    await BookingsRepository.createBooking(data);
}

async function deleteById(id: number) {
    await BookingsRepository.deleteBookingById(id);
}

export const BookingsHandler = {
    getAll,
    getById,
    create,
    deleteById,
};