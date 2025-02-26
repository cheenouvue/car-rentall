export const sendCreated = (res, message, data) => {
    return res.status(201).json({ status: true, message, data });
}
export const sendSuccess = (res, message, data) => {
    return res.status(200).json({ status: true, message, data });
}
export const sendUpdate = (res, message) => {
    return res.status(200).json({ status: true, message });
}