import Auth from '../../components/auth/Auth'
import { AuthModes } from '../../enums/authMode'

const Register = () => {
  return (
    <Auth mode={AuthModes.REGISTER} />
  )
}

export default Register
