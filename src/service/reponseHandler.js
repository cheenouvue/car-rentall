export const sendCreated = (res, message, data) => {
    return res.status(201).json({ status: true, message, data: data });
}
export const sendSuccess = (res, message, data) => {
    return res.status(200).json({ status: true, message, data: data });
}
export const sendUpdate = (res, message) => {
    return res.status(200).json({ status: true, message });
}
export const sendDelete = (res, message) => {
    return res.status(200).json({ status: true, message });
}
export const sendEmpty = (res, message) => {
    return res.status(400).json({ status: false, message });
}
export const sendError = (res, error) => {
    return res.status(500).json({ errors: error.message });
}
export const sendExsited = (res, message) => {
    return res.status(401).json({ status: false, message });
}
export const sendValidator = (res, error) => {
    return res.status(400).json({ status: false, errors: error.array().map(e => ({ msg: e.msg, path: e.path })) })
}