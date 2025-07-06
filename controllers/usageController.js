// usageController.js
import { validateStorage, validateMessages } from '../utils/usageValidator.js';

export const uploadFile = async (req, res) => {
  const allowed = await validateStorage(req.user.id, req.body.sizeInGB);
  if (!allowed) return res.status(403).json({ message: "Storage limit exceeded" });
  res.json({ message: "File uploaded" });
};

export const sendMessage = async (req, res) => {
  const allowed = await validateMessages(req.user.id);
  if (!allowed) return res.status(403).json({ message: "Message limit exceeded" });
  res.json({ message: "Message sent" });
};
