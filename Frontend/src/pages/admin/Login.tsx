import Auth from "../../components/auth/Auth"
import { AuthModes } from "../../enums/authMode"

const Login = () => {
  return (
    <Auth mode={AuthModes.ADMIN_LOGIN} />
  )
}

export default Login
