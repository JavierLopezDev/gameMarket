import {z} from 'zod';

export const createProductSchema = z.object({
    title : z.string({
        required_error : 'Title is required'
    }), 
    description : z.string({
        required_error : 'Description must be a String'
    }).optional(),
    price : z.number({
        required_error : 'Price is required',
    })
});