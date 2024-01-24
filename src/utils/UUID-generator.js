import { randomUUID } from 'crypto';

export const generateAndReturnUUID = () => {
  const uuid = randomUUID();
  return uuid;
};
