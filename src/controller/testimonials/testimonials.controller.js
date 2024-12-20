import { db } from '../../utils';

export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await db.testimonial.findMany();
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching testimonials' });
  }
};
export const getAllTestimonialsById = async (req, res) => {
  const { id } = req.params;
  try {
    const testimonial = await db.testimonial.findUnique({
      where: { id: parseInt(id, 10) }
    });
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    res.status(200).json(testimonial);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching testimonial' });
  }
};
export const addTestimonials = async (req, res) => {
  const { names, text, occupation } = req.body;
  try {
    const newTestimonial = await db.testimonial.create({
      data: { names, text, occupation }
    });
    res.status(201).json({message:"New testimonial added successfully",newTestimonial});
  } catch (error) {
    res.status(500).json({ error: 'Error creating testimonial' });
  }
};

export const updateTestimonials = async (req, res) => {
  const { id } = req.params;
  const { names, text, occupation } = req.body;
  try {
    const updatedTestimonial = await db.testimonial.update({
      where: { id: parseInt(id, 10) },
      data: { names, text, occupation }
    });
    res.status(200).json(updatedTestimonial);
  } catch (error) {
    res.status(500).json({ error: 'Error updating testimonial' });
  }
};
export const deleteTestimonials = async (req, res) => {
  const { id } = req.params;
  try {
    await db.testimonial.delete({
      where: { id: parseInt(id, 10) }
    });
    res.status(204).send(); // No content response
  } catch (error) {
    res.status(500).json({ error: 'Error deleting testimonial' });
  }
};
