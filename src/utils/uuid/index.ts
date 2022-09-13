import { v4, validate } from 'uuid';

export const uuidVersion = "4";

export const createUuid = () => {
  return v4();
};

export const validateUuid = (...uuids: unknown[]) => uuids.forEach((uuid) => {
  if (uuid && !validate(uuid as string)) {
    throw new Error("invalid identifier");
  }
});

export default {
  validateUuid,
  createUuid,
  uuidVersion,
};