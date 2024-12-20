import { Router } from 'express';
import { addTestimonials, deleteTestimonials, getAllTestimonials, getAllTestimonialsById, updateTestimonials } from '../controller/testimonials';

export const testimonialRouter = Router();
testimonialRouter.get('/', getAllTestimonials)
testimonialRouter.get('/:id', getAllTestimonialsById)
testimonialRouter.post('/', addTestimonials) 
testimonialRouter.put('/:id', updateTestimonials)
testimonialRouter.delete('/:id', deleteTestimonials)