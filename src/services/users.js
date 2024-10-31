import { UsersCollection } from '../db/models/user.js';

export const getUserById = async userId => {
  return await UsersCollection.findById(userId);
};

export const patchUser = async (payload, userId) => {
  const rawData = await UsersCollection.findOneAndUpdate(
    { _id: userId },
    payload,
    {
      includeResultMetadata: true,
    },
  );
  if (!rawData || !rawData.value) return null;
  const user = await getUserById(userId);
  return {
    user,
    isNew: Boolean(rawData?.lastErrorObject?.upserted),
  };
};
