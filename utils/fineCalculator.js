export const calculateFine = (dueDate) => { 
    const finePerHour = 10; // Fine of ₹10 per hour
    const today = new Date();
    if(today > dueDate) {
        const lateHours = Math.ceil((today - dueDate) / (1000 * 60 * 60)); // Calculate late hours
        const fine = lateHours * finePerHour; // Calculate total fine
        return fine;

    }
    return 0; // No fine if returned on time
};