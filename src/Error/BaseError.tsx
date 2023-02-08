import { json, useRouteError } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function perMissionCheckloader() {
  // const { ability } = useAuth();
  // if (ability.can('read', 'manageSelfDetail')) {
  // throw json(
  //   {
  //     sorry: 'You have been fired.',
  //     hrEmail: 'hr@bigco.com',
  //   },
  //   { status: 403 },
  // );
  // }
}

const BaseError = () => {
  const error: any = useRouteError();
  console.log(error.data);
  if (error.status === 403) {
    return <div>Hello</div>;
  }

  throw error;
};

export default BaseError;
