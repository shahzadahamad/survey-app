import Auth from "../../components/auth/Auth"
import { AuthModes } from "../../enums/authMode"

const Login = () => {
  return (
    <Auth mode={AuthModes.LOGIN} />
  )
}

export default Login
