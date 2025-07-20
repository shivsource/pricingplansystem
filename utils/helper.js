export const errorRes = (res, error) => {
    return res.status(error.statusCode || 500).json({ message: error.message || 'Something went wrong' });
}

export const successRes = (res, data = {}, statusCode = 200) => {
    return res.status(+statusCode).json({status:true, data })
}