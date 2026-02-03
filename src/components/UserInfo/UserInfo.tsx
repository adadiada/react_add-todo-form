import { User } from '../../api/types';

export const UserInfo: React.FC<User> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
