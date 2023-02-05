import { UserInterface } from '../user/interfaces/user.interface';
import { UserNormalizedInterface } from '../user/interfaces/user.normalized.interface';

const getNormalizedUser = (user: UserInterface): UserNormalizedInterface => ({
  id: user.id,
  login: user.login,
  version: user.version,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export default getNormalizedUser;
